"""Bootstrap helper — creates the schema and seeds the admin user.

We deliberately do NOT seed any sample leads. The admin dashboard should
only show real submissions from the public contact / quote form.
"""
from __future__ import annotations

from sqlalchemy.orm import Session

from .config import settings
from .database import Base, SessionLocal, engine
from .models import User
from .security import hash_password


def _seed_admin(db: Session) -> None:
    if db.query(User).count() > 0:
        return
    user = User(
        email=settings.seed_admin_email.lower(),
        name=settings.seed_admin_name,
        hashed_password=hash_password(settings.seed_admin_password),
        role="admin",
    )
    db.add(user)
    db.commit()
    print(f"[seed] Admin user created: {user.email}")


def init_db() -> None:
    """Create tables and seed the single admin account. Safe to call repeatedly."""
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        _seed_admin(db)
    finally:
        db.close()


if __name__ == "__main__":
    init_db()
    print("[seed] Done.")
