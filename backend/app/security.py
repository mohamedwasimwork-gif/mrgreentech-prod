"""Password hashing + JWT helpers."""
from __future__ import annotations

from datetime import datetime, timedelta, timezone

import bcrypt
from jose import JWTError, jwt

from .config import settings

ALGORITHM = "HS256"


def _to_bytes(s: str) -> bytes:
    return s.encode("utf-8")[:72]  # bcrypt caps passwords at 72 bytes


def hash_password(plain: str) -> str:
    return bcrypt.hashpw(_to_bytes(plain), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(_to_bytes(plain), hashed.encode("utf-8"))
    except Exception:
        return False


def create_access_token(sub: str, expires_hours: int | None = None) -> tuple[str, int]:
    """Return (token, expires_in_seconds)."""
    hours = expires_hours if expires_hours is not None else settings.access_token_hours
    expires_delta = timedelta(hours=hours)
    expire = datetime.now(timezone.utc) + expires_delta
    payload = {"sub": sub, "exp": expire}
    token = jwt.encode(payload, settings.secret_key, algorithm=ALGORITHM)
    return token, int(expires_delta.total_seconds())


def decode_token(token: str) -> dict | None:
    try:
        return jwt.decode(token, settings.secret_key, algorithms=[ALGORITHM])
    except JWTError:
        return None
