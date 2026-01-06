"""
Progress Tracking Routes
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional

from app.database import get_db
from app.models import User, LearnerProgress, QuizAttempt, PronunciationAttempt, LearningSession
from app.schemas import (
    LearnerProgressCreate, LearnerProgress as LearnerProgressSchema,
    QuizAttemptCreate, QuizAttempt as QuizAttemptSchema,
    PronunciationAttemptCreate, PronunciationAttempt as PronunciationAttemptSchema,
    LearningSessionBase, LearningSession as LearningSessionSchema
)
from app.dependencies import get_current_user

router = APIRouter(prefix="/api", tags=["Progress Tracking"])


@router.post("/progress", response_model=LearnerProgressSchema)
def track_progress(
    progress: LearnerProgressCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Track learner progress in a module"""
    db_progress = LearnerProgress(**progress.model_dump(), userId=current_user.userId)
    db.add(db_progress)
    db.commit()
    db.refresh(db_progress)
    return db_progress


@router.get("/progress", response_model=List[LearnerProgressSchema])
def get_progress(
    module: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get learner progress, optionally filtered by module"""
    query = db.query(LearnerProgress).filter(LearnerProgress.userId == current_user.userId)
    if module:
        query = query.filter(LearnerProgress.moduleName == module)
    return query.all()


@router.post("/quiz/attempt", response_model=QuizAttemptSchema)
def record_quiz_attempt(
    attempt: QuizAttemptCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Record a quiz attempt"""
    db_attempt = QuizAttempt(**attempt.model_dump(), userId=current_user.userId)
    db.add(db_attempt)
    db.commit()
    db.refresh(db_attempt)
    return db_attempt


@router.get("/quiz/attempts", response_model=List[QuizAttemptSchema])
def get_quiz_attempts(
    quiz_type: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get quiz attempts"""
    query = db.query(QuizAttempt).filter(QuizAttempt.userId == current_user.userId)
    if quiz_type:
        query = query.filter(QuizAttempt.quizType == quiz_type)
    return query.order_by(QuizAttempt.createdAt.desc()).all()


@router.post("/pronunciation/attempt", response_model=PronunciationAttemptSchema)
def record_pronunciation(
    attempt: PronunciationAttemptCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Record a pronunciation practice attempt"""
    db_attempt = PronunciationAttempt(**attempt.model_dump(), userId=current_user.userId)
    db.add(db_attempt)
    db.commit()
    db.refresh(db_attempt)
    return db_attempt


@router.post("/session/start", response_model=LearningSessionSchema)
def start_learning_session(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Start a new learning session"""
    db_session = LearningSession(userId=current_user.userId)
    db.add(db_session)
    db.commit()
    db.refresh(db_session)
    return db_session


@router.put("/session/{session_id}", response_model=LearningSessionSchema)
def end_learning_session(
    session_id: int,
    session_data: LearningSessionBase,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """End a learning session with final stats"""
    session = db.query(LearningSession).filter(
        LearningSession.id == session_id,
        LearningSession.userId == current_user.userId
    ).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    for key, value in session_data.model_dump(exclude_unset=True).items():
        setattr(session, key, value)
    
    db.commit()
    db.refresh(session)
    return session
