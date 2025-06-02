export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { riddle, answer } = req.body;
  console.log('Received:', { riddle, answer });

  const answers = {
    1: '7',
    2: 'march',
    3: '2'
  };

  if (!answers[riddle]) {
    console.log('Invalid riddle number:', riddle);
    return res.status(400).json({ error: 'Invalid riddle number' });
  }

  const correct = answers[riddle].toLowerCase() === answer.toLowerCase();
  console.log('Answer correct?', correct);

  res.json({ correct });
}
