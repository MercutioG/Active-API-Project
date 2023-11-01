const express = require('express');
const router = express.Router();
const { OpenAI } = require("openai");
const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
});

router.get('/openai', async (req, res) => {
  const userPrompt = req.query.prompt;
  if (!userPrompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  const templatePrompt = `using this following json template, create a quiz off of the topic prompted.
  [
    {
      "Question": "",
      "Answers": ["","","",""],
      "CorrectAnswer": 0,
    }
  ]`;

  try {
    const response = await openai.completions.create('text-davinci-003', {
      prompt: templatePrompt + userPrompt,
      max_tokens: 2000,
    });

    const message = response.choices[0].text.trim();
    res.json({ message });
  } catch (error) {
    console.error("Error interacting with OpenAI:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
