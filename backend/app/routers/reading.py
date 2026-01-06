"""
Reading Text Routes
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models import User, ReadingText
from app.schemas import ReadingTextCreate, ReadingText as ReadingTextSchema
from app.dependencies import get_current_user

router = APIRouter(prefix="/api/reading-texts", tags=["Reading Texts"])


@router.get("", response_model=List[ReadingTextSchema])
def get_reading_texts(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all reading texts for current user"""
    return db.query(ReadingText).filter(ReadingText.userId == current_user.userId).all()


@router.post("", response_model=ReadingTextSchema)
def create_reading_text(
    text: ReadingTextCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new reading text"""
    db_text = ReadingText(**text.model_dump(), userId=current_user.userId)
    db.add(db_text)
    db.commit()
    db.refresh(db_text)
    return db_text


@router.get("/{text_id}", response_model=ReadingTextSchema)
def get_reading_text(
    text_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get a specific reading text by ID"""
    text = db.query(ReadingText).filter(
        ReadingText.id == text_id,
        ReadingText.userId == current_user.userId
    ).first()
    if not text:
        raise HTTPException(status_code=404, detail="Reading text not found")
    return text


@router.delete("/{text_id}")
def delete_reading_text(
    text_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete a reading text"""
    text = db.query(ReadingText).filter(
        ReadingText.id == text_id,
        ReadingText.userId == current_user.userId
    ).first()
    if not text:
        raise HTTPException(status_code=404, detail="Reading text not found")
    
    db.delete(text)
    db.commit()
    return {"message": "Reading text deleted successfully"}
