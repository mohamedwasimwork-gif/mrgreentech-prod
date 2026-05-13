# mrgreentech-prod

Public marketing site, single-admin dashboard for the contact-form leads,
and a Python API backing them both.

## Repo layout

```
web/         Next.js 14 frontend  · static export · deploys to Cloudflare Pages
backend/    FastAPI + SQLAlchemy  · deploys to Render
DEPLOYMENT.md   End-to-end production setup (Cloudflare Pages + Render + Neon)
render.yaml     Render Blueprint for one-click backend provisioning
```

## Local dev — two terminals

```sh
# 1. Backend  (http://localhost:8000)
cd backend
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env        # first time only
uvicorn app.main:app --reload --port 8000

# 2. Frontend (http://localhost:3000)
cd web
npm install                  # first time only
npm run dev
```

Public site: <http://localhost:3000>
Admin: <http://localhost:3000/admin>
Seed credentials: see `backend/.env.example` (defaults to `admin@mrgreentech.com` / `P@$$word@123`)

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md). TL;DR — Cloudflare Pages (static export
of `web/`), Render Web Service (FastAPI from `backend/`), Neon Postgres for
the leads database. All three on free tiers.
