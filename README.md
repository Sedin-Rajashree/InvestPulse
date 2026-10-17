# InvestPulse 🏛️

> **Local Full-Stack Investor Portfolio & Spend Analytics Prototype**

InvestPulse is a dedicated single-developer prototype designed for high-net-worth investors and fund managers to inspect asset allocation, monitor operating spend burn rates, run runway projections, and ingest financial records via local CSV imports and simulated external feeds.

---

## 🎨 Design System & Theme

InvestPulse uses a Kanakku-inspired financial design aesthetic:
- **Primary Hue**: Deep Forest Green (`#164234`) conveying institutional permanence and fiduciary focus.
- **Backgrounds**: Warm Cream (`#FAF7F2` and `#F3EFE6`) replacing sterile stark white with warm editorial richness.
- **Accents**: Restrained Gold (`#C89B3C`) highlighting core portfolio metrics and key status indicators.
- **Typography**:
  - Headings: `Young Serif` — editorial dignity and distinction.
  - Body & Numbers: `Figtree` — optimized for tabular figures, data cards, and financial ledgers.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui, Recharts, Zustand |
| **Backend** | FastAPI, Pydantic, SQLAlchemy, Alembic, PostgreSQL (local prototype) |
| **Data Ingestion** | Local CSV file parsing, deterministic simulated connectors |
| **Engineering** | Strict allocation safety, financial dimension separation, zero fake live connections |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v20+ recommended)
- npm
- Python 3.12+ (for backend)

### Installation & Execution

#### 1. Frontend Development Server
From the root directory:
```bash
npm run dev
```
Or directly from the `frontend` folder:
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

#### 2. Base Routes
- `/` — Executive Portfolio Overview (Total AUM, Net Asset Value, Top Allocations)
- `/investments` — Portfolio & Asset Allocation (Equities, Real Estate, Venture, Fixed Income, Cash)
- `/spend` — Operating Spend & Cash Flow Analytics (Monthly Burn, Category Breakdown, Runway)
- `/import` — Data Ingestion & Simulated Connectors (CSV Upload, Simulated Ledger Sync)

---

## 📁 Repository Structure

```
investPulse/
├── docs/
│   ├── PROGRESS.md       # Daily progress, completed tasks, known issues & handoffs
│   └── DECISIONS.md      # Architecture Decision Records (ADR)
├── frontend/             # Next.js App Router application
│   ├── src/
│   │   ├── app/          # App router pages & layouts
│   │   ├── components/   # UI components & design system primitives
│   │   └── lib/          # Utilities, formatters, and state stores
│   ├── public/           # Static assets
│   ├── package.json
│   └── tailwind.config.ts
├── backend/              # FastAPI application (scaffolded in Phase 4)
├── package.json          # Root runner scripts
└── README.md
```

---

## 📖 Master Progress & Continuity
See [docs/PROGRESS.md](file:///home/rajashree/Desktop/investPulse/docs/PROGRESS.md) and [docs/DECISIONS.md](file:///home/rajashree/Desktop/investPulse/docs/DECISIONS.md) for current engineering status and architecture decisions.
