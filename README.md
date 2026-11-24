# Harigaran R - Full Stack Developer Portfolio

A modern, high-performance personal portfolio built with React, Vite, Framer Motion, and backed by a dynamic 24/7 Cloud CMS (Sanity.io).

- **Live Website**: [https://harigaran-portfolio.vercel.app](https://harigaran-portfolio.vercel.app)
- **Live Studio CMS**: [https://harigaran-portfolio.sanity.studio](https://harigaran-portfolio.sanity.studio)

---

## Architecture & Project Structure

```
Harigaran-Portfolio/
├── src/                    # Frontend React Application
│   ├── assets/             # Images and local media
│   ├── components/         # React UI sections (Hero, About, Skills, Projects, etc.)
│   ├── context/            # PortfolioDataContext (Reactive CMS state provider)
│   ├── data/               # Static fallback data (0ms instant offline rendering)
│   ├── services/           # Universal API clients (Sanity Cloud & Strapi)
│   ├── styles/             # Modular CSS stylesheets
│   └── utils/              # Universal icon and helper utilities
├── studio/                 # Sanity Studio CMS (Free Cloud CMS)
│   ├── schemaTypes/        # Schemas (profile, project, skill, experience, etc.)
│   ├── sanity.config.ts    # Sanity Studio configuration
│   └── sanity.cli.ts       # Sanity CLI deployment configuration
├── cms/                    # Local Strapi CMS (Alternative local backend)
├── scripts/                # Database automation & seed scripts (seedSanity.js)
├── public/                 # Static public web assets
├── .env.example            # Environment variables template
├── package.json            # Root frontend dependencies and orchestration scripts
└── vite.config.js          # Vite build configuration
```

---

## Quick Start

### 1. Run the Frontend (React + Vite)
```bash
npm install
npm run dev
```
Opens the portfolio at `http://localhost:5173`.

### 2. Run the Sanity Studio (Admin CMS)
```bash
npm run studio
```
Opens the visual Studio dashboard at `http://localhost:3333`.

### 3. Deploy Studio to Sanity Cloud
```bash
npm run studio:deploy
```

### 4. Re-Seed Sanity Dataset
To upload or reset all portfolio content to Sanity Cloud:
```bash
VITE_SANITY_PROJECT_ID=your_id SANITY_AUTH_TOKEN=your_token npm run seed:sanity
```

---

## Environment Variables

Copy `.env.example` to `.env`:
```env
# Sanity Cloud CMS (Primary)
VITE_SANITY_PROJECT_ID=your_sanity_project_id
VITE_SANITY_DATASET=production

# Strapi Local CMS (Optional fallback)
VITE_STRAPI_API_URL=http://localhost:1337
```
*(All `.env` files are strictly gitignored to protect secrets).*
