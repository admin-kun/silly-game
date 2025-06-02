export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { riddle, answer } = req.body;

  const answers = {
    1: '7',
    2: 'march',
    3: '2'
  };

  if (!answers[riddle]) {
    return res.status(400).json({ error: 'Invalid riddle number' });
  }

  const correct = answers[riddle].toLowerCase() === answer.toLowerCase();

  res.json({ correct });
}
