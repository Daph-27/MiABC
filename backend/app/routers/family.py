"""
Family Member Routes
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models import User, FamilyMember
from app.schemas import FamilyMemberCreate, FamilyMember as FamilyMemberSchema
from app.dependencies import get_current_user

router = APIRouter(prefix="/api/family-members", tags=["Family Members"])


@router.get("", response_model=List[FamilyMemberSchema])
def get_family_members(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all family members for current user"""
    return db.query(FamilyMember).filter(FamilyMember.userId == current_user.userId).all()


@router.post("", response_model=FamilyMemberSchema)
def create_family_member(
    member: FamilyMemberCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new family member"""
    db_member = FamilyMember(**member.model_dump(), userId=current_user.userId)
    db.add(db_member)
    db.commit()
    db.refresh(db_member)
    return db_member


@router.delete("/{member_id}")
def delete_family_member(
    member_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete a family member"""
    member = db.query(FamilyMember).filter(
        FamilyMember.id == member_id,
        FamilyMember.userId == current_user.userId
    ).first()
    if not member:
        raise HTTPException(status_code=404, detail="Family member not found")
    
    db.delete(member)
    db.commit()
    return {"message": "Family member deleted successfully"}
