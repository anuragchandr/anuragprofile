import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';

dotenv.config();

import connectDB from './configs/dbconfig.js';
import Message from './modals/messages.js';
import { WebsiteLog, WebsiteVisit, ChatLog } from './modals/siteData.js';
import chatRouter from './chat.js';
import statsRouter from './routes/stats.js';

const app = express();
const port = process.env.PORT || 3000;

const ADMIN_USERNAME = 'nrgchandra';
const ADMIN_PASSWORD = '160802';

const escapeHtml = (value) => String(value ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;');

const requireDashboardAuth = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const [scheme, encoded] = authHeader.split(' ');
  if (scheme !== 'Basic' || !encoded) {
    res.set('WWW-Authenticate', 'Basic realm="Portfolio Dashboard"');
    return res.status(401).send('Unauthorized');
  }

  const decoded = Buffer.from(encoded, 'base64').toString('utf8');
  const [username, password] = decoded.split(':');
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    return next();
  }

  res.set('WWW-Authenticate', 'Basic realm="Portfolio Dashboard"');
  return res.status(401).send('Unauthorized');
};

const getClientIp = (req) => {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') return forwarded.split(',')[0].trim();
  if (Array.isArray(forwarded)) return forwarded[0]?.trim() || req.socket?.remoteAddress || 'unknown';
  return req.socket?.remoteAddress || 'unknown';
};

// Needed on Render/Railway/etc. so rate limiting sees the real visitor IP.
app.set('trust proxy', 1);

// CLIENT_ORIGIN="https://anuragchandra.in,https://anuragchandra.netlify.app"
const origins = process.env.CLIENT_ORIGIN?.split(',').map((s) => s.trim());
app.use(cors(origins?.length ? { origin: origins } : undefined));
app.use(express.json({ limit: '10kb' }));

app.use((req, res, next) => {
  const record = () => {
    if (mongoose.connection.readyState !== 1) return;

    WebsiteLog.create({
      method: req.method,
      path: req.path,
      url: `${req.protocol || 'http'}://${req.get('host') || 'localhost'}${req.originalUrl || req.url}`,
      statusCode: res.statusCode,
      ip: getClientIp(req),
      userAgent: req.get('user-agent') || '',
      referrer: req.get('referer') || '',
    }).catch(() => {});
  };

  res.on('finish', record);
  res.on('close', record);
  next();
});

connectDB();

// Contact form: strict (unchanged behaviour, now only applied to /submit).
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 4,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  ipv6Subnet: 56,
});

// Chatbot: looser, because a conversation is many requests.
const chatLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  ipv6Subnet: 56,
  message: { error: 'Too many messages. Please try again in a few minutes.' },
});

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/dashboard', requireDashboardAuth, async (req, res) => {
  try {
    const [messages, chats, visits, logs] = await Promise.all([
      Message.find({}).sort({ _id: -1 }).limit(25).lean(),
      ChatLog.find({}).sort({ _id: -1 }).limit(25).lean(),
      WebsiteVisit.find({}).sort({ _id: -1 }).limit(25).lean(),
      WebsiteLog.find({}).sort({ _id: -1 }).limit(25).lean(),
    ]);

    const renderRows = (items, columns) => {
      if (!items.length) return '<tr><td colspan="100%" style="padding:12px;color:#8da0b6;">No records yet.</td></tr>';
      return items.map((item) => `
        <tr>
          ${columns.map((column) => `<td style="padding:12px;border-top:1px solid rgba(255,255,255,.08);vertical-align:top;color:#e6edf3;">${escapeHtml(item[column] ?? '')}</td>`).join('')}
        </tr>
      `).join('');
    };

    const dashboardHtml = `
      <!doctype html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Portfolio Dashboard</title>
        <style>
          * { box-sizing: border-box; }
          body { margin: 0; font-family: Arial, sans-serif; background: #091018; color: #e6edf3; }
          .wrap { max-width: 1500px; margin: 0 auto; padding: 32px 20px 60px; }
          .top { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-bottom: 24px; }
          .badge { display: inline-block; padding: 8px 12px; border-radius: 999px; background: rgba(0,229,200,.12); color: #7ef7de; border: 1px solid rgba(0,229,200,.3); }
          .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; margin-bottom: 28px; }
          .card { background: rgba(255,255,255,.02); border: 1px solid rgba(255,255,255,.08); border-radius: 16px; padding: 18px; }
          .card h3 { margin: 0 0 12px; font-size: 14px; color: #8aa0b6; text-transform: uppercase; letter-spacing: .08em; }
          .big { font-size: 26px; font-weight: bold; color: #ffc14d; }
          .panel { margin-top: 28px; background: rgba(255,255,255,.02); border: 1px solid rgba(255,255,255,.08); border-radius: 16px; overflow: hidden; }
          .panel h2 { margin: 0; padding: 18px 20px; border-bottom: 1px solid rgba(255,255,255,.08); font-size: 18px; }
          table { width: 100%; border-collapse: collapse; }
          th { text-align: left; padding: 12px; background: rgba(255,255,255,.02); color: #8aa0b6; font-size: 12px; letter-spacing: .08em; text-transform: uppercase; }
          td { padding: 12px; border-top: 1px solid rgba(255,255,255,.08); }
          @media (max-width: 760px) { .top { flex-direction: column; align-items: flex-start; } }
        </style>
      </head>
      <body>
        <div class="wrap">
          <div class="top">
            <div>
              <div class="badge">Portfolio Admin</div>
              <h1 style="margin: 12px 0 0; font-size: 32px;">Analytics & Message Dashboard</h1>
            </div>
          </div>

          <div class="grid">
            <div class="card"><h3>Messages</h3><div class="big">${messages.length}</div></div>
            <div class="card"><h3>Chat Logs</h3><div class="big">${chats.length}</div></div>
            <div class="card"><h3>Visits</h3><div class="big">${visits.length}</div></div>
            <div class="card"><h3>Website Logs</h3><div class="big">${logs.length}</div></div>
          </div>

          <div class="panel">
            <h2>Recent contact form submissions</h2>
            <table>
              <thead><tr><th>Name</th><th>Email</th><th>Message</th><th>Saved</th></tr></thead>
              <tbody>${renderRows(messages, ['name', 'email', 'message', 'createdAt'])}</tbody>
            </table>
          </div>

          <div class="panel">
            <h2>Recent chat conversations</h2>
            <table>
              <thead><tr><th>Session</th><th>Reply</th><th>Messages</th><th>Saved</th></tr></thead>
              <tbody>${renderRows(chats, ['sessionId', 'reply', 'messages', 'createdAt'])}</tbody>
            </table>
          </div>

          <div class="panel">
            <h2>Recent website visits</h2>
            <table>
              <thead><tr><th>Session</th><th>Path</th><th>Device</th><th>Referrer</th><th>Saved</th></tr></thead>
              <tbody>${renderRows(visits, ['sessionId', 'path', 'deviceType', 'referrer', 'createdAt'])}</tbody>
            </table>
          </div>

          <div class="panel">
            <h2>Recent request logs</h2>
            <table>
              <thead><tr><th>Method</th><th>Path</th><th>Status</th><th>IP</th><th>Saved</th></tr></thead>
              <tbody>${renderRows(logs, ['method', 'path', 'statusCode', 'ip', 'createdAt'])}</tbody>
            </table>
          </div>
        </div>
      </body>
      </html>
    `;

    res.type('html').send(dashboardHtml);
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).send('Dashboard error');
  }
});

app.post('/api/analytics/visit', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(202).json({ ok: true, stored: false });
    }

    const payload = req.body ?? {};
    const visit = await WebsiteVisit.create({
      sessionId: payload.sessionId || 'anonymous',
      path: payload.path || req.headers.referer || '/',
      url: payload.url || `${req.protocol || 'http'}://${req.get('host') || 'localhost'}${req.originalUrl || req.url}`,
      referrer: payload.referrer || req.get('referer') || '',
      userAgent: payload.userAgent || req.get('user-agent') || '',
      language: payload.language || req.get('accept-language') || '',
      deviceType: payload.deviceType || 'desktop',
      ip: getClientIp(req),
    });

    res.status(201).json({ ok: true, stored: !!visit?._id });
  } catch (error) {
    console.error('Error saving visit analytics:', error);
    res.status(500).json({ ok: false, message: 'Analytics not saved' });
  }
});

// Stats are cached for an hour in the route, so this limiter is just a safety net.
const statsLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 60, standardHeaders: 'draft-8', legacyHeaders: false, ipv6Subnet: 56 });

app.use('/chat', chatLimiter, chatRouter);
app.use('/stats', statsLimiter, statsRouter);

app.post('/submit', contactLimiter, async (req, res) => {
  try {
    const { name, email, message } = req.body ?? {};
    const doc = new Message({ name, email, message }); // whitelist fields
    await doc.save();
    res.status(201).json({ message: 'Message saved successfully', data: doc });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ message: 'Error saving message' });
  }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));