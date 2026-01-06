"""
Word Routes
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models import User, OriginalWord
from app.schemas import WordCreate, Word
from app.dependencies import get_current_user

router = APIRouter(prefix="/api/words", tags=["Words"])


@router.get("", response_model=List[Word])
def get_all_words(skip: int = 0, limit: int = 1000, db: Session = Depends(get_db)):
    """Get all words with pagination"""
    return db.query(OriginalWord).offset(skip).limit(limit).all()


@router.get("/initial/{initial}", response_model=List[Word])
def get_words_by_initial(initial: str, db: Session = Depends(get_db)):
    """Get words by initial letter"""
    return db.query(OriginalWord).filter(OriginalWord.initials == initial.upper()).all()


@router.get("/type/{word_type}", response_model=List[Word])
def get_words_by_type(word_type: str, db: Session = Depends(get_db)):
    """Get words by type"""
    return db.query(OriginalWord).filter(OriginalWord.type == word_type).all()


@router.get("/{word_id}", response_model=Word)
def get_word(word_id: int, db: Session = Depends(get_db)):
    """Get a specific word by ID"""
    word = db.query(OriginalWord).filter(OriginalWord.id == word_id).first()
    if not word:
        raise HTTPException(status_code=404, detail="Word not found")
    return word


@router.post("", response_model=Word)
def create_word(
    word: WordCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new word"""
    db_word = OriginalWord(**word.model_dump())
    db.add(db_word)
    db.commit()
    db.refresh(db_word)
    return db_word


@router.put("/{word_id}", response_model=Word)
def update_word(
    word_id: int,
    word_update: WordCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update a word"""
    word = db.query(OriginalWord).filter(OriginalWord.id == word_id).first()
    if not word:
        raise HTTPException(status_code=404, detail="Word not found")
    
    for key, value in word_update.model_dump(exclude_unset=True).items():
        setattr(word, key, value)
    
    db.commit()
    db.refresh(word)
    return word


@router.delete("/{word_id}")
def delete_word(
    word_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete a word"""
    word = db.query(OriginalWord).filter(OriginalWord.id == word_id).first()
    if not word:
        raise HTTPException(status_code=404, detail="Word not found")
    
    db.delete(word)
    db.commit()
    return {"message": "Word deleted successfully"}
