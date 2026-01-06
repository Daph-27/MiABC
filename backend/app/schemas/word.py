"""
Word and Reading Text Schemas
"""
from pydantic import BaseModel
from typing import Optional
from datetime import datetime


# Word Schemas
class WordBase(BaseModel):
    englishName: str
    englishSound: Optional[str] = None
    spanishName: Optional[str] = None
    spanishSound: Optional[str] = None
    tamilWord: Optional[str] = None
    tamilPronunciation: Optional[str] = None
    imagePath: Optional[str] = None
    initials: Optional[str] = None
    recordFlag: Optional[str] = None
    key: Optional[str] = None
    type: Optional[str] = None
    tema: Optional[str] = None
    letra: Optional[str] = None


class WordCreate(WordBase):
    pass


class Word(WordBase):
    id: int
    createdAt: datetime
    dateCompleted: Optional[datetime] = None
    
    class Config:
        from_attributes = True


# Reading Text Schemas
class ReadingTextBase(BaseModel):
    title: str
    content: str
    language: str = "english"
    level: Optional[str] = None


class ReadingTextCreate(ReadingTextBase):
    pass


class ReadingText(ReadingTextBase):
    id: int
    userId: int
    createdAt: datetime
    updatedAt: datetime
    
    class Config:
        from_attributes = True
