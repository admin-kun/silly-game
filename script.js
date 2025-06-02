const riddles = [
  {
    id: 1,
    text: "What number scares 10 so much it disappears?",
    answer: "7",
    reward: "https://docs.google.com/document/"
  },
  {
    id: 2,
    text: "Not just a month, but a verb in charge, Step by step, I lead the march.",
    answer: "march",
    reward: "Seriously, why are you doing this?" // no reward for challenge
  },
  {
    id: 3,
    text: "First pair’s leader, even and prime, One more than one, I’m your number this time.",
    answer: "2",
    reward: "https://docs.google.com/d/1IgXn3-hdt49qBCKsxidny07485pRXwdZY3u5fjWlE5A/edit?usp=sharing"
  }
];

let currentRiddleIndex = 0;
const inventory = [];

const riddleTextEl = document.getElementById("riddle-text");
const answerInputEl = document.getElementById("answer-input");
const submitBtn = document.getElementById("submit-btn");
const resultEl = document.getElementById("result");
const inventoryEl = document.getElementById("inventory");

function showRiddle() {
  if (currentRiddleIndex >= riddles.length) {
    riddleTextEl.textContent = "Congrats! You solved all riddles.";
    answerInputEl.style.display = "none";
    submitBtn.style.display = "none";
    return;
  }
  const riddle = riddles[currentRiddleIndex];
  riddleTextEl.textContent = riddle.text;
  answerInputEl.value = "";
  resultEl.textContent = "";
}

function updateInventory() {
  inventoryEl.innerHTML = "";
  inventory.forEach(link => {
    const a = document.createElement("a");
    a.href = link;
    a.textContent = "View Reward";
    a.target = "_blank";
    a.className = "reward-link";
    inventoryEl.appendChild(a);
  });
}

async function checkAnswer(answer) {
  // Placeholder backend URL — update after deploying backend on Vercel!
  const backendUrl = "https://your-vercel-app.vercel.app/api/check";

  try {
    const response = await fetch(backendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ riddle: riddles[currentRiddleIndex].id, answer })
    });
    if (!response.ok) throw new Error("Server error");

    const data = await response.json();
    return data.correct;
  } catch (err) {
    console.error(err);
    resultEl.textContent = "Error checking answer. Try again later.";
    return false;
  }
}

submitBtn.addEventListener("click", async () => {
  const userAnswer = answerInputEl.value.trim();
  if (!userAnswer) {
    resultEl.textContent = "Please enter an answer.";
    return;
  }

  const correct = await checkAnswer(userAnswer);
  if (correct) {
    resultEl.textContent = "Correct! 🎉";
    const reward = riddles[currentRiddleIndex].reward;
    if (reward) {
      inventory.push(reward);
      updateInventory();
    }
    currentRiddleIndex++;
    setTimeout(showRiddle, 1500);
  } else {
    resultEl.textContent = "Wrong answer, try again.";
  }
});

showRiddle();
