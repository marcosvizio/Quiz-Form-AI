import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { scopeOfWork } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: 'user',
          content:
            `Evaluate this scope of work and assign it a score from 1–10 based on size, luxury, and project complexity. Respond only with a number.\n\n${scopeOfWork}`,
        },
      ],
    });

    const responseText = completion.choices[0].message.content.trim();
    const score = parseInt(responseText.match(/\d+/)?.[0] || '0', 10);
    res.status(200).json({ score });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error generating evaluation' });
  }
}
