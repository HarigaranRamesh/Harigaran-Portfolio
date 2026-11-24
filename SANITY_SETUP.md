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

### Step 5: Run or Deploy your Sanity Studio Dashboard

#### Option A: Run your Studio Locally
Run this command from your portfolio folder:
```bash
npm run studio
```
It will open your visual admin panel at `http://localhost:3333` where you can edit:
- Profile (Bio, Hero, Social links, Avatar, Resume download)
- Projects (Titles, Descriptions, Tech tags, Screenshots, Demo links)
- Skills (Languages, Frameworks, Levels, Brand colors)
- Work Experience
- Education
- Methodology Steps
- Testimonials

#### Option B: Deploy your Free Cloud Studio (Live 24/7 on the Web)
Deploy your Sanity Studio to a permanent free Sanity domain:
```bash
cd studio && npx sanity deploy
```
Choose a hostname (e.g. `harigaran-portfolio`), and you'll get a permanent live admin URL:
`https://harigaran-portfolio.sanity.studio` accessible from any browser anywhere!

---

### Step 6 (Optional): Auto-Populate all Existing Content with 1 Command
To automatically upload all your existing 27 skills, projects, experience, education, and profile data into Sanity:
1. In your Sanity dashboard ([manage.sanity.io](https://manage.sanity.io)) → **Your Project** → **API** → **Tokens**.
2. Click **+ Add API token**, select **Editor** permissions, and copy the token.
3. Run in your terminal:
```bash
SANITY_AUTH_TOKEN=your_token_here npm run seed:sanity
```
Everything will be uploaded directly to Sanity cloud instantly!

---

### You're Done!
Your portfolio will now pull everything in real-time from Sanity's global 24/7 cloud CDN at 0 cost forever.
