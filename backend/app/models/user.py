"""
User and Family Member Models
"""
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime

from app.database import Base


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
