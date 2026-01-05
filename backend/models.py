from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class User(Base):
    __tablename__ = "users"
    
    userId = Column(Integer, primary_key=True, index=True, autoincrement=True)
    accessCode = Column(String(50), unique=True, nullable=False, index=True)
    guardianName = Column(String(100), nullable=False)
    guardianRelation = Column(String(50))
    guardianEmail = Column(String(100))
    guardianPhone = Column(String(20))
    learnerName = Column(String(100), nullable=False)
    learnerAge = Column(Integer)
    learnerGrade = Column(String(20))
    username = Column(String(50), unique=True, nullable=False, index=True)
    password = Column(String(255), nullable=False)
    parentalLock = Column(String(10))
    profilePhoto = Column(Text)
    createdAt = Column(DateTime, default=datetime.utcnow)
    
    family_members = relationship("FamilyMember", back_populates="user", cascade="all, delete-orphan")

class FamilyMember(Base):
    __tablename__ = "familyMembers"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    userId = Column(Integer, ForeignKey("users.userId"), nullable=False)
    name = Column(String(100), nullable=False)
    relation = Column(String(50), nullable=False)
    photoUri = Column(Text)
    createdAt = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="family_members")

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
