# Anurag Chandra Portfolio

A React + Express portfolio for showcasing engineering projects, AI work, and backend system experience.

## Overview

This site includes:

- portfolio landing page with sections for projects, skills, and journey
- live stats from GitHub, LeetCode, and CodeChef
- contact form with MongoDB persistence
- AI assistant chat powered by Gemini
- analytics tracking with consent-based privacy controls
- protected dashboard for admin review of saved data
- SEO files for Search Console indexing

## Stack

Frontend
- React
- Vite
- Framer Motion
- CSS modules / custom CSS

Backend
- Node.js
- Express
- MongoDB with Mongoose

## Project structure

```text
anuragprofile/
├── client/
│   ├── public/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── configs/
│   ├── modals/
│   ├── routes/
│   ├── chat.js
│   ├── index.js
│   └── package.json
├── README.md
└── .gitignore
```

## Local setup

### 1) Install dependencies

Frontend:

```bash
cd anuragprofile/client
npm install
```

Backend:

```bash
cd anuragprofile/server
npm install
```

### 2) Environment variables

Frontend `.env`:

```bash
VITE_API_URL=http://localhost:3000
```

Backend `.env`:

```bash
PORT=3000
MONGODB_URI=mongodb://localhost:27017/anuragprofile
CLIENT_ORIGIN=http://localhost:5173
GEMINI_API_KEY=your_gemini_key
GITHUB_USERNAME=anuragchandr
LEETCODE_USERNAME=nrgchandra
CODECHEF_USERNAME=nrgchandra
```

### 3) Run app

Backend:

```bash
cd anuragprofile/server
npm run dev
```

Frontend:

```bash
cd anuragprofile/client
npm run dev
```

## Admin dashboard

Open:

```text
http://localhost:3000/dashboard
```

Credentials:

- username: `nrgchandra`
- password: `160802`

The dashboard shows:

- contact messages
- chat logs
- website visits
- server request logs

## Privacy and analytics

The site uses a cookie consent toast. Visitors can choose:

- Essential only
- Accept analytics

Analytics are only submitted after consent is granted.

## SEO

The project includes:

- `robots.txt`
- `sitemap.xml`
- canonical tag in `index.html`
- manifest file for web app support

## Deployment

Deploy the frontend separately from the backend.

Typical setup:

- Frontend: Netlify / Vercel / Cloudflare Pages
- Backend: Render / Railway / VPS

Set your production API URL in the frontend environment variables.

## Useful links

- Main website: `https://anuragchandra.in`
- Resume: `/resume.pdf`
- GitHub: `https://github.com/anuragchandr`

## Notes

This portfolio is designed for personal branding and professional presentation. Keep sensitive data and internal credentials protected in the deployed environment.

