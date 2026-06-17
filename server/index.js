import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express()
const port = process.env.PORT || 3000
app.use(cors());

import connectDB from './configs/dbconfig.js';
import Message from './modals/messages.js';

connectDB();


app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/submit', async (req, res) => {
    
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