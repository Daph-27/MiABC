"""
Learner Progress and Analytics Models
"""
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from datetime import datetime

from app.database import Base


class LearnerProgress(Base):
    """Track learner progress across different modules"""
    __tablename__ = "learnerProgress"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    userId = Column(Integer, ForeignKey("users.userId"), nullable=False)
    moduleName = Column(String(50), nullable=False, index=True)  # Alphabet, Reading, Writing, Games, etc.
    moduleType = Column(String(50))  # Sound, Word, Quiz, etc.
    itemId = Column(Integer)  # Reference to word, quiz, etc.
    score = Column(Integer)  # Performance score (0-100)
    attempts = Column(Integer, default=1)
    completed = Column(Integer, default=0)  # 0 or 1
    timeSpent = Column(Integer)  # Time in seconds
    language = Column(String(20), default="english")
    createdAt = Column(DateTime, default=datetime.utcnow)
    updatedAt = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class QuizAttempt(Base):
    """Track quiz and assessment attempts"""
    __tablename__ = "quizAttempts"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    userId = Column(Integer, ForeignKey("users.userId"), nullable=False)
    quizType = Column(String(50), nullable=False)  # alphabet, words, sounds, matching
    questionId = Column(Integer)
    userAnswer = Column(String(255))
    correctAnswer = Column(String(255))
    isCorrect = Column(Integer)  # 0 or 1
    responseTime = Column(Integer)  # Time in milliseconds
    language = Column(String(20), default="english")
    createdAt = Column(DateTime, default=datetime.utcnow)


class PronunciationAttempt(Base):
    """Track pronunciation practice attempts"""
    __tablename__ = "pronunciationAttempts"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    userId = Column(Integer, ForeignKey("users.userId"), nullable=False)
    wordId = Column(Integer, ForeignKey("originalWords.id"))
    targetWord = Column(String(100), nullable=False)
    userPronunciation = Column(Text)  # Audio file path or transcription
    accuracyScore = Column(Integer)  # 0-100
    language = Column(String(20), default="english")
    createdAt = Column(DateTime, default=datetime.utcnow)


class LearningSession(Base):
    """Track overall learning sessions"""
    __tablename__ = "learningSessions"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    userId = Column(Integer, ForeignKey("users.userId"), nullable=False)
    sessionStart = Column(DateTime, default=datetime.utcnow)
    sessionEnd = Column(DateTime)
    modulesAccessed = Column(Text)  # JSON array of module names
    totalTimeSpent = Column(Integer)  # Total seconds
    itemsCompleted = Column(Integer, default=0)
    averageScore = Column(Integer)
    createdAt = Column(DateTime, default=datetime.utcnow)
