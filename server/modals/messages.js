import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
});

export default mongoose.model('Message', messageSchema);