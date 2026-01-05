from fastapi import FastAPI, Depends, HTTPException, status, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from typing import List, Optional
import models
import schemas
from database import engine, get_db
from auth import verify_password, get_password_hash, create_access_token, decode_token
from firebase_config import init_firebase, upload_image_to_firebase, upload_audio_to_firebase, delete_from_firebase
import base64
from datetime import datetime

# Create database tables
models.Base.metadata.create_all(bind=engine)

# Initialize Firebase
firebase_bucket = init_firebase()

app = FastAPI(title="MiABC API", version="1.0.0")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

security = HTTPBearer()

# Dependency to get current user from token
def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security), db: Session = Depends(get_db)):
    token = credentials.credentials
    payload = decode_token(token)
    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials"
        )
    user_id = payload.get("sub")
    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials"
        )
    user = db.query(models.User).filter(models.User.userId == int(user_id)).first()
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )
    return user

# ========== AUTHENTICATION ENDPOINTS ==========

@app.post("/api/register", response_model=schemas.Token)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    # Check if username already exists
    db_user = db.query(models.User).filter(models.User.username == user.username).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    
    # Check if access code already exists
    db_access = db.query(models.User).filter(models.User.accessCode == user.accessCode).first()
    if db_access:
        raise HTTPException(status_code=400, detail="Access code already used")
    
    # Create new user
    hashed_password = get_password_hash(user.password)
    db_user = models.User(
        **user.model_dump(exclude={'password'}),
        password=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    # Create access token
    access_token = create_access_token(data={"sub": str(db_user.userId)})
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": db_user
    }

@app.post("/api/login", response_model=schemas.Token)
def login(credentials: schemas.UserLogin, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.username == credentials.username).first()
    if not user or not verify_password(credentials.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password"
        )
    
    access_token = create_access_token(data={"sub": str(user.userId)})
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": user
    }

@app.get("/api/me", response_model=schemas.User)
def get_current_user_info(current_user: models.User = Depends(get_current_user)):
    return current_user

# ========== USER ENDPOINTS ==========

@app.get("/api/users/{user_id}", response_model=schemas.User)
def get_user(user_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    user = db.query(models.User).filter(models.User.userId == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@app.put("/api/users/{user_id}", response_model=schemas.User)
def update_user(user_id: int, user_update: schemas.UserBase, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    user = db.query(models.User).filter(models.User.userId == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    for key, value in user_update.model_dump(exclude_unset=True).items():
        setattr(user, key, value)
    
    db.commit()
    db.refresh(user)
    return user

# ========== FAMILY MEMBER ENDPOINTS ==========

@app.get("/api/family-members", response_model=List[schemas.FamilyMember])
def get_family_members(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    return db.query(models.FamilyMember).filter(models.FamilyMember.userId == current_user.userId).all()

@app.post("/api/family-members", response_model=schemas.FamilyMember)
def create_family_member(member: schemas.FamilyMemberCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    db_member = models.FamilyMember(**member.model_dump(), userId=current_user.userId)
    db.add(db_member)
    db.commit()
    db.refresh(db_member)
    return db_member

@app.delete("/api/family-members/{member_id}")
def delete_family_member(member_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    member = db.query(models.FamilyMember).filter(
        models.FamilyMember.id == member_id,
        models.FamilyMember.userId == current_user.userId
    ).first()
    if not member:
        raise HTTPException(status_code=404, detail="Family member not found")
    
    db.delete(member)
    db.commit()
    return {"message": "Family member deleted successfully"}

# ========== WORD ENDPOINTS ==========

@app.get("/api/words", response_model=List[schemas.Word])
def get_all_words(skip: int = 0, limit: int = 1000, db: Session = Depends(get_db)):
    return db.query(models.OriginalWord).offset(skip).limit(limit).all()

@app.get("/api/words/initial/{initial}", response_model=List[schemas.Word])
def get_words_by_initial(initial: str, db: Session = Depends(get_db)):
    return db.query(models.OriginalWord).filter(models.OriginalWord.initials == initial.upper()).all()

@app.get("/api/words/type/{word_type}", response_model=List[schemas.Word])
def get_words_by_type(word_type: str, db: Session = Depends(get_db)):
    return db.query(models.OriginalWord).filter(models.OriginalWord.type == word_type).all()

@app.get("/api/words/{word_id}", response_model=schemas.Word)
def get_word(word_id: int, db: Session = Depends(get_db)):
    word = db.query(models.OriginalWord).filter(models.OriginalWord.id == word_id).first()
    if not word:
        raise HTTPException(status_code=404, detail="Word not found")
    return word

@app.post("/api/words", response_model=schemas.Word)
def create_word(word: schemas.WordCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    db_word = models.OriginalWord(**word.model_dump())
    db.add(db_word)
    db.commit()
    db.refresh(db_word)
    return db_word

@app.put("/api/words/{word_id}", response_model=schemas.Word)
def update_word(word_id: int, word_update: schemas.WordCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    word = db.query(models.OriginalWord).filter(models.OriginalWord.id == word_id).first()
    if not word:
        raise HTTPException(status_code=404, detail="Word not found")
    
    for key, value in word_update.model_dump(exclude_unset=True).items():
        setattr(word, key, value)
    
    db.commit()
    db.refresh(word)
    return word

@app.delete("/api/words/{word_id}")
def delete_word(word_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    word = db.query(models.OriginalWord).filter(models.OriginalWord.id == word_id).first()
    if not word:
        raise HTTPException(status_code=404, detail="Word not found")
    
    db.delete(word)
    db.commit()
    return {"message": "Word deleted successfully"}

# ========== READING TEXT ENDPOINTS ==========

@app.get("/api/reading-texts", response_model=List[schemas.ReadingText])
def get_reading_texts(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    return db.query(models.ReadingText).filter(models.ReadingText.userId == current_user.userId).all()

@app.post("/api/reading-texts", response_model=schemas.ReadingText)
def create_reading_text(text: schemas.ReadingTextCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    db_text = models.ReadingText(**text.model_dump(), userId=current_user.userId)
    db.add(db_text)
    db.commit()
    db.refresh(db_text)
    return db_text

@app.get("/api/reading-texts/{text_id}", response_model=schemas.ReadingText)
def get_reading_text(text_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    text = db.query(models.ReadingText).filter(
        models.ReadingText.id == text_id,
        models.ReadingText.userId == current_user.userId
    ).first()
    if not text:
        raise HTTPException(status_code=404, detail="Reading text not found")
    return text

@app.delete("/api/reading-texts/{text_id}")
def delete_reading_text(text_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    text = db.query(models.ReadingText).filter(
        models.ReadingText.id == text_id,
        models.ReadingText.userId == current_user.userId
    ).first()
    if not text:
        raise HTTPException(status_code=404, detail="Reading text not found")
    
    db.delete(text)
    db.commit()
    return {"message": "Reading text deleted successfully"}

@app.get("/")
def root():
    return {"message": "MiABC API is running", "version": "1.0.0", "firebase": firebase_bucket is not None}

# ========== FILE UPLOAD ENDPOINTS ==========

@app.post("/api/upload/image")
async def upload_image(file: UploadFile = File(...), current_user: models.User = Depends(get_current_user)):
    """Upload image to Firebase Storage"""
    try:
        contents = await file.read()
        filename = f"images/{current_user.userId}_{datetime.now().timestamp()}_{file.filename}"
        
        url = upload_image_to_firebase(base64.b64encode(contents).decode(), filename)
        return {"url": url, "filename": filename}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/upload/audio")
async def upload_audio(file: UploadFile = File(...), current_user: models.User = Depends(get_current_user)):
    """Upload audio file to Firebase Storage"""
    try:
        contents = await file.read()
        filename = f"audio/{current_user.userId}_{datetime.now().timestamp()}_{file.filename}"
        
        url = upload_audio_to_firebase(contents, filename, file.content_type or 'audio/mpeg')
        return {"url": url, "filename": filename}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/upload/profile-photo")
async def upload_profile_photo(image_base64: str, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Upload profile photo and update user"""
    try:
        filename = f"profile/{current_user.userId}_{datetime.now().timestamp()}.jpg"
        url = upload_image_to_firebase(image_base64, filename)
        
        # Update user profile photo
        current_user.profilePhoto = url
        db.commit()
        
        return {"url": url, "message": "Profile photo updated"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
