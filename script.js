const questions = [
  {
    question: "You find a treasure chest. What do you do?",
    answers: [
      { text: "Open it immediately!", type: "Adventurer" },
      { text: "Check for traps first.", type: "Thinker" },
      { text: "Call friends to share the moment.", type: "Socializer" }
    ]
  },
  {
    question: "What’s your ideal weekend?",
    answers: [
      { text: "Exploring a new place", type: "Adventurer" },
      { text: "Reading a good book", type: "Thinker" },
      { text: "Hosting a big dinner", type: "Socializer" }
    ]
  },
  {
    question: "You’re offered a mystery drink. You…",
    answers: [
      { text: "Drink it! Why not?", type: "Adventurer" },
      { text: "Ask what’s inside first", type: "Thinker" },
      { text: "Get everyone to try it together", type: "Socializer" }
    ]
  }
];

let currentQuestionIndex = 0;
let scores = { Adventurer: 0, Thinker: 0, Socializer: 0 };

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const resultEl = document.getElementById("result");
const personalityEl = document.getElementById("personality");
const restartBtn = document.getElementById("restart");

function showQuestion() {
  const question = questions[currentQuestionIndex];
  questionEl.textContent = question.question;
  answersEl.innerHTML = "";
  
  question.answers.forEach(answer => {
    const btn = document.createElement("button");
    btn.textContent = answer.text;
    btn.onclick = () => selectAnswer(answer.type);
    answersEl.appendChild(btn);
  });
}

function selectAnswer(type) {
  scores[type]++;
  currentQuestionIndex++;
  
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  const topType = Object.keys(scores).reduce((a, b) => 
    scores[a] > scores[b] ? a : b
  );
  
  personalityEl.textContent = topType;
  document.getElementById("quiz-container").classList.add("hidden");
  resultEl.classList.remove("hidden");
}

restartBtn.onclick = () => {
  currentQuestionIndex = 0;
  scores = { Adventurer: 0, Thinker: 0, Socializer: 0 };
  resultEl.classList.add("hidden");
  document.getElementById("quiz-container").classList.remove("hidden");
  showQuestion();
};

// Start quiz
showQuestion();
