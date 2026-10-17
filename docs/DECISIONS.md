# Architecture & Engineering Decisions (ADR) — InvestPulse

## ADR 001: Project Layout & Monorepo Structure
- **Date**: Day 1 / Session 1
- **Status**: Accepted
- **Context**: InvestPulse is a local full-stack investor portfolio and spend analytics prototype. It comprises a frontend (Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui, Recharts, Zustand) and a future backend (FastAPI, Pydantic, SQLAlchemy, Alembic, PostgreSQL).
- **Decision**: Organize the codebase into clear top-level domains:
  - `frontend/`: Next.js 15+ App Router application with Tailwind CSS and shadcn/ui design primitives.
  - `backend/`: FastAPI application, database models, schemas, and analytics calculation engine (to be scaffolded in subsequent backend phases).
  - `docs/`: Master documentation including `PROGRESS.md` and `DECISIONS.md`.
  - Root `package.json`: Convenience scripts (`npm run dev`, `npm run build`, `npm run lint`) to orchestrate frontend tasks without path ambiguity.
- **Consequences**: Ensures clean separation of concerns, avoids dependency collisions between Python and Node ecosystems, and allows direct standalone execution of both services.

## ADR 002: Design Tokens & Visual Hierarchy (Kanakku-Inspired Palette)
- **Date**: Day 1 / Session 1
- **Status**: Accepted
- **Context**: The design requires a distinguished, trustworthy, and premium financial aesthetic. The brand identity demands a Kanakku-inspired theme: forest green, warm cream, and restrained gold, paired with high-readability modern typography.
- **Decision**:
  - **Headings**: `Young Serif` serif display font for authority, distinction, and classic editorial refinement.
  - **Body / Numerics / UI**: `Figtree` sans-serif font for clean tabular figures, dense data layouts, and crisp readability.
  - **Color Palette**:
    - Primary Forest Green: Deep rich green (`hsl(163, 51%, 18%)` / `#164234`) for primary actions, prominent cards, and brand markers.
    - Cream Backgrounds: Warm cream surface (`hsl(42, 38%, 97%)` / `#FAF7F2`) and subtle card contrasts (`hsl(40, 25%, 93%)` / `#F3EFE6`).
    - Restrained Gold: Muted metallic gold (`hsl(41, 55%, 52%)` / `#C89B3C`) for key metrics, badges, and active tabs.
    - Semantic Accents: Crimson Red for operating spend / negative yields; Emerald Green for portfolio gains.
  - CSS Variables mapped to Tailwind and shadcn/ui tokens (`--primary`, `--background`, `--card`, `--accent`, `--border`).
- **Consequences**: Consistent, reusable design system across all pages and components without ad-hoc inline styles.

## ADR 003: Financial Allocation Safety & Metric Separation
- **Date**: Day 1 / Session 1
- **Status**: Accepted
- **Context**: Investor analytics require strict separation between capital deployed (investments, asset valuations, equity stakes) and operational spend (burn, vendor costs, management expenses).
- **Decision**:
  - Treat Investment Portfolio and Operating Spend as distinct accounting dimensions.
  - Portfolio totals must maintain allocation safety: asset class weights must sum strictly to 100% or explicitly account for unallocated cash reserves.
  - Avoid mixed aggregate calculations that conflate operational expenditure with investment capital drawdowns.
- **Consequences**: Financial reports avoid misleading aggregation errors and model real-world GP/LP portfolio management standards.

## ADR 004: Local-First Simulated Connectors & CSV Importer
- **Date**: Day 1 / Session 1
- **Status**: Accepted
- **Context**: InvestPulse is a local prototype; external live banking or brokerage APIs are out of scope.
- **Decision**:
  - Ingest real data via structured local CSV import interfaces.
  - Provide simulated external connector services with deterministic mocked ledger states, latency simulations, and clear visual indicators marking them as simulated/prototype feeds.
- **Consequences**: Guarantees offline reproducibility, zero credential leaks, and zero flake from third-party API downtime.
