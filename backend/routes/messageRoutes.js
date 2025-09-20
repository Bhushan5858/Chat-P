import express from "express";
import Message from "../models/Message.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {

    console.log(req.body);
    const { sender, receiver, text } = req.body;
    const newMessage = new Message({ sender, receiver, text });
    await newMessage.save();
    res.json(newMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
