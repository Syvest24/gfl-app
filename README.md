# Gentle Focus Lab — Image Generator

A React app for generating Pinterest, Instagram, and Story images for Gentle Focus Lab products.

## Local Development

```bash
npm install
npm run dev
```

## Deploy to Netlify

1. Push this folder to a GitHub repo
2. Go to netlify.com → Add new site → Import from Git
3. Select your repo
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Click Deploy

## Deploy to Vercel

1. Push this folder to a GitHub repo
2. Go to vercel.com → Add New Project → Import from Git
3. Select your repo — Vercel auto-detects Vite
4. Click Deploy

Or use the Vercel CLI:
```bash
npm i -g vercel
vercel
```

## Features
- Pinterest (1000×1500), Instagram (1080×1080), Story (1080×1920)
- 3 products × 6 content types × 4 tones = 72+ content variations
- 6 colour palettes
- 8 background scenes (flat-lay, botanical, cozy, marble, gradient, pattern, upload)
- Lena avatar persona toggle
- Carousel slide generator (4 slides)
- Batch generation (4 style variations)
- One-click PNG download
- Caption + hashtag copy
