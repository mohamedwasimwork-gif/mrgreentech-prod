"""FastAPI application entry-point."""
from __future__ import annotations

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import settings
from .routes_auth import router as auth_router
from .routes_leads import admin_router as leads_admin_router
from .routes_leads import public_router as leads_public_router
from .seed import init_db

app = FastAPI(
    title="MR Greentech API",
    version="1.0.0",
    description="Backend for the MR Greentech site and admin dashboard.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def _startup() -> None:
    init_db()


@app.get("/api/health")
def health() -> dict:
    return {"status": "ok"}


app.include_router(auth_router)
app.include_router(leads_public_router)
app.include_router(leads_admin_router)
