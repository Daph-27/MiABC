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
# Learner Progress Schemas
class LearnerProgressBase(BaseModel):
    moduleName: str
    moduleType: Optional[str] = None
    itemId: Optional[int] = None
    score: Optional[int] = None
    attempts: int = 1
    completed: int = 0
    timeSpent: Optional[int] = None
    language: str = "english"

class LearnerProgressCreate(LearnerProgressBase):
    pass

class LearnerProgress(LearnerProgressBase):
    id: int
    userId: int
    createdAt: datetime
    updatedAt: datetime
    
    class Config:
        from_attributes = True

# Quiz Attempt Schemas
class QuizAttemptBase(BaseModel):
    quizType: str
    questionId: Optional[int] = None
    userAnswer: Optional[str] = None
    correctAnswer: Optional[str] = None
    isCorrect: Optional[int] = None
    responseTime: Optional[int] = None
    language: str = "english"

class QuizAttemptCreate(QuizAttemptBase):
    pass

class QuizAttempt(QuizAttemptBase):
    id: int
    userId: int
    createdAt: datetime
    
    class Config:
        from_attributes = True

# Pronunciation Attempt Schemas
class PronunciationAttemptBase(BaseModel):
    wordId: Optional[int] = None
    targetWord: str
    userPronunciation: Optional[str] = None
    accuracyScore: Optional[int] = None
    language: str = "english"

class PronunciationAttemptCreate(PronunciationAttemptBase):
    pass

class PronunciationAttempt(PronunciationAttemptBase):
    id: int
    userId: int
    createdAt: datetime
    
    class Config:
        from_attributes = True

# Learning Session Schemas
class LearningSessionBase(BaseModel):
    sessionStart: datetime
    sessionEnd: Optional[datetime] = None
    modulesAccessed: Optional[str] = None
    totalTimeSpent: Optional[int] = None
    itemsCompleted: int = 0
    averageScore: Optional[int] = None

class LearningSessionCreate(BaseModel):
    pass

class LearningSession(LearningSessionBase):
    id: int
    userId: int
    createdAt: datetime
    
    class Config:
        from_attributes = True

# Analytics Schemas
class LearnerAnalytics(BaseModel):
    totalSessions: int
    totalTimeSpent: int
    averageScore: float
    modulesProgress: dict
    strongAreas: List[str]
    weakAreas: List[str]
    recentActivity: List[dict]
    
class ModuleStats(BaseModel):
    moduleName: str
    completionRate: float
    averageScore: float
    totalAttempts: int
    timeSpent: int