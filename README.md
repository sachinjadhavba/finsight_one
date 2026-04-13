# FinSight One — Website

## Before Deploying — Update These 3 Lines in src/App.jsx

Line 18: `const WHATSAPP_NUMBER = "919999999999";`
→ Replace with Shweta's actual WhatsApp number (country code + number, no + or spaces)
→ Example: "917890123456"

Line 19: `const EMAIL = "shweta@finsightone.com";`
→ Replace with actual Google Workspace email

Line 20: `const CALENDLY_LINK = "https://calendly.com/finsightone";`
→ Replace with actual Calendly link once set up

---

## Deploy to Vercel (Free — 20 Minutes)

### Option A: GitHub + Vercel (Recommended)

1. Create a free account at github.com
2. Create a new repository called "finsight-one"
3. Upload all these files to the repository
4. Go to vercel.com → Sign up with GitHub
5. Click "Import Project" → Select your repository
6. Vercel auto-detects Vite → Click Deploy
7. Your site goes live at: finsight-one.vercel.app

### Option B: Vercel CLI (If you have Node.js installed)

```bash
npm install
npm run build
npx vercel --prod
```

### Connect Custom Domain (finsightone.com)

1. In Vercel dashboard → Your project → Settings → Domains
2. Type: finsightone.com → Add
3. Vercel shows you 2 DNS records (A record + CNAME)
4. Go to Namecheap → Manage Domain → Advanced DNS
5. Add both records exactly as shown by Vercel
6. Wait 24–48 hours → Site live at finsightone.com

---

## Project Structure

```
finsight-website/
├── index.html          ← Entry point
├── package.json        ← Dependencies
├── vite.config.js      ← Build config
├── vercel.json         ← Vercel settings
├── public/
│   └── favicon.svg     ← Browser tab icon
└── src/
    ├── main.jsx        ← React bootstrap
    └── App.jsx         ← Full website (edit this)
```

---

## Local Preview (Optional)

If you want to preview locally before deploying:
1. Install Node.js from nodejs.org (free)
2. Open terminal in this folder
3. Run: `npm install`
4. Run: `npm run dev`
5. Open: http://localhost:5173

---

## Sections in the Website

1. Navigation — Fixed top nav with CTA button
2. Hero — Headline, animated stats, dual CTA buttons
3. Services — All 4 FinSight systems with hover effects
4. Case Study — MAL agri analytics project
5. Process — 3-step how we work
6. Why Us — Trust signals and banking credibility
7. Contact — Dual-tab form (Loan / Analytics) → WhatsApp
8. Footer — Links and proprietor info
9. Floating WhatsApp button — Always visible bottom right
