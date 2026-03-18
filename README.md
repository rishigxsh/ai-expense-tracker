# FinSight — AI-Powered Expense Tracker

> Track smarter. Spend wiser.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-finsightbeta.vercel.app-brightgreen?logo=vercel&style=for-the-badge)](https://finsightbeta.vercel.app/)

![React](https://img.shields.io/badge/React_18-JavaScript-61DAFB?logo=react&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Firestore%20%2B%20Auth-FFCA28?logo=firebase&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## What This Project Demonstrates

- **Client-side AI** — auto-categorization, linear regression forecasting, and rule-based recommendations all run in the browser with zero external API calls
- **Real-time data architecture** — Firebase Firestore with live listeners; expenses sync instantly across tabs and devices
- **React patterns** — Context API for auth and theme state, functional components throughout, clean separation of UI and business logic
- **Data visualization** — Recharts bar, pie, area charts, and a custom spending heatmap built from scratch
- **CI/CD pipeline** — GitHub Actions workflows for automated deployment to Vercel and Firebase Hosting
- **Production deployment** — live app with Google OAuth, per-user data isolation, and Firestore security rules

---

## Live Demo

**[finsightbeta.vercel.app](https://finsightbeta.vercel.app/)**

Sign in with Google to try the full app — add expenses, view analytics, set a monthly budget, and see the AI recommendations update in real time.

---

## Screenshots

### Login
![Login Page](../main/screenshots/login.png)

### Dashboard
![Dashboard](../main/screenshots/dashboard.png)

### Analytics
![Analytics Page](../main/screenshots/analytics.png)

---

## Features

| Feature | Details |
|---|---|
| Expense management | Add, edit, delete expenses with real-time Firestore sync |
| AI auto-categorization | Keyword-based categorizer suggests category as you type (100+ keywords, runs client-side) |
| Spending forecast | Linear regression model predicts next month's spend with R² confidence score |
| Smart recommendations | Rule-based engine analyzes budget compliance, category dominance, and month-over-month trends |
| Analytics dashboard | Bar, pie, area charts + spending heatmap — all built with Recharts |
| Monthly budget limits | Visual progress bar with warning states as you approach your limit |
| Dark mode | Light/dark theme toggle with localStorage persistence |
| Google Auth | OAuth 2.0 login with per-user data isolation in Firestore |

---

## Tech Stack

**Frontend**
- React 18 + JavaScript — functional components and hooks throughout
- Vite 5 — fast dev server with HMR and optimized production builds
- Tailwind CSS 3.4 — utility-first styling with custom dark mode config
- React Router DOM 7 — client-side routing across 5 pages
- Recharts 2.15 — bar, pie, area charts and custom tooltip components
- React Context API — auth state (`AuthContext`) and theme state (`ThemeContext`)

**Backend & Data**
- Firebase Firestore — real-time NoSQL database with live listeners
- Firebase Authentication — Google OAuth 2.0
- Firestore Security Rules — server-side per-user data isolation

**AI / Algorithms (all client-side, no external APIs)**
- `categorizer.js` — keyword pattern matching across 8 expense categories
- `predictor.js` — least-squares linear regression for monthly spend forecasting, R² goodness-of-fit
- `recommender.js` — threshold-based rule engine: budget compliance, category dominance (>50%), trend deltas (>5% MoM)

**Infrastructure**
- Vercel — frontend hosting with CI/CD on push to `main`
- Firebase Hosting — alternative deployment target
- GitHub Actions — automated deploy workflows (`.github/workflows/`)

---

## Architecture

```
User Input (ExpenseForm)
        │
        ▼
AI Categorizer          ← keyword match, runs in browser instantly
(categorizer.js)
        │
        ▼
Firebase Firestore      ← real-time sync across devices
        │
        ▼
Data Aggregation        ← monthly rollups for charts + AI input
        │
   ┌────┴────┐
   ▼         ▼
Predictor  Recommender  ← linear regression + rule engine
        │
        ▼
React Components        ← Recharts visualizations, summary cards
```

**Firestore data model:**
```
users/{userId}/
  ├── profile/        → displayName, email, photoURL
  ├── expenses/       → amount, category, description, date
  └── limit/          → monthly budget value
```

---

## Project Structure

```
src/
├── components/
│   ├── ExpenseForm.jsx        # Add expense + AI category suggestion
│   ├── ExpenseList.jsx        # Expense table with category icons
│   ├── ExpenseSummary.jsx     # Spend summary with progress bars
│   ├── ExpenseCharts.jsx      # Pie + bar charts (Recharts)
│   ├── SpendingHeatmap.jsx    # Daily spending intensity grid
│   ├── ExpensePrediction.jsx  # Next-month forecast display
│   ├── Recommendations.jsx    # AI budget tips panel
│   ├── SpendLimit.jsx         # Monthly limit tracker
│   └── Navbar.jsx             # Navigation + auth dropdown
│
├── pages/
│   ├── Home.jsx               # Main dashboard
│   ├── Analytics.jsx          # Full analytics view
│   ├── Settings.jsx           # Profile, theme, data management
│   ├── Features.jsx           # AI features explainer
│   └── About.jsx
│
├── context/
│   ├── AuthContext.jsx        # Google Auth state
│   └── ThemeContext.jsx       # Dark/light mode state
│
├── services/
│   ├── firebase.js            # Firebase init + config
│   ├── categorizer.js         # Keyword-based AI categorizer
│   ├── predictor.js           # Linear regression forecaster
│   ├── recommender.js         # Rule-based recommendation engine
│   └── storage.js             # LocalStorage utilities
│
├── App.jsx                    # Root component + route definitions
└── main.jsx                   # Entry point
```

---

## Running Locally

**Prerequisites:** Node.js 16+, a free Firebase account.

```bash
# 1. Clone the repo
git clone https://github.com/rishigxsh/ai-expense-tracker.git
cd "ai-expense-tracker/AI Expense Tracker"

# 2. Install dependencies
npm install

# 3. Configure Firebase
# Create a project at console.firebase.google.com
# Enable Firestore + Google Authentication
# Copy your config into src/services/firebase.js

# 4. Start the dev server
npm run dev
# → http://localhost:5173
```

**Build for production:**
```bash
npm run build
npm run preview
```

---

## Key Engineering Decisions

**Why run all AI client-side instead of calling an external API?**
No API keys, no latency, no cost, and no data leaves the user's browser. The categorizer responds instantly as the user types. The forecaster and recommender run on local data only — a deliberate privacy trade-off.

**Why linear regression for spending prediction?**
It's interpretable — users can understand "your spending has been going up ~$50/month." More complex models (ARIMA, LSTM) would be overkill for the data volume a personal finance app generates and would add significant bundle size.

**Why Firebase over a custom backend?**
Firestore's real-time listeners mean expense updates sync instantly across tabs and devices with zero polling code. For a solo-built project, Firebase handles auth, database, and hosting rules — removing the need to build and maintain a server.

**Why Context API over Redux or Zustand?**
The app has two global state concerns: auth and theme. Both are simple and rarely change. Context is the right tool — Redux would be over-engineered for this scope.

---

## License

MIT — free to use, fork, and build on.
