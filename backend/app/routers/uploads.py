"""
File Upload Routes
"""
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from datetime import datetime
import base64

from app.database import get_db
from app.models import User
from app.core.firebase import upload_image_to_firebase, upload_audio_to_firebase
from app.dependencies import get_current_user

router = APIRouter(prefix="/api/upload", tags=["File Uploads"])


@router.post("/image")
async def upload_image(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user)
):
    """Upload image to Firebase Storage"""
    try:
        contents = await file.read()
        filename = f"images/{current_user.userId}_{datetime.now().timestamp()}_{file.filename}"
        
        url = upload_image_to_firebase(base64.b64encode(contents).decode(), filename)
        return {"url": url, "filename": filename}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/audio")
async def upload_audio(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user)
):
    """Upload audio file to Firebase Storage"""
    try:
        contents = await file.read()
        filename = f"audio/{current_user.userId}_{datetime.now().timestamp()}_{file.filename}"
        
        url = upload_audio_to_firebase(contents, filename, file.content_type or 'audio/mpeg')
        return {"url": url, "filename": filename}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/profile-photo")
async def upload_profile_photo(
    image_base64: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
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
