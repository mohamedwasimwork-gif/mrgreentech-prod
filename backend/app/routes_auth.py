"""Login and current-user endpoints."""
from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from .database import get_db
from .deps import get_current_user
from .models import User
from .schemas import LoginIn, TokenOut, UserOut
from .security import create_access_token, verify_password

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/login", response_model=TokenOut)
def login(payload: LoginIn, db: Session = Depends(get_db)) -> TokenOut:
    user = db.query(User).filter(User.email == payload.email.lower()).first()
    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Wrong email or password",
        )
    token, expires_in = create_access_token(sub=user.email)
    return TokenOut(
        access_token=token,
        expires_in=expires_in,
        user=UserOut.model_validate(user),
    )


@router.get("/me", response_model=UserOut)
def me(current: User = Depends(get_current_user)) -> UserOut:
    return UserOut.model_validate(current)
