"""
Word and Reading Text Models
"""
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from datetime import datetime

from app.database import Base


class OriginalWord(Base):
    __tablename__ = "originalWords"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    englishName = Column(String(100), nullable=False, index=True)
    englishSound = Column(String(255))
    spanishName = Column(String(100))
    spanishSound = Column(String(255))
    tamilWord = Column(String(100))
    tamilPronunciation = Column(String(255))
    imagePath = Column(String(255))
    initials = Column(String(10), index=True)
    recordFlag = Column(String(10))
    key = Column(String(50))
    type = Column(String(50))
    tema = Column(String(100))
    letra = Column(String(10))
    dateCompleted = Column(DateTime)
    createdAt = Column(DateTime, default=datetime.utcnow)


class ReadingText(Base):
    __tablename__ = "readingTexts"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    userId = Column(Integer, ForeignKey("users.userId"), nullable=False)
    title = Column(String(200), nullable=False)
    content = Column(Text, nullable=False)
    language = Column(String(20), default="english")
    level = Column(String(20))
    createdAt = Column(DateTime, default=datetime.utcnow)
    updatedAt = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
