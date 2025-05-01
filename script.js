
const startBtn = document.getElementById("start-btn");
const welcomeScreen = document.getElementById("welcome-screen");
const gameScreen = document.getElementById("game-screen");
const birthdayScreen = document.getElementById("birthday-screen");
const romanticScreen = document.getElementById("romantic-screen");
const instruction = document.getElementById("game-instruction");
const heartsContainer = document.getElementById("hearts");
const tapCounter = document.getElementById("tap-counter");
const typedText = document.getElementById("typed-text");

const birthdayMusic = document.getElementById("birthday-music");
const romanticMusic = document.getElementById("romantic-music");

let level = 1;
let taps = 0;
let requiredTaps = [4, 5, 25];

function createHearts(num) {
  heartsContainer.innerHTML = '';
  for (let i = 0; i < num; i++) {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.onclick = () => {
      taps++;
      heart.style.opacity = 0.3;
      updateGame();
    };
    heartsContainer.appendChild(heart);
  }
  tapCounter.textContent = `Taps: ${taps}/${requiredTaps[level - 1]}`;
}

function updateGame() {
  tapCounter.textContent = `Taps: ${taps}/${requiredTaps[level - 1]}`;
  if (taps >= requiredTaps[level - 1]) {
    level++;
    taps = 0;
    if (level <= 3) {
      instruction.textContent = level === 3 ? 
        "Level 3: Tap 25 hearts. Please hurry up, it's your last level and a great surprise is waiting!" :
        `Level ${level}: Tap ${requiredTaps[level - 1]} hearts`;
      createHearts(requiredTaps[level - 1]);
    } else {
      gameScreen.classList.remove("show");
      birthdayScreen.classList.add("show");
      birthdayMusic.play();
      setTimeout(() => {
        birthdayScreen.classList.remove("show");
        romanticScreen.classList.add("show");
        birthdayMusic.pause();
        romanticMusic.play();
        document.body.style.background = "darkred";
        typeRomanticMessage([
          "Raat ke chand ki tarah tum haseen ho...",
          "Dil ki har dhadkan mein tum baseen ho...",
          "Zindagi ka har lamha tere naam kiya...",
          "Meri har dua mein tum shaamil ho...",
          "Mujhe har pal tumse mohabbat hai...",
          "Aur yeh mohabbat kabhi kam nahi hogi...",
          "Apko ni pata Aadee apsy kitna pyar krta ha"
        ], 0);
      }, 10000);
    }
  }
}

function typeRomanticMessage(lines, index) {
  if (index < lines.length) {
    let line = lines[index];
    let charIndex = 0;
    let lineText = '';
    let typer = setInterval(() => {
      lineText += line[charIndex++];
      typedText.textContent = lineText;
      if (charIndex === line.length) {
        clearInterval(typer);
        typedText.textContent += "\n";
        setTimeout(() => typeRomanticMessage(lines, index + 1), 1000);
      }
    }, 50);
  }
}

startBtn.onclick = () => {
  welcomeScreen.classList.remove("show");
  gameScreen.classList.add("show");
  createHearts(requiredTaps[0]);
};
