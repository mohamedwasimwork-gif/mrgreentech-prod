"""Request and response schemas (Pydantic)."""
from __future__ import annotations

from datetime import datetime
from typing import List, Literal, Optional

from pydantic import BaseModel, ConfigDict, EmailStr, Field

LeadStatus = Literal["new", "contacted", "qualified", "won", "lost"]
LeadSide = Literal["sell", "buy"]


# ----- Auth -----
class LoginIn(BaseModel):
    email: EmailStr
    password: str = Field(min_length=4)


class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int
    user: "UserOut"


class UserOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    email: EmailStr
    name: str
    role: str


# ----- Leads -----
class LeadCreateIn(BaseModel):
    """Public submission from the contact / quote form."""

    name: str = Field(min_length=1, max_length=120)
    company: str = ""
    country: str = ""
    email: EmailStr
    phone: str = ""
    side: LeadSide = "sell"
    material: str = ""
    volume_mt: int = 0
    port: str = ""
    origin: str = ""
    destination: str = ""
    incoterm: str = ""
    frequency: str = ""
    customer_notes: str = ""


class LeadNoteOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    author: str
    body: str
    created_at: datetime


class LeadOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    ref: str
    name: str
    company: str
    country: str
    email: str
    phone: str
    side: LeadSide
    material: str
    volume_mt: int
    port: str
    origin: str
    destination: str
    incoterm: str
    frequency: str
    customer_notes: str
    status: LeadStatus
    created_at: datetime
    updated_at: datetime
    internal_notes: List[LeadNoteOut] = []


class LeadPatchIn(BaseModel):
    """Admin updates a lead — currently status only."""

    status: Optional[LeadStatus] = None


class NoteCreateIn(BaseModel):
    body: str = Field(min_length=1)


TokenOut.model_rebuild()
