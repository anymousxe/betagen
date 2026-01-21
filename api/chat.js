// api/chat.js
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { messages, model } = req.body;
  const apiKey = process.env.API_KEY; // Your Vercel Env Var

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://droidgen.beta",
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
        temperature: 0.7 // Creative coding
      }),
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
