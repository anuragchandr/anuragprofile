import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express()
const port = process.env.PORT || 3000
app.use(cors());

import connectDB from './configs/dbconfig.js';
import Message from './modals/messages.js';

connectDB();

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 4, // Limit each IP to 4 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
	// store: ... , // Redis, Memcached, etc. See below.
})

// Apply the rate limiting middleware to all requests.
app.use(limiter)
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/submit', limiter, async (req, res) => {
    
    try{
        const message = new Message(req.body);

        await message.save();

        res.status(201).json({
            message: "Message saved successfully",
            data: message
        });
    } catch (error) {
        console.error('Error saving message:', error);
        res.status(500).json({
            message: "Error saving message"
        });
    }

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})