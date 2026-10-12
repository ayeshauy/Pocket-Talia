# Pocket Talia — PRD

## Original Problem Statement
Build the official web application for Pocket Talia (pockettalia.tech), the independent digital media, production, and AI filmmaking software arm of Pocket. Dual-engine platform:
1. Full-stack digital media agency (SMM, Meta Ads, videography, editing, on-camera actors, episodic docuseries "How to Startup") for tech startups/founders.
2. All-in-one AI filmmaking & pre-production SaaS with "Talia" AI copilot (script editor, breakdowns, shot lists, storyboards, budgets, call sheets, client review/approval links, role-based permissions).

Dark-oxide luxury aesthetic (#121212 base, #8B0032 crimson-violet / #D35400 rust-bloom accents, #C48B9F clay, #4A6B5D willow), glassmorphism, conic glow borders, scroll reveals. Awwwards-level craft: kinetic masked hero reveal, editorial marquee, Lenis smooth scrolling, Framer Motion throughout.

## User Personas
- Tech startup founders (pre-seed → Series A) wanting build-in-public media engines
- Creators/filmmakers evaluating the Talia SaaS suite
- Producers/SMMs managing client review workflows

## Architecture
- Frontend: React 19 (CRA + craco), Tailwind, Framer Motion, Lenis, Recharts, sonner, lucide-react. Components in /app/frontend/src/components/.
- Backend: FastAPI (/app/backend/server.py), MongoDB via motor. POST /api/onboarding (validated, reference counter PT-XXXX), GET /api/onboarding, GET /api/ health.
- Design system: /app/design_guidelines.json. Logo: original aperture SVG (/app/frontend/public/logo.svg + components/Logo.jsx), used as favicon.

## Implemented (2026-10-12)
- Kinetic hero: masked line-by-line reveal, parallax production image, floating glass metric cards, animated stats counter bar (142M+ views, 84.2% hook retention, 420+ productions, <90s Talia)
- Slow editorial marquee ribbon
- AI Suite section: Talia copilot chat (3 working preset prompts with typing simulation), auto shot-list table, client review workspace (timestamped comments + Approve Media toggle)
- Media Matrix: 3 tabs (shorts w/ hook-retention badges, vlogs, docuseries with 3-act 6-episode guide), glass player modal with play/pause + progress
- Social hub cards: YouTube, Instagram, TikTok, LinkedIn, Meta Ads
- Analytics dashboard: 7D/30D/90D switch driving KPIs, impressions area chart, retention curve, GSC spike correlation (release-day markers), GA4 donut, conversion bars, engagement/scroll-depth gauges, scanline sweep. Marked as DEMO DATA.
- Workflow: 5-step pipeline, sticky intro, scroll-driven glowing progress line
- Pricing: software tiers vs agency retainers tabs, featured tier with rotating conic border
- Onboarding form: dual CTA mode toggle, full validation (client + server), persists to MongoDB, returns PT-XXXX reference (verified PT-0002 via curl, PT-0003 via UI), graceful inline errors
- Footer: giant watermark, ecosystem/legal links, Talia engine status pill

### Iteration 2 (2026-10-12)
- Hero copy changed to "The Digital Media Engine Built for Tech Startups & Founders." + new sub-headline
- React Router added: Landing (/) + EpisodeCaseStudy (/episodes/:slug)
- 6 episode case study pages (data: /app/frontend/src/data/episodes.js) — hero banner, KPI row, retention curve, platform split bars, GSC release-day spike chart, GA4 attribution table (sessions/signups/waitlist/deck downloads), attribution read, founder quote, prev/next nav, CTA with conic border. All per-episode analytics are curated DEMO data.
- Media Matrix docuseries episode rows now link to their case study pages
- Navbar/Footer anchor links fall back to /#section navigation when off the landing page
- User shared pockettalia.tech registrar NS/SOA info — domain connect happens at Deploy time (platform provides records to add at registrar)

## Backlog (prioritized)
- P0: none blocking
- P1: Real video embeds (YouTube/TikTok) once client provides footage; real GA4/GSC integration behind the dashboard; admin view for onboarding submissions
- P2: Talia chat wired to a real LLM (Emergent LLM key); password-protected client review links as a real product page; case-study detail pages; SEO/schema expansion per farm-seo-setup skill
- P3: Multi-language, blog/changelog, CMS

## Next Tasks
1. Swap placeholder thumbnails for real embeds when user provides links
2. Add admin dashboard for viewing PT-XXXX submissions
3. Wire Talia chat to live LLM
