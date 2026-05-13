"""Runtime configuration loaded from environment variables.

A tiny no-deps loader so the project doesn't need python-dotenv. If a
.env file exists alongside this module, its KEY=VALUE lines are loaded
into os.environ before Settings is read.
"""
from __future__ import annotations

import os
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ENV_FILE = ROOT / ".env"


def _load_dotenv() -> None:
    if not ENV_FILE.exists():
        return
    for raw in ENV_FILE.read_text(encoding="utf-8").splitlines():
        line = raw.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, _, value = line.partition("=")
        os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))


_load_dotenv()


class Settings:
    secret_key: str = os.environ.get("SECRET_KEY", "dev-secret-change-me")
    access_token_hours: int = int(os.environ.get("ACCESS_TOKEN_HOURS", "12"))
    cors_origins: list[str] = [
        o.strip() for o in os.environ.get(
            "CORS_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000"
        ).split(",") if o.strip()
    ]
    database_url: str = os.environ.get("DATABASE_URL", "sqlite:///./mrgreentech.db")
    seed_admin_email: str = os.environ.get("SEED_ADMIN_EMAIL", "admin@mrgreentech.com")
    seed_admin_password: str = os.environ.get("SEED_ADMIN_PASSWORD", "P@$$word@123")
    seed_admin_name: str = os.environ.get("SEED_ADMIN_NAME", "Admin")


settings = Settings()
