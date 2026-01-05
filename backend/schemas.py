from pydantic import BaseModel, EmailStr
from typing import Optional, List
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
