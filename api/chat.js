export default async function handler(req, res) {
  // CORS — GitHub Pages のドメインを許可
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages, system } = req.body;

  // Gemini 形式に変換
  // system プロンプトは最初の user メッセージに統合する
  const geminiContents = messages.map((m, i) => {
    const isFirst = i === 0;
    const text = isFirst && system
      ? `${system}\n\n${m.content}`
      : m.content;
    return {
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text }],
    };
  });

  try {
    const apiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: geminiContents }),
      }
    );

    if (!apiRes.ok) {
      const err = await apiRes.json();
      console.error('Gemini API error:', err);
      return res.status(apiRes.status).json({ error: err.error?.message || 'Gemini API error' });
    }

    const data = await apiRes.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
    return res.status(200).json({ text });

  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
