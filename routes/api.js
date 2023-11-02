const express = require('express');
const router = express.Router();
const { OpenAI } = require("openai");
const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
});


router.post('/openai', async (req, res) => {
  const { key, prompt } = req.body;
  console.log(req.body);
  const templatePrompt = `using this following json template, create a quiz off of the topic prompted.
Make sure to include the quotes  [{"Question": "","Answers": ["","","",""],"CorrectAnswer": 0,},{"Question": "","Answers": ["","","",""],"CorrectAnswer": 0,}]`;

  if (!key || !prompt) {
    return res.status(400).send('Key and prompt are required');
  }

  try {
    const response = await openai.completions.create({
      prompt: templatePrompt + prompt,
      max_tokens: 2000,
      model: 'text-davinci-003',
    });

    res.json({ response: response.choices[0].text.trim() });

  } catch (error) {
    console.error("Error interacting with OpenAI:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
