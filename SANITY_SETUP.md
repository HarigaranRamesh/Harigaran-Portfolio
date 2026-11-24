# Sanity Cloud CMS Setup Guide (100% Free Forever, No Credit Card)

This portfolio is now configured with universal CMS support:
1. **Sanity.io Cloud CMS**: Runs 24/7 in the cloud, completely free, with no credit card required.
2. **Strapi**: Runs locally or in private environments.
3. **Static Local Fallback**: 100% uptime with instant delivery.

---

## How to get your FREE 24/7 Sanity Cloud Dashboard in 2 Minutes:

### Step 1: Create your Free Account
1. Go to [https://www.sanity.io](https://www.sanity.io).
2. Click **Get Started** and sign in with your **GitHub** account.
3. It creates your free account with **NO credit card required**.

---

### Step 2: Create a Project
1. In your Sanity dashboard ([manage.sanity.io](https://manage.sanity.io)), click **+ Create Project**.
2. Name it: `harigaran-portfolio`
3. Dataset name: `production` (default)
4. Copy your **Project ID** (e.g. `a1b2c3d4`).

---

### Step 3: Enable Public Read Access (CORS)
1. In your Sanity project dashboard, go to **API** → **CORS Origins**.
2. Click **+ Add CORS origin**.
3. Origin: `*` (or add `https://harigaran-portfolio.vercel.app` and `http://localhost:5173`).
4. Check **Allow credentials** and click **Save**.

---

### Step 4: Add Project ID to Vercel and Local Environment
In your `.env` file locally:
```env
VITE_SANITY_PROJECT_ID=your_project_id_here
VITE_SANITY_DATASET=production
```

In your **Vercel Dashboard**:
1. Go to **Settings** → **Environment Variables**.
2. Add:
   - `VITE_SANITY_PROJECT_ID` = `your_project_id_here`
   - `VITE_SANITY_DATASET` = `production`
3. Click **Redeploy**.

---

### You're Done!
Your portfolio will now pull everything in real-time from Sanity's global 24/7 cloud CDN at 0 cost forever.
