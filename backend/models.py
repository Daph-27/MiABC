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