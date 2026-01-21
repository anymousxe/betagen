// api/chat.js
export const config = { runtime: 'edge' };

export default async function handler(req) {
  const { messages, model } = await req.json();
  const apiKey = process.env.API_KEY;

  if (!apiKey) return new Response("Missing API_KEY", { status: 500 });

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://droidgen.beta",
    },
    body: JSON.stringify({
      model: model,
      messages: messages,
      stream: true, // This enables the "watch it code" feature
      temperature: 0.7 
    }),
  });

  return new Response(res.body, {
    headers: { 'Content-Type': 'text/event-stream' },
  });
}
