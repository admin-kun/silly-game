const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Serve static files from /public
app.use(express.static(path.join(__dirname, "public")));

const riddles = [
  { answer: "7", reward: "https://docs.google.com/document/" },
  { answer: "march", reward: "" },
  {
    answer: "2",
    reward: "d/1IgXn3-hdt49qBCKsxidny07485pRXwdZY3u5fjWlE5A/edit?usp=sharing",
  },
];

app.post("/check", (req, res) => {
  const { riddleIndex, userAnswer } = req.body;
  if (
    typeof riddleIndex !== "number" ||
    riddleIndex < 0 ||
    riddleIndex >= riddles.length
  ) {
    return res.json({ correct: false });
  }
  const correctAnswer = riddles[riddleIndex].answer.toLowerCase();
  if (userAnswer.trim().toLowerCase() === correctAnswer) {
    return res.json({
      correct: true,
      reward: riddles[riddleIndex].reward,
    });
  }
  res.json({ correct: false });
});

app.listen(port, () => {
  console.log(`Riddle game running on http://localhost:${port}`);
});
