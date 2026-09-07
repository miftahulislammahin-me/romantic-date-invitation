# Romantic Date Invitation ❤️

A three-screen, mobile-first date invitation built with Next.js, React, TypeScript and Tailwind CSS.

## Run locally

1. Install Node.js (LTS).
2. Open this folder in VS Code.
3. Open the VS Code terminal.
4. Run:

```bash
npm install
npm run dev
```

5. Open the local URL shown in the terminal, usually `http://localhost:3000`.

## Build check

```bash
npm run build
```

## Push to GitHub

```bash
git init
git add .
git commit -m "Create romantic date invitation"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

## Deploy to Vercel

Import the GitHub repository into Vercel. Vercel should automatically detect Next.js. No database or environment variables are required.

The app is intentionally client-side: the selected date, time and location are held in React state while moving between the three screens.
