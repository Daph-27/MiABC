"""
User and Family Member Schemas
"""
from pydantic import BaseModel
from typing import Optional
from datetime import datetime


# User Schemas
class UserBase(BaseModel):
    accessCode: str
    guardianName: str
    guardianRelation: Optional[str] = None
    guardianEmail: Optional[str] = None
    guardianPhone: Optional[str] = None
    learnerName: str
    learnerAge: Optional[int] = None
    learnerGrade: Optional[str] = None
    username: str
    parentalLock: Optional[str] = None
    profilePhoto: Optional[str] = None


class UserCreate(UserBase):
    password: str


class UserLogin(BaseModel):
    username: str
    password: str


class User(UserBase):
    userId: int
    createdAt: datetime
    
    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str
    user: User


# Family Member Schemas
class FamilyMemberBase(BaseModel):
    name: str
    relation: str
    photoUri: Optional[str] = None


class FamilyMemberCreate(FamilyMemberBase):
    pass


class FamilyMember(FamilyMemberBase):
    id: int
    userId: int
    createdAt: datetime
    
    class Config:
        from_attributes = True
