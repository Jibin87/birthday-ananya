/* ================= HEARTS ================= */

function heartBurst(count = 8) {
  for (let i = 0; i < count; i++) {
    const h = document.createElement("div");
    h.className = "heart";
    h.textContent = "💖";
    h.style.left = 40 + Math.random() * 20 + "vw";
    h.style.fontSize = 14 + Math.random() * 14 + "px";
    h.style.animationDuration = 3 + Math.random() * 2 + "s";
    heartBox.appendChild(h);
    setTimeout(() => h.remove(), 6000);
  }
}

function reveal(from, to) {
  heartBurst(6);
  go(from, to);
}

/* ================= INTRO TYPING ================= */

const bgMusic = document.getElementById("bg-music");

const lines = [
  "Hey Ananya ❤️",
  "Even though we’re apart today…",
  "I wanted you to feel how close you are to me.",
  "It’s your birthday today.",
  "And this is something I made, just for you"
];

let lineIndex = 0;
let charIndex = 0;
const typed = document.getElementById("typed-name");
let typingActive = true;

function typeLines() {
  if (!typingActive) return;

  if (lineIndex < lines.length) {
    if (charIndex < lines[lineIndex].length) {
      typed.textContent += lines[lineIndex].charAt(charIndex++);
      setTimeout(typeLines, 35 + Math.random() * 15);
    } else {
      typed.textContent += "\n";
      lineIndex++;
      charIndex = 0;
      setTimeout(typeLines, 300);
    }
  }
}

typeLines();

/* ================= POPUP ================= */

let nextFrom = null;
let nextTo = null;

function showPopup(message, from = null, to = null) {
  nextFrom = from;
  nextTo = to;
  document.getElementById("popup-text").textContent = message;
  document.getElementById("popup").classList.remove("hidden");
}

function closePopup() {
  document.getElementById("popup").classList.add("hidden");
  if (nextFrom && nextTo) {
    go(nextFrom, nextTo);
    nextFrom = null;
    nextTo = null;
  }
}

/* ================= FLOATING HEARTS ================= */

const heartBox = document.getElementById("heart-container");
setInterval(() => {
  const h = document.createElement("div");
  h.className = "heart";
  h.textContent = ["❤️", "💕", "💖"][Math.floor(Math.random() * 3)];
  h.style.left = Math.random() * 100 + "vw";
  h.style.fontSize = 12 + Math.random() * 16 + "px";
  h.style.animationDuration = 6 + Math.random() * 4 + "s";
  heartBox.appendChild(h);
  setTimeout(() => h.remove(), 10000);
}, 350);

/* ================= MEMORY ROTATION ================= */

const memories = [
  "The way you care deeply, even when you hide it.",
  "How safe I feel just talking to you.",
  "Your laugh, it lives in my head.",
  "How you stayed, even when things were hard.",
  "The way you listen, like what I say truly matters.",
  "How you make ordinary moments feel special.",
  "The comfort I feel just knowing you’re there.",
  "How you try, even when you’re tired.",
  "The way you understand me without many words.",
  "How being with you feels calm, not confusing.",
  "The way you choose honesty, even when it’s difficult.",
  "How you make me want to be better, not different.",
  "The warmth you bring into my life, quietly.",
  "How loving you feels natural, not forced.",
  "The way you feel like home, even from far away."
];

let memIndex = 0;
const memText = document.getElementById("memory-text");

setInterval(() => {
  memText.style.opacity = 0;
  setTimeout(() => {
    memText.textContent = memories[memIndex];
    memText.style.opacity = 1;
    memIndex = (memIndex + 1) % memories.length;
  }, 300);
}, 4000);

/* ================= WISH ================= */

let candleBlown = false;
let wishStartTime = null;
const HOLD_DURATION = 2000;

function startWish() {
  if (candleBlown) return;
  wishStartTime = Date.now();
  document.getElementById("wish-instruction").textContent =
    "Keep holding… your wish is safe here.";
  document.getElementById("candle-wrapper").classList.add("holding");
  fadeMusic(0.2, 1200);
}

function endWish() {
  if (candleBlown || !wishStartTime) return;
  const heldTime = Date.now() - wishStartTime;
  wishStartTime = null;
  document.getElementById("candle-wrapper").classList.remove("holding");

  if (heldTime >= HOLD_DURATION) {
    blowCandleSoft();
  } else {
    document.getElementById("wish-instruction").textContent =
      "Hold a little longer… take your time.";
  }
}

function blowCandleSoft() {
  if (candleBlown) return;
  candleBlown = true;

  const flame = document.querySelector(".flame");
  flame.style.opacity = "0";
  flame.style.transform = "translateX(-50%) scale(0.6)";

  document.getElementById("wish-instruction").textContent =
    "I hope your wish finds its way to you.";

  document.getElementById("wish-after").classList.remove("hidden");
  document.getElementById("wish-btn").disabled = false;
}

function makeWish() {
  fadeMusic(0.6, 1200);
  go("wish", "final");
}

/* ================= MUSIC ================= */

function fadeMusic(targetVolume, duration) {
  const startVolume = bgMusic.volume;
  const steps = 30;
  let currentStep = 0;
  const stepTime = duration / steps;

  const fade = setInterval(() => {
    currentStep++;
    bgMusic.volume =
      startVolume + (targetVolume - startVolume) * (currentStep / steps);
    if (currentStep >= steps) clearInterval(fade);
  }, stepTime);
}

function startMusic() {
  bgMusic.volume = 0.6;
  bgMusic.play().catch(() => {});
}

/* ================= NAVIGATION ================= */

function go(from, to) {
  document.getElementById(from).classList.remove("active");
  document.getElementById(to).classList.add("active");

  if (to === "collage") initCarousel();
}

/* ================= COLLAGE ================= */

const collageImages = [
  "pics/1.jpg",
  "pics/2.jpg",
  "pics/3.jpg",
  "pics/4.jpg",
  "pics/5.jpg",
  "pics/6.jpg"
];

let currentImgIndex = 0;
const carouselImg = document.getElementById("carousel-img");
const carouselBg = document.getElementById("carousel-bg");

function initCarousel() {
  currentImgIndex = 0;
  carouselImg.src = collageImages[0];
  carouselBg.style.backgroundImage = `url('${collageImages[0]}')`;

  setInterval(() => {
    currentImgIndex = (currentImgIndex + 1) % collageImages.length;
    carouselImg.style.opacity = "0";
    setTimeout(() => {
      carouselImg.src = collageImages[currentImgIndex];
      carouselBg.style.backgroundImage =
        `url('${collageImages[currentImgIndex]}')`;
      carouselImg.style.opacity = "1";
    }, 300);
  }, 2000);
}

/* ================= RESTART ================= */

function restart() {
  // Keep music playing
  fadeMusic(0.5, 500);

  setTimeout(() => {
    // Reset screens
    document.querySelectorAll(".screen").forEach(screen => {
      screen.classList.remove("active");
    });
    document.getElementById("intro").classList.add("active");

    // Reset typing
    typed.textContent = "";
    lineIndex = 0;
    charIndex = 0;
    typingActive = true;
    typeLines();

    // Reset memory rotation
    memIndex = 0;

    // Reset wish
    candleBlown = false;
    wishStartTime = null;

    const flame = document.querySelector(".flame");
    flame.style.opacity = "1";
    flame.style.transform = "translateX(-50%) scale(1)";

    document.getElementById("wish-after").classList.add("hidden");
    document.getElementById("wish-btn").disabled = true;
    document.getElementById("wish-instruction").textContent =
      "Hold the candle for a moment.\nMake your wish quietly.";

    document.getElementById("candle-wrapper").classList.remove("holding");

    // Reset carousel
    currentImgIndex = 0;
    if (carouselImg) {
      carouselImg.src = collageImages[0];
      carouselImg.style.opacity = "1";
    }

    // Bring music back gently
    fadeMusic(0.6, 800);
  }, 400);
}

