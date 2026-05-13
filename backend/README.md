# MR Greentech — Backend

FastAPI + SQLite + JWT. Powers the public contact-form submissions and the admin leads dashboard.

## Endpoints

| Method | Path | Auth | Purpose |
|---|---|---|---|
| `GET`   | `/api/health` | — | Liveness probe |
| `POST`  | `/api/auth/login` | — | Email + password → JWT |
| `GET`   | `/api/auth/me` | Bearer | Current logged-in admin |
| `POST`  | `/api/leads` | — | Public submission from the quote form |
| `GET`   | `/api/leads` | Bearer | List all leads (admin) |
| `PATCH` | `/api/leads/{id}` | Bearer | Update lead status |
| `POST`  | `/api/leads/{id}/notes` | Bearer | Add internal note |

Interactive docs once running: <http://localhost:8000/docs>

## Setup

```sh
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# Optional: copy .env.example to .env and customise the admin credentials,
# JWT secret, CORS origins, and database file.
cp .env.example .env

# Run it
uvicorn app.main:app --reload --port 8000
```

The first run creates `mrgreentech.db` in the `backend/` directory, seeds an admin
user (from `SEED_ADMIN_*` env vars; defaults to `mohan@mrgreentech.in` / `admin123`),
and inserts five sample leads so the admin dashboard isn't empty out of the gate.

## Default admin credentials

```
email:    admin@mrgreentech.com
password: P@$$word@123
```

This is the **only** account that can sign in to `/admin`. If you wipe
`mrgreentech.db` and restart, the same user is recreated from the `SEED_ADMIN_*`
values in `.env` (or the defaults baked into `app/config.py`).

**Change these before deploying anywhere real.** Either set `SEED_ADMIN_EMAIL` /
`SEED_ADMIN_PASSWORD` in `.env` before the first run, or update the user in the
database after the fact.

## Resetting the database

Stop the server, delete `mrgreentech.db`, restart. The seed runs again.
