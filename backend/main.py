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

# Debug endpoint - List all registered usernames (for testing)
@app.get("/api/debug/users")
def list_all_users(db: Session = Depends(get_db)):
    """List all registered usernames - FOR DEBUGGING ONLY"""
    users = db.query(models.User.userId, models.User.username, models.User.guardianName, models.User.learnerName).all()
    return {
        "total_users": len(users),
        "users": [
            {
                "userId": user.userId,
                "username": user.username,
                "guardianName": user.guardianName,
                "learnerName": user.learnerName
            }
            for user in users
        ]
    }

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

# ========== LEARNER PROGRESS TRACKING ENDPOINTS ==========

@app.post("/api/progress", response_model=schemas.LearnerProgress)
def track_progress(progress: schemas.LearnerProgressCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    """Track learner progress in a module"""
    db_progress = models.LearnerProgress(**progress.model_dump(), userId=current_user.userId)
    db.add(db_progress)
    db.commit()
    db.refresh(db_progress)
    return db_progress

@app.get("/api/progress", response_model=List[schemas.LearnerProgress])
def get_progress(module: Optional[str] = None, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    """Get learner progress, optionally filtered by module"""
    query = db.query(models.LearnerProgress).filter(models.LearnerProgress.userId == current_user.userId)
    if module:
        query = query.filter(models.LearnerProgress.moduleName == module)
    return query.all()

@app.post("/api/quiz/attempt", response_model=schemas.QuizAttempt)
def record_quiz_attempt(attempt: schemas.QuizAttemptCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    """Record a quiz attempt"""
    db_attempt = models.QuizAttempt(**attempt.model_dump(), userId=current_user.userId)
    db.add(db_attempt)
    db.commit()
    db.refresh(db_attempt)
    return db_attempt

@app.get("/api/quiz/attempts", response_model=List[schemas.QuizAttempt])
def get_quiz_attempts(quiz_type: Optional[str] = None, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    """Get quiz attempts"""
    query = db.query(models.QuizAttempt).filter(models.QuizAttempt.userId == current_user.userId)
    if quiz_type:
        query = query.filter(models.QuizAttempt.quizType == quiz_type)
    return query.order_by(models.QuizAttempt.createdAt.desc()).all()

@app.post("/api/pronunciation/attempt", response_model=schemas.PronunciationAttempt)
def record_pronunciation(attempt: schemas.PronunciationAttemptCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    """Record a pronunciation practice attempt"""
    db_attempt = models.PronunciationAttempt(**attempt.model_dump(), userId=current_user.userId)
    db.add(db_attempt)
    db.commit()
    db.refresh(db_attempt)
    return db_attempt

@app.post("/api/session/start", response_model=schemas.LearningSession)
def start_learning_session(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    """Start a new learning session"""
    db_session = models.LearningSession(userId=current_user.userId)
    db.add(db_session)
    db.commit()
    db.refresh(db_session)
    return db_session

@app.put("/api/session/{session_id}", response_model=schemas.LearningSession)
def end_learning_session(session_id: int, session_data: schemas.LearningSessionBase, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    """End a learning session with final stats"""
    session = db.query(models.LearningSession).filter(
        models.LearningSession.id == session_id,
        models.LearningSession.userId == current_user.userId
    ).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    for key, value in session_data.model_dump(exclude_unset=True).items():
        setattr(session, key, value)
    
    db.commit()
    db.refresh(session)
    return session

# ========== ANALYTICS ENDPOINTS ==========

@app.get("/api/analytics/overview", response_model=schemas.LearnerAnalytics)
def get_learner_analytics(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    """Get comprehensive learner analytics"""
    from sqlalchemy import func
    
    # Total sessions
    total_sessions = db.query(func.count(models.LearningSession.id)).filter(
        models.LearningSession.userId == current_user.userId
    ).scalar() or 0
    
    # Total time spent
    total_time = db.query(func.sum(models.LearningSession.totalTimeSpent)).filter(
        models.LearningSession.userId == current_user.userId
    ).scalar() or 0
    
    # Average score from progress
    avg_score = db.query(func.avg(models.LearnerProgress.score)).filter(
        models.LearnerProgress.userId == current_user.userId,
        models.LearnerProgress.score.isnot(None)
    ).scalar() or 0.0
    
    # Module progress
    modules_progress = {}
    progress_by_module = db.query(
        models.LearnerProgress.moduleName,
        func.avg(models.LearnerProgress.score),
        func.count(models.LearnerProgress.id)
    ).filter(
        models.LearnerProgress.userId == current_user.userId
    ).group_by(models.LearnerProgress.moduleName).all()
    
    for module_name, avg_module_score, count in progress_by_module:
        modules_progress[module_name] = {
            "averageScore": float(avg_module_score) if avg_module_score else 0,
            "attempts": count
        }
    
    # Strong and weak areas
    strong_areas = [m for m, data in modules_progress.items() if data["averageScore"] >= 70]
    weak_areas = [m for m, data in modules_progress.items() if data["averageScore"] < 50 and data["attempts"] > 0]
    
    # Recent activity
    recent_progress = db.query(models.LearnerProgress).filter(
        models.LearnerProgress.userId == current_user.userId
    ).order_by(models.LearnerProgress.createdAt.desc()).limit(10).all()
    
    recent_activity = [{
        "module": p.moduleName,
        "score": p.score,
        "date": p.createdAt.isoformat()
    } for p in recent_progress]
    
    return {
        "totalSessions": total_sessions,
        "totalTimeSpent": total_time,
        "averageScore": float(avg_score),
        "modulesProgress": modules_progress,
        "strongAreas": strong_areas,
        "weakAreas": weak_areas,
        "recentActivity": recent_activity
    }

@app.get("/api/analytics/module/{module_name}", response_model=schemas.ModuleStats)
def get_module_stats(module_name: str, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    """Get detailed statistics for a specific module"""
    from sqlalchemy import func
    
    progress = db.query(models.LearnerProgress).filter(
        models.LearnerProgress.userId == current_user.userId,
        models.LearnerProgress.moduleName == module_name
    ).all()
    
    if not progress:
        return {
            "moduleName": module_name,
            "completionRate": 0.0,
            "averageScore": 0.0,
            "totalAttempts": 0,
            "timeSpent": 0
        }
    
    completed = sum(1 for p in progress if p.completed == 1)
    total_attempts = len(progress)
    avg_score = sum(p.score for p in progress if p.score) / total_attempts if total_attempts > 0 else 0
    time_spent = sum(p.timeSpent for p in progress if p.timeSpent) or 0
    
    return {
        "moduleName": module_name,
        "completionRate": (completed / total_attempts * 100) if total_attempts > 0 else 0,
        "averageScore": avg_score,
        "totalAttempts": total_attempts,
        "timeSpent": time_spent
    }

