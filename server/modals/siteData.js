import mongoose from 'mongoose';

const { Schema } = mongoose;

const websiteLogSchema = new Schema({
  method: { type: String, required: true },
  path: String,
  url: String,
  statusCode: Number,
  ip: String,
  userAgent: String,
  referrer: String,
  createdAt: { type: Date, default: Date.now, index: true },
});

const websiteVisitSchema = new Schema({
  sessionId: String,
  path: String,
  url: String,
  referrer: String,
  userAgent: String,
  language: String,
  deviceType: String,
  ip: String,
  createdAt: { type: Date, default: Date.now, index: true },
});

const chatLogSchema = new Schema({
  sessionId: String,
  messages: [{
    role: { type: String, enum: ['user', 'assistant', 'system'] },
    content: String,
  }],
  reply: String,
  userAgent: String,
  ip: String,
  createdAt: { type: Date, default: Date.now, index: true },
});

export const WebsiteLog = mongoose.models.WebsiteLog || mongoose.model('WebsiteLog', websiteLogSchema);
export const WebsiteVisit = mongoose.models.WebsiteVisit || mongoose.model('WebsiteVisit', websiteVisitSchema);
export const ChatLog = mongoose.models.ChatLog || mongoose.model('ChatLog', chatLogSchema);

export default { WebsiteLog, WebsiteVisit, ChatLog };
