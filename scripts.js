// ----------------------
// LOCAL HOROSCOPE DATA
// ----------------------

const horoscopes = {
  aries: [
    "Today is your power day 🔥",
    "Take bold decisions.",
    "Confidence will bring success."
  ],
  taurus: [
    "Financial growth possible 💰",
    "Focus on stability.",
    "Peaceful day ahead."
  ],
  gemini: [
    "Communication brings opportunity 📞",
    "Stay positive.",
    "New ideas will shine."
  ],
  cancer: [
    "Emotional balance is important 💖",
    "Family support is strong.",
    "Trust your intuition."
  ],
  leo: [
    "Leadership brings rewards 🦁",
    "Shine bright today.",
    "Take initiative."
  ],
  virgo: [
    "Organize your goals 📋",
    "Hard work pays off.",
    "Focus on details."
  ],
  libra: [
    "Balance brings harmony ⚖",
    "Avoid overthinking.",
    "New partnership possible."
  ],
  scorpio: [
    "Your passion is powerful 🦂",
    "Face challenges bravely.",
    "Transformation begins."
  ],
  sagittarius: [
    "Adventure awaits 🌍",
    "Travel plans possible.",
    "New learning opportunity."
  ],
  capricorn: [
    "Discipline leads to success 🏆",
    "Stay patient.",
    "Big achievement coming."
  ],
  aquarius: [
    "Creative ideas flow 🌊",
    "Unexpected help arrives.",
    "Innovation wins."
  ],
  pisces: [
    "Dream big today 🌙",
    "Emotional clarity ahead.",
    "Creative energy high."
  ]
};

// ----------------------
// LOGIN SYSTEM
// ----------------------

function login() {
  const name = document.getElementById("username").value.trim();

  if (!name) {
    alert("Enter your name!");
    return;
  }

  localStorage.setItem("username", name);

  document.getElementById("loginBox").classList.add("hidden");
  document.getElementById("mainApp").classList.remove("hidden");
  document.getElementById("welcomeText").innerText = "Welcome, " + name + " ✨";

  loadHistory();
}

window.onload = function () {
  const savedName = localStorage.getItem("username");

  if (savedName) {
    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("mainApp").classList.remove("hidden");
    document.getElementById("welcomeText").innerText =
      "Welcome back, " + savedName + " ✨";

    loadHistory();
  }
};

// ----------------------
// HOROSCOPE FUNCTION
// ----------------------

function getHoroscope() {
  const sign = document.getElementById("zodiac").value;
  const resultDiv = document.getElementById("result");
  const sound = document.getElementById("clickSound");

  if (!sign) {
    alert("Select zodiac sign!");
    return;
  }

  // Safe sound play
  if (sound) {
    sound.currentTime = 0;
    sound.play().catch(() => {});
  }

  resultDiv.classList.remove("show");

  const messages = horoscopes[sign];
  const randomMessage =
    messages[Math.floor(Math.random() * messages.length)];

  setTimeout(() => {
    resultDiv.innerText = randomMessage;
    resultDiv.classList.add("show");
    saveHistory(sign, randomMessage);
  }, 300);
}

// ----------------------
// HISTORY SYSTEM
// ----------------------

function saveHistory(sign, text) {
  let history = JSON.parse(localStorage.getItem("history")) || [];

  const entry =
    sign.charAt(0).toUpperCase() + sign.slice(1) + ": " + text;

  history.unshift(entry);

  if (history.length > 5) {
    history.pop();
  }

  localStorage.setItem("history", JSON.stringify(history));

  loadHistory();
}

function loadHistory() {
  const historyList = document.getElementById("history");
  historyList.innerHTML = "";

  let history = JSON.parse(localStorage.getItem("history")) || [];

  history.forEach((item) => {
    let li = document.createElement("li");
    li.innerText = item;
    historyList.appendChild(li);
  });
}
