import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

dotenv.config();

import connectDB from './configs/dbconfig.js';
import Message from './modals/messages.js';
import chatRouter from './chat.js';

const app = express();
const port = process.env.PORT || 3000;

// Needed on Render/Railway/etc. so rate limiting sees the real visitor IP.
app.set('trust proxy', 1);

// CLIENT_ORIGIN="https://anuragchandra.in,https://anuragchandra.netlify.app"
const origins = process.env.CLIENT_ORIGIN?.split(',').map((s) => s.trim());
app.use(cors(origins?.length ? { origin: origins } : undefined));
app.use(express.json({ limit: '10kb' }));

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

app.use('/chat', chatLimiter, chatRouter);

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
