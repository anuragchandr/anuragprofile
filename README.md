# Anurag Chandra Portfolio

A personal portfolio and developer website built with React on the frontend and Express/MongoDB on the backend. The project includes a contact form, live stats widgets, an AI chat assistant, analytics capture, privacy consent messaging, and a protected admin dashboard for reviewing saved traffic and messages.

## Project overview

This portfolio is designed to showcase:

- backend engineering and system design work
- AI/ML and full-stack product experience
- live GitHub / coding platform stats
- contact and chat data collection with privacy controls
- SEO and Search Console readiness

## Technology stack

Frontend
- React + Vite
- Framer Motion
- Vanilla CSS with a dark/light theme system

Backend
- Node.js + Express
- MongoDB + Mongoose
- Express rate limiting
- Gmail/SMTP-ready contact flow support

Additional features
- AI assistant integration with Gemini API
- Google Search Console friendly static assets
- analytics event capture with consent gating
- protected admin dashboard

## Repository structure

```text
anuragprofile/
├── client/
│   ├── public/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   └── README.md
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

## Prerequisites

- Node.js 18+
- npm
- MongoDB connection string
- Gemini API key for the chat assistant

## Environment setup

### Frontend

Create a `.env` file inside the client project if needed:

```bash
VITE_API_URL=http://localhost:3000
```

### Backend

Create a `.env` file inside the server project:

```bash
PORT=3000
MONGODB_URI=mongodb://localhost:27017/anuragprofile
CLIENT_ORIGIN=http://localhost:5173
GEMINI_API_KEY=your_key_here
GITHUB_USERNAME=anuragchandr
LEETCODE_USERNAME=nrgchandra
CODECHEF_USERNAME=nrgchandra
```

## Local development

Start the backend:

```bash
cd anuragprofile/server
npm install
npm run dev
```

Start the frontend:

```bash
cd anuragprofile/client
npm install
npm run dev
```

Visit:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`

## Features

### Contact form

The contact form saves submissions to MongoDB with validation and rate limiting.

### AI chat widget

The assistant uses Google Gemini and stores chat history in MongoDB for admin review.

### Analytics and privacy consent

The site tracks visits only after the user accepts analytics in the cookie consent toast. Essential mode keeps the app working without analytics.

### Protected dashboard

Access the admin view at:

```text
http://localhost:3000/dashboard
```

Credentials:

- username: `nrgchandra`
- password: `160802`

This dashboard lists:

- saved contact messages
- chat logs
- website visits
- request logs

### SEO and indexing

The site includes:

- `robots.txt`
- `sitemap.xml`
- canonical metadata
- manifest file
- Open Graph tags

These are important for Google Search Console and browser discovery.

## Deployment notes

### Frontend deployment

Use a static host such as Netlify, Vercel, or Cloudflare Pages.

Important environment values:

```bash
VITE_API_URL=https://your-backend-domain.com
```

### Backend deployment

Use Render, Railway, Fly.io, or a VM with Node.js support.

Set the same `.env` values in the deployed environment and ensure MongoDB connectivity is available.

## Search Console checklist

1. Deploy the frontend to the production domain.
2. Configure the backend on a public URL.
3. Submit the sitemap:
   
   ```text
   https://your-domain.com/sitemap.xml
   ```
4. Verify ownership in Google Search Console.
5. Watch crawl, index, and performance reports.

## Privacy notes

- Analytics are opt-in, not forced.
- Contact form and chat data are stored for review and operational use.
- Only the administrator has access to the dashboard via basic auth.
- Avoid exposing sensitive user data publicly.

## Troubleshooting

### MongoDB connection errors

Check the `MONGODB_URI` and ensure your database is reachable from the backend host.

### Chat assistant not working

Confirm the Gemini API key is valid and your API quota is available.

### Search Console not indexing pages

Check canonical URLs, robots rules, sitemap URLs, and website accessibility from the live host.

## License

This project is for personal portfolio use and is not intended for commercial redistribution without consent.
