"""ORM models for users, leads, and internal notes."""
from __future__ import annotations

from datetime import datetime
from typing import List

from sqlalchemy import DateTime, ForeignKey, Integer, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .database import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[str] = mapped_column(String(20), default="admin", nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())


class Lead(Base):
    __tablename__ = "leads"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    ref: Mapped[str] = mapped_column(String(20), unique=True, index=True)  # MRG-XXXXX
    name: Mapped[str] = mapped_column(String(120))
    company: Mapped[str] = mapped_column(String(160), default="")
    country: Mapped[str] = mapped_column(String(80), default="")
    email: Mapped[str] = mapped_column(String(255), default="")
    phone: Mapped[str] = mapped_column(String(40), default="")

    side: Mapped[str] = mapped_column(String(8), default="sell")  # sell / buy
    material: Mapped[str] = mapped_column(String(120), default="")
    volume_mt: Mapped[int] = mapped_column(Integer, default=0)
    port: Mapped[str] = mapped_column(String(120), default="")
    origin: Mapped[str] = mapped_column(String(160), default="")
    destination: Mapped[str] = mapped_column(String(160), default="")
    incoterm: Mapped[str] = mapped_column(String(16), default="")
    frequency: Mapped[str] = mapped_column(String(40), default="")

    customer_notes: Mapped[str] = mapped_column(Text, default="")
    status: Mapped[str] = mapped_column(String(16), default="new", index=True)
    # new | contacted | qualified | won | lost

    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now(), index=True)
    updated_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now(), onupdate=func.now())

    internal_notes: Mapped[List["LeadNote"]] = relationship(
        back_populates="lead",
        cascade="all, delete-orphan",
        order_by="LeadNote.created_at.desc()",
    )


class LeadNote(Base):
    __tablename__ = "lead_notes"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    lead_id: Mapped[int] = mapped_column(ForeignKey("leads.id", ondelete="CASCADE"))
    author: Mapped[str] = mapped_column(String(120))
    body: Mapped[str] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())

    lead: Mapped[Lead] = relationship(back_populates="internal_notes")
