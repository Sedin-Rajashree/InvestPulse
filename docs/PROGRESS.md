# InvestPulse Engineering Progress Tracker

## Project Overview
InvestPulse is a local full-stack investor portfolio and spend analytics prototype.
- **Frontend Stack**: Next.js App Router (16.4.2), TypeScript, Tailwind CSS (v4), shadcn/ui, Recharts, Zustand.
- **Backend Stack**: FastAPI, Pydantic, SQLAlchemy, Alembic, PostgreSQL (local prototype).
- **Core Principles**: Allocation-safe financial totals, strict separation between investment capital and operating burn, local CSV import interfaces, deterministic simulated external connectors, and Kanakku-inspired aesthetics (forest green, warm cream, restrained gold; Young Serif display headings, Figtree body).

---

## 60-Day Implementation Roadmap Summary
- **Phase 1: Days 1–10**: Foundation, Core Design System, Base Routing, Navigation, Layout & State Stores.
- **Phase 2: Days 11–20**: Portfolio Data Models, Investment Ledger, Asset Classes & Allocation Analytics.
- **Phase 3: Days 21–30**: Operating Spend Analytics, Expense Categorization, Runway & Cash Flow Projections.
- **Phase 4: Days 31–40**: Backend FastAPI Core, Relational Database Schemas, Alembic Migrations & Repository Layer.
- **Phase 5: Days 41–50**: Local CSV Ingestion Engine, Data Validation Pipeline & Simulated External Connectors.
- **Phase 6: Days 51–60**: Integrated Dashboards, Recharts Visualizations, Reporting Exports, Polish & Performance Verification.

---

## Day 1/60 — Repository & Local Setup (Completed)

### 1. Prior Day Inspection & Baseline Found
- Greenfield repository: Workspace `/home/rajashree/Desktop/investPulse` was empty at start.
- Isolated dedicated Git repository on branch `main`.
- Node.js runtime located via asdf (`v24.13.0`, npm `11.6.2`).

### 2. Implemented Behavior & Scope
- **Scaffolded Next.js App Router Application**:
  - Bootstrapped Next.js 16.4 with TypeScript and Tailwind CSS v4 in `./frontend`.
  - Configured shadcn/ui base primitives and styling tokens.
  - Installed supporting dependencies: `clsx`, `tailwind-merge`, `lucide-react`, `class-variance-authority`, `zustand`, `recharts`.
- **Root Repository Orchestration**:
  - Created root [package.json](file:///home/rajashree/Desktop/investPulse/package.json) with convenience runner scripts (`npm run dev`, `npm run build`, `npm run lint`).
  - Created comprehensive [.gitignore](file:///home/rajashree/Desktop/investPulse/.gitignore) covering Next.js, Node, Python/FastAPI, and local environment secrets.
  - Created [README.md](file:///home/rajashree/Desktop/investPulse/README.md) detailing architecture, design system, and running instructions.
- **Kanakku-Inspired Design System & Typography**:
  - Integrated Google Fonts: `Young_Serif` (display headings) and `Figtree` (body, numbers, data tables).
  - Configured design tokens in [frontend/src/app/globals.css](file:///home/rajashree/Desktop/investPulse/frontend/src/app/globals.css):
    - Primary Forest Green (`#143d30`, `#1b4d3e`)
    - Warm Cream surfaces (`#faf7f2`, `#f3efe6`, `#ffffff`)
    - Restrained Gold accents (`#c5a869`, `#d4ba7d`)
    - High-contrast ink typography (`#182520`)
    - Financial gain (`#1b7a50`) and operating burn loss (`#b93838`) indicators.
- **Base Shell & Reusable Shared Components**:
  - [AppHeader](file:///home/rajashree/Desktop/investPulse/frontend/src/components/layout/app-header.tsx): Institutional monogram, protocol safety banner, navigation links with active state styling, AUM counter, and mobile-responsive drawer.
  - [AppFooter](file:///home/rajashree/Desktop/investPulse/frontend/src/components/layout/app-footer.tsx): Prototype disclaimers, allocation invariant badge, and data specs link.
  - [Button](file:///home/rajashree/Desktop/investPulse/frontend/src/components/ui/button.tsx): Shadcn button primitive linked to local `@/lib/utils`.
  - [Card](file:///home/rajashree/Desktop/investPulse/frontend/src/components/ui/card.tsx): Reusable Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter.
  - [Badge](file:///home/rajashree/Desktop/investPulse/frontend/src/components/ui/badge.tsx): Standardized badge with gold, success, and outline variants.
  - [utils.ts](file:///home/rajashree/Desktop/investPulse/frontend/src/lib/utils.ts): `cn` class merger and allocation-safe currency/percentage formatters.
- **Base Interactive Routes (Zero Dead-Ends)**:
  - `/` ([Overview](file:///home/rajashree/Desktop/investPulse/frontend/src/app/page.tsx)): Executive portfolio overview, key indicator cards, 5-class asset allocation bar, recent ledger events, and simulated connector status.
  - `/investments` ([Portfolio & Assets](file:///home/rajashree/Desktop/investPulse/frontend/src/app/investments/page.tsx)): Holdings ledger, target vs actual weighting, real interactive category filtering, and 100% allocation invariant badge.
  - `/spend` ([Operating Spend & Runway](file:///home/rajashree/Desktop/investPulse/frontend/src/app/spend/page.tsx)): Net monthly burn, 28.4-month runway calculation, capital dimension segregation notice, and disbursements table.
  - `/import` ([Data Ingestion](file:///home/rajashree/Desktop/investPulse/frontend/src/app/import/page.tsx)): Local CSV file dropzone, CSV schema preview table, template download actions, and interactive simulated feed synchronization with visual feedback.

### 3. Exact Changed / Created Paths
- [.gitignore](file:///home/rajashree/Desktop/investPulse/.gitignore)
- [package.json](file:///home/rajashree/Desktop/investPulse/package.json)
- [README.md](file:///home/rajashree/Desktop/investPulse/README.md)
- [docs/DECISIONS.md](file:///home/rajashree/Desktop/investPulse/docs/DECISIONS.md)
- [docs/PROGRESS.md](file:///home/rajashree/Desktop/investPulse/docs/PROGRESS.md)
- [frontend/package.json](file:///home/rajashree/Desktop/investPulse/frontend/package.json)
- [frontend/components.json](file:///home/rajashree/Desktop/investPulse/frontend/components.json)
- [frontend/src/lib/utils.ts](file:///home/rajashree/Desktop/investPulse/frontend/src/lib/utils.ts)
- [frontend/src/app/globals.css](file:///home/rajashree/Desktop/investPulse/frontend/src/app/globals.css)
- [frontend/src/app/layout.tsx](file:///home/rajashree/Desktop/investPulse/frontend/src/app/layout.tsx)
- [frontend/src/components/layout/app-header.tsx](file:///home/rajashree/Desktop/investPulse/frontend/src/components/layout/app-header.tsx)
- [frontend/src/components/layout/app-footer.tsx](file:///home/rajashree/Desktop/investPulse/frontend/src/components/layout/app-footer.tsx)
- [frontend/src/components/ui/button.tsx](file:///home/rajashree/Desktop/investPulse/frontend/src/components/ui/button.tsx)
- [frontend/src/components/ui/card.tsx](file:///home/rajashree/Desktop/investPulse/frontend/src/components/ui/card.tsx)
- [frontend/src/components/ui/badge.tsx](file:///home/rajashree/Desktop/investPulse/frontend/src/components/ui/badge.tsx)
- [frontend/src/app/page.tsx](file:///home/rajashree/Desktop/investPulse/frontend/src/app/page.tsx)
- [frontend/src/app/investments/page.tsx](file:///home/rajashree/Desktop/investPulse/frontend/src/app/investments/page.tsx)
- [frontend/src/app/spend/page.tsx](file:///home/rajashree/Desktop/investPulse/frontend/src/app/spend/page.tsx)
- [frontend/src/app/import/page.tsx](file:///home/rajashree/Desktop/investPulse/frontend/src/app/import/page.tsx)

### 4. Commands & Verification Actually Run and Results
- `npm run lint` (inside `frontend` and via root `npm run lint`): **0 errors, 0 warnings**.
- `npm run build` (inside `frontend` and via root `npm run build`): **Compiled successfully in 411ms**, TypeScript checks passed, all 4 static routes (`/`, `/investments`, `/spend`, `/import`) generated cleanly.
- `npm run dev` (dev server on `localhost:3001`): Server starts cleanly in 499ms.
- HTTP Route Verification (`curl -I`):
  - `http://localhost:3001` -> **HTTP 200 OK**
  - `http://localhost:3001/investments` -> **HTTP 200 OK**
  - `http://localhost:3001/spend` -> **HTTP 200 OK**
  - `http://localhost:3001/import` -> **HTTP 200 OK**
- HTML / Font Verification: Confirmed font preloading of Young_Serif and Figtree, and verified page markup and title tags.

### 5. Blockers & Known Issues
- None. Everything builds cleanly with zero errors.

### 6. Next-Day Starting Point (Day 2/60)
- **Goal**: Core Design Primitives, Financial Metric Cards, and Global Client State (Zustand).
- **Scope**:
  - Implement Zustand store for portfolio holdings and cash balances to allow state mutations across pages.
  - Standardize metric card component with variance indicators, tooltips, and allocation invariant badges.
  - Setup base unit testing harness (Vitest / React Testing Library) for calculation utilities and financial invariants.
