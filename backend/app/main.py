"""
MiABC API - Main Application Entry Point
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import CORS_ORIGINS
from app.database import engine
from app.models import User, FamilyMember, OriginalWord, ReadingText, LearnerProgress, QuizAttempt, PronunciationAttempt, LearningSession
from app.database import Base
from app.core.firebase import init_firebase
from app.routers import auth, users, family, words, reading, uploads, progress, analytics

# Create database tables
Base.metadata.create_all(bind=engine)

# Initialize Firebase
firebase_bucket = init_firebase()

# Create FastAPI application
app = FastAPI(
    title="MiABC API",
    version="1.0.0",
    description="Backend API for the MiABC educational app with Tamil language support"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(users.router)
app.include_router(family.router)
app.include_router(words.router)
app.include_router(reading.router)
app.include_router(uploads.router)
app.include_router(progress.router)
app.include_router(analytics.router)


@app.get("/")
def root():
    """Root endpoint - API health check"""
    return {
        "message": "MiABC API is running",
        "version": "1.0.0",
        "firebase": firebase_bucket is not None
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
