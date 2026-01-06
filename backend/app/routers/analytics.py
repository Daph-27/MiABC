"""
Analytics Routes
"""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database import get_db
from app.models import User, LearnerProgress, LearningSession
from app.schemas import LearnerAnalytics, ModuleStats
from app.dependencies import get_current_user

router = APIRouter(prefix="/api/analytics", tags=["Analytics"])


@router.get("/overview", response_model=LearnerAnalytics)
def get_learner_analytics(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get comprehensive learner analytics"""
    # Total sessions
    total_sessions = db.query(func.count(LearningSession.id)).filter(
        LearningSession.userId == current_user.userId
    ).scalar() or 0
    
    # Total time spent
    total_time = db.query(func.sum(LearningSession.totalTimeSpent)).filter(
        LearningSession.userId == current_user.userId
    ).scalar() or 0
    
    # Average score from progress
    avg_score = db.query(func.avg(LearnerProgress.score)).filter(
        LearnerProgress.userId == current_user.userId,
        LearnerProgress.score.isnot(None)
    ).scalar() or 0.0
    
    # Module progress
    modules_progress = {}
    progress_by_module = db.query(
        LearnerProgress.moduleName,
        func.avg(LearnerProgress.score),
        func.count(LearnerProgress.id)
    ).filter(
        LearnerProgress.userId == current_user.userId
    ).group_by(LearnerProgress.moduleName).all()
    
    for module_name, avg_module_score, count in progress_by_module:
        modules_progress[module_name] = {
            "averageScore": float(avg_module_score) if avg_module_score else 0,
            "attempts": count
        }
    
    # Strong and weak areas
    strong_areas = [m for m, data in modules_progress.items() if data["averageScore"] >= 70]
    weak_areas = [m for m, data in modules_progress.items() if data["averageScore"] < 50 and data["attempts"] > 0]
    
    # Recent activity
    recent_progress = db.query(LearnerProgress).filter(
        LearnerProgress.userId == current_user.userId
    ).order_by(LearnerProgress.createdAt.desc()).limit(10).all()
    
    recent_activity = [{
        "module": p.moduleName,
        "score": p.score,
        "date": p.createdAt.isoformat()
    } for p in recent_progress]
    
    return {
        "totalSessions": total_sessions,
        "totalTimeSpent": total_time,
        "averageScore": float(avg_score),
        "modulesProgress": modules_progress,
        "strongAreas": strong_areas,
        "weakAreas": weak_areas,
        "recentActivity": recent_activity
    }


@router.get("/module/{module_name}", response_model=ModuleStats)
def get_module_stats(
    module_name: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get detailed statistics for a specific module"""
    progress = db.query(LearnerProgress).filter(
        LearnerProgress.userId == current_user.userId,
        LearnerProgress.moduleName == module_name
    ).all()
    
    if not progress:
        return {
            "moduleName": module_name,
            "completionRate": 0.0,
            "averageScore": 0.0,
            "totalAttempts": 0,
            "timeSpent": 0
        }
    
    completed = sum(1 for p in progress if p.completed == 1)
    total_attempts = len(progress)
    avg_score = sum(p.score for p in progress if p.score) / total_attempts if total_attempts > 0 else 0
    time_spent = sum(p.timeSpent for p in progress if p.timeSpent) or 0
    
    return {
        "moduleName": module_name,
        "completionRate": (completed / total_attempts * 100) if total_attempts > 0 else 0,
        "averageScore": avg_score,
        "totalAttempts": total_attempts,
        "timeSpent": time_spent
    }
