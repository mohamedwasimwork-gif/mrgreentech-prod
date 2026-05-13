"""Lead endpoints — public POST (from the contact/quote form),
protected GET/PATCH and notes routes for the admin dashboard."""
from __future__ import annotations

from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import desc, func
from sqlalchemy.orm import Session, selectinload

from .database import get_db
from .deps import get_current_user
from .models import Lead, LeadNote, User
from .schemas import (
    LeadCreateIn,
    LeadNoteOut,
    LeadOut,
    LeadPatchIn,
    NoteCreateIn,
)

# Public router — no auth required for POST (contact form)
public_router = APIRouter(prefix="/api/leads", tags=["leads-public"])

# Protected admin router
admin_router = APIRouter(prefix="/api/leads", tags=["leads-admin"])


def _next_ref(db: Session) -> str:
    max_id = db.query(func.max(Lead.id)).scalar() or 0
    return f"MRG-{28500 + max_id + 1}"


@public_router.post("", response_model=LeadOut, status_code=201)
def create_lead(payload: LeadCreateIn, db: Session = Depends(get_db)) -> LeadOut:
    lead = Lead(
        ref=_next_ref(db),
        name=payload.name,
        company=payload.company or "—",
        country=payload.country or "—",
        email=payload.email,
        phone=payload.phone,
        side=payload.side,
        material=payload.material or "Unspecified",
        volume_mt=payload.volume_mt or 0,
        port=payload.port,
        origin=payload.origin,
        destination=payload.destination,
        incoterm=payload.incoterm,
        frequency=payload.frequency,
        customer_notes=payload.customer_notes,
        status="new",
    )
    db.add(lead)
    db.commit()
    db.refresh(lead)
    return LeadOut.model_validate(lead)


@admin_router.get("", response_model=list[LeadOut])
def list_leads(
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
) -> list[LeadOut]:
    rows = (
        db.query(Lead)
        .options(selectinload(Lead.internal_notes))
        .order_by(desc(Lead.created_at))
        .all()
    )
    return [LeadOut.model_validate(r) for r in rows]


def _get_or_404(db: Session, lead_id: int) -> Lead:
    lead = (
        db.query(Lead)
        .options(selectinload(Lead.internal_notes))
        .filter(Lead.id == lead_id)
        .first()
    )
    if not lead:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lead not found")
    return lead


@admin_router.patch("/{lead_id}", response_model=LeadOut)
def update_lead(
    lead_id: int,
    payload: LeadPatchIn,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
) -> LeadOut:
    lead = _get_or_404(db, lead_id)
    changed = False
    if payload.status is not None:
        lead.status = payload.status
        changed = True
    if changed:
        lead.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(lead)
    return LeadOut.model_validate(lead)


@admin_router.post("/{lead_id}/notes", response_model=LeadNoteOut, status_code=201)
def add_note(
    lead_id: int,
    payload: NoteCreateIn,
    db: Session = Depends(get_db),
    current: User = Depends(get_current_user),
) -> LeadNoteOut:
    _get_or_404(db, lead_id)
    note = LeadNote(lead_id=lead_id, author=current.name, body=payload.body.strip())
    db.add(note)
    db.commit()
    db.refresh(note)
    return LeadNoteOut.model_validate(note)
