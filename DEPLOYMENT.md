# MR Greentech — Deployment Plan

Three moving parts: the **Next.js frontend** (public site + admin UI),
the **Python FastAPI backend** (auth + leads API), and a **persistent
database** (currently SQLite for local dev — must move to managed
Postgres for production).

This plan picks the cheapest credible production stack on free tiers
without forcing a re-architecture. Every piece below stays inside a
free quota that's appropriate for early traffic; you can grow into paid
tiers later without changing the architecture.

---

## 1. Final architecture

```
                       ┌──────────────────────────────┐
                       │  Cloudflare Pages            │
   public visitor  ──▶ │  Next.js static export       │
                       │  https://mrgreentech.in      │
                       └─────────┬────────────────────┘
                                 │  fetch('/api/...')
                                 ▼
                       ┌──────────────────────────────┐
                       │  Render Web Service          │
                       │  FastAPI · uvicorn           │
                       │  https://api.mrgreentech.in  │
                       └─────────┬────────────────────┘
                                 │  SQL
                                 ▼
                       ┌──────────────────────────────┐
                       │  Neon Postgres (serverless)  │
                       │  free tier, 0.5 GB           │
                       └──────────────────────────────┘

                       (optional, future)
                       ┌──────────────────────────────┐
                       │  Cloudflare R2               │
                       │  contact-form attachments    │
                       └──────────────────────────────┘
```

**Why this stack**

| Need | Choice | Free tier | Why |
|---|---|---|---|
| Static + edge CDN | **Cloudflare Pages** | unlimited bandwidth, 500 builds/mo | Next.js compiles to a static export; no SSR needed since data is fetched client-side from the API. Pages serves it from 300+ edges with no egress cost. |
| API server | **Render — Web Service (Python)** | 750 hrs/mo, 512 MB RAM | Sleeps after 15 min idle then cold-starts in ~30 s on the first request after wake. Fine for an internal admin tool. |
| Database | **Neon Postgres (serverless)** | 0.5 GB storage, unlimited compute hours | Render's free Postgres trial is 90 days only; Neon's free tier has no time limit. Drop-in via `DATABASE_URL`. |
| Future file uploads | **Cloudflare R2** | 10 GB storage, 1M Class A ops/mo, **no egress fee** | When you wire the quote-form file upload UI to actually store MTR PDFs / yard photos, R2 is the obvious fit. Not required for v1. |
| DNS / TLS | **Cloudflare** | free | Free DNS, free TLS, free DDoS, free analytics. |

---

## 2. Pre-flight code changes

Three small changes the codebase needs before it can boot in
production. None affect local dev because each one is gated on an
environment variable.

### 2.1 Backend — switch SQLite → Postgres at the `DATABASE_URL` level

`backend/app/database.py` already reads `DATABASE_URL` from env. We
just need to install a Postgres driver and the URL prefix change in
the production env vars handles the rest. **No code change needed for
the driver swap itself** — SQLAlchemy picks the dialect from the URL.

Add to `backend/requirements.txt`:

```
psycopg[binary]>=3.1
```

Then in production set:

```
DATABASE_URL=postgresql+psycopg://<user>:<pw>@<host>/<db>?sslmode=require
```

### 2.2 Backend — CORS origins must include the public site URL

`backend/.env` (production):

```
CORS_ORIGINS=https://mrgreentech.in,https://www.mrgreentech.in
```

### 2.3 Frontend — point at the production API

`web/.env.production`:

```
NEXT_PUBLIC_API_BASE=https://api.mrgreentech.in
```

That env var is already wired in `web/src/lib/api.ts` as the API base
fallback. Locally it defaults to `http://localhost:8000`.

### 2.4 Frontend — opt into static export for Cloudflare Pages

In `web/next.config.js` add `output: 'export'`. Every page in this
project is a client component, so static export builds cleanly. The
build emits `out/` which is what Pages serves.

---

## 3. Step-by-step setup

### 3.1 Neon Postgres (10 minutes)

1. Sign up at <https://neon.tech>.
2. Create a project → name it `mrgreentech-prod`. Region: AWS
   `ap-south-1` (Mumbai) for proximity to Render's `oregon` or
   `singapore` regions — see step 3.3.
3. The "Connection details" panel gives you a `postgresql://` URL.
   Copy it. Add `?sslmode=require` to the end.
4. Hold this URL — it goes into Render as `DATABASE_URL`.

### 3.2 Cloudflare Pages — frontend (15 minutes)

1. Push the repo to GitHub.
2. Cloudflare dashboard → **Pages** → **Connect to Git** → pick the
   repo.
3. Build settings:
   - **Framework preset**: `Next.js (Static HTML Export)`
   - **Build command**: `npm install && npm run build`
   - **Build output directory**: `out`
   - **Root directory**: `web`
   - **Node version**: 20 (set via `NODE_VERSION=20` env var)
4. Environment variables (Production):
   ```
   NEXT_PUBLIC_API_BASE=https://api.mrgreentech.in
   ```
5. Deploy. You'll get a `*.pages.dev` URL.
6. **Custom domain** → add `mrgreentech.in` (and `www.mrgreentech.in`
   as a redirect). Cloudflare DNS adds the CNAMEs automatically.

### 3.3 Render — backend (20 minutes)

1. Push the repo to GitHub (same repo is fine; Render reads only the
   `backend/` directory).
2. Render dashboard → **New** → **Web Service** → pick repo.
3. Settings:
   - **Root Directory**: `backend`
   - **Runtime**: Python 3.11
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - **Plan**: Free
   - **Region**: pick `singapore` if your audience is APAC/India,
     `oregon` otherwise.
4. Environment variables:
   ```
   SECRET_KEY=<run: python -c "import secrets; print(secrets.token_urlsafe(48))">
   ACCESS_TOKEN_HOURS=12
   DATABASE_URL=postgresql+psycopg://...@neon.tech/...?sslmode=require
   CORS_ORIGINS=https://mrgreentech.in,https://www.mrgreentech.in,https://*.pages.dev
   SEED_ADMIN_EMAIL=admin@mrgreentech.com
   SEED_ADMIN_PASSWORD=P@$$word@123
   SEED_ADMIN_NAME=Admin
   PYTHON_VERSION=3.11.9
   ```
5. Add a **Health Check Path**: `/api/health`.
6. Deploy. First start runs `init_db()` which creates the schema on
   Neon and seeds the single admin user.
7. **Custom domain** → add `api.mrgreentech.in`. Render issues a
   Let's Encrypt cert automatically.

### 3.4 DNS — Cloudflare (5 minutes)

In Cloudflare DNS for `mrgreentech.in`:

| Type | Name | Content | Proxied? |
|---|---|---|---|
| `CNAME` | `@` | `<project>.pages.dev` | ✅ orange cloud |
| `CNAME` | `www` | `<project>.pages.dev` | ✅ |
| `CNAME` | `api` | `<service>.onrender.com` | ⬜ DNS only (Render handles TLS) |

### 3.5 First-load smoke test

1. `curl https://api.mrgreentech.in/api/health` → `{"status":"ok"}`
2. Open `https://mrgreentech.in` → public site loads, hero image,
   nav, etc.
3. Open `https://mrgreentech.in/admin/login` → log in with the seed
   admin credentials → land on the empty leads dashboard.
4. Submit a quote from the public site → it lands in the dashboard on
   refresh. Round trip confirmed.

---

## 4. Production environment variables — checklist

### Render (backend)

| Var | Value (prod) |
|---|---|
| `SECRET_KEY` | 48-byte random, generated once |
| `ACCESS_TOKEN_HOURS` | `12` |
| `DATABASE_URL` | full Neon Postgres URL with `?sslmode=require` |
| `CORS_ORIGINS` | `https://mrgreentech.in,https://www.mrgreentech.in` |
| `SEED_ADMIN_EMAIL` | `admin@mrgreentech.com` |
| `SEED_ADMIN_PASSWORD` | strong password (change before first deploy) |
| `SEED_ADMIN_NAME` | `Admin` |
| `PYTHON_VERSION` | `3.11.9` |

### Cloudflare Pages (frontend)

| Var | Value (prod) |
|---|---|
| `NEXT_PUBLIC_API_BASE` | `https://api.mrgreentech.in` |
| `NODE_VERSION` | `20` |

---

## 5. CI / CD

You get automatic pipelines by default:

- **Cloudflare Pages**: every push to `main` triggers a build & deploy.
  PRs get preview deployments at `*.pages.dev` URLs. Free.
- **Render**: every push to `main` triggers a redeploy. Cold deploys
  take ~3 minutes.

If you want a single, reproducible config you can check into the
repo, add `render.yaml` at the repo root:

```yaml
services:
  - type: web
    name: mrgreentech-api
    env: python
    rootDir: backend
    buildCommand: pip install -r requirements.txt
    startCommand: uvicorn app.main:app --host 0.0.0.0 --port $PORT
    plan: free
    region: singapore
    healthCheckPath: /api/health
    envVars:
      - key: SECRET_KEY
        generateValue: true
      - key: ACCESS_TOKEN_HOURS
        value: 12
      - key: DATABASE_URL
        sync: false             # set in dashboard, never committed
      - key: CORS_ORIGINS
        value: https://mrgreentech.in,https://www.mrgreentech.in
      - key: SEED_ADMIN_EMAIL
        sync: false
      - key: SEED_ADMIN_PASSWORD
        sync: false
      - key: SEED_ADMIN_NAME
        value: Admin
      - key: PYTHON_VERSION
        value: 3.11.9
```

---

## 6. Free-tier limits — what to watch

| Service | Limit | What happens when you hit it |
|---|---|---|
| **Cloudflare Pages** | 500 builds/mo · ∞ bandwidth · ∞ requests | Builds queue; site keeps serving. Upgrade only if you push 500+ commits/mo. |
| **Render free web** | 750 hours/mo · sleeps after 15 min idle · 512 MB RAM | First request after sleep takes ~30 s. Solve with a $7/mo Starter plan **or** a free uptime ping (e.g. <https://uptimerobot.com> hitting `/api/health` every 10 minutes). |
| **Neon Postgres free** | 0.5 GB storage · ~ 191 active hours/mo per branch | Database scales to zero after 5 min idle, wakes in ~500 ms. Storage caps before you'll feel it — leads payloads are tiny. |
| **Cloudflare R2** | 10 GB storage · 1M Class A ops · 10M Class B ops · **no egress** | Plenty of headroom for MTR / photo uploads. |

**Pre-emptive Render keep-alive** (recommended): UptimeRobot or
[cron-job.org](https://cron-job.org) ping `https://api.mrgreentech.in/api/health`
every 10 minutes. Stays inside the 750-hour budget because pings are
short-lived and the free service idles automatically once traffic
stops.

---

## 7. Suggested launch sequence

1. **Day 0** — pre-flight (today)
   - Apply the four code changes in §2.
   - Push to GitHub.
2. **Day 0 + 30 min** — provision data
   - Create Neon project, copy `DATABASE_URL`.
3. **Day 0 + 1 h** — backend up
   - Render service, env vars, custom domain `api.*`, health check.
4. **Day 0 + 1.5 h** — frontend up
   - Cloudflare Pages, env vars, custom domain.
5. **Day 0 + 2 h** — smoke test
   - Public hero loads, admin login works, quote-form lead lands.
6. **Day 0 + 2.5 h** — uptime ping
   - UptimeRobot monitor on `/api/health` to keep Render warm.

---

## 8. Hardening once you have real traffic

Not required for launch, do them when traffic warrants it:

| What | When | Cost |
|---|---|---|
| Render Starter plan ($7/mo) — kills cold starts | First customer complaint about a 30-s first hit | $7/mo |
| Neon Pro ($19/mo) — drops the 0.5 GB cap | Around 800–1,000 leads with full attachments | $19/mo |
| R2 bucket + signed upload URLs for the quote-form MTR/photo step | When real customers start trying to attach files | ~$0 within free tier |
| Cloudflare Turnstile in front of the public lead-create endpoint | First spam wave | free |
| Render's autoscaler / Cloudflare WAF | Sustained 5k+ daily uniques | scales |
| Sentry (free tier 5k events/mo) for both apps | Anytime — easy win | free |

---

## 9. Out-of-scope alternatives, just so you know

- **All on Cloudflare** (Pages + Workers + D1) — Workers Python is
  beta. FastAPI runs but requires a small adapter and D1 doesn't
  match Postgres semantics. Skip until Workers Python stabilises.
- **Fly.io + Litestream** — keeps SQLite, mirrors to S3-compatible
  storage. Cheaper at scale than Postgres but more moving parts.
- **All on Render** (web service + Render Postgres) — simplest config
  but Postgres free tier is 90-day trial only. Move to Neon and your
  free runway is indefinite.
