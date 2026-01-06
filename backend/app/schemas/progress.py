"""
Progress and Analytics Schemas
"""
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


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
