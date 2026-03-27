const express = require('express');
const router = express.Router();
const { GoogleGenAI } = require('@google/genai');

// POST /api/ai/recommend
router.post('/recommend', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: 'Prompt is required' });
    }

    // Initialize the AI client (it automatically looks for GEMINI_API_KEY in your .env file)
    const ai = new GoogleGenAI({}); 

    // Define the AI's instructions
    const systemInstruction = "You are a movie recommendation expert. The user will give you a prompt. Recommend 3 movies based on their request. Include the title, release year, and a 1-sentence reason why it fits their prompt.";
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `${systemInstruction}\n\nUser Request: ${prompt}`
    });

    res.json({ text: response.text });

  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ message: 'Failed to fetch recommendation from AI' });
  }
});

module.exports = router;