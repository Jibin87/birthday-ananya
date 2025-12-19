/* ================= INTRO TYPING ================= */

const bgMusic = document.getElementById("bg-music");

const lines = [
  "Hey Ananya ❤️",
  "I know we’re far apart today…",
  "but I wanted you to feel me close.",
  "This is your birthday.",
  "And this is my heart for you."
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

/* ================= POPUP SYSTEM ================= */

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

/* ================= QUESTION HANDLERS ================= */

function wrongMsg() {
const funnyReplies = [
  "Not quite 😄 but that made me smile.",
  "Cute guess, but you know better 💗",
  "I like how your brain works… just not this answer 😉",
  "Okay that was funny, try again 😌",
  "Nice try 😄 but my heart says otherwise.",
  "That one made me laugh, but nope 💕",
  "Almost, but I have something sweeter in mind 🫶",
  "Not the one, but I love how you think 💖",
  "Close…emotionally 😌 try once more.",
  "That answer is adorable, but not quite 🥰",
  "I see what you did there 😄 but keep going.",
  "Wrong answer, right energy 💗",
  "That was cute, my heart wants something else 💞",
  "Okay, that one gets points for effort 😄",
];
  const msg = funnyReplies[Math.floor(Math.random() * funnyReplies.length)];
  showPopup(msg);
}

function answer(from, to, message) {
  showPopup(
    message + "\n\nI want you to always feel sure about this.",
    from,
    to
  );
}

function rightMsg(from, to, message) {
  showPopup(message, from, to);
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

}, 2000);



/* ================= WISH (FIXED & STABLE) ================= */

let candleBlown = false;
let wishStartTime = null;
const HOLD_DURATION = 2000; // 2 seconds

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
    // Released too early — reset gently
    document.getElementById("wish-instruction").textContent =
      "Hold a little longer… take your time.";
  }
}

function blowCandleSoft() {
  if (candleBlown) return;
  candleBlown = true;

  const flame = document.querySelector(".flame");
  flame.style.transition = "opacity 1.6s ease, transform 1.6s ease";
  flame.style.opacity = "0";
  flame.style.transform = "translateX(-50%) scale(0.6)";

  document.getElementById("wish-instruction").textContent =
    "I hope your wish finds its way to you.";

  document.getElementById("wish-after").classList.remove("hidden");

  document.getElementById("wish-btn").disabled = false;

  document.getElementById("candle-wrapper").classList.remove("holding");
}

/* ================= CONTINUE (FIXED) ================= */

function makeWish() {
  // Restore music gently
  fadeMusic(0.6, 1200);

  // Clean transition
  document.getElementById("wish").classList.remove("active");
  document.getElementById("final").classList.add("active");
}

/* MUSIC FADE */
function fadeMusic(targetVolume, duration) {
  if (!bgMusic) return;

  const startVolume = bgMusic.volume;
  const steps = 30;
  const stepTime = duration / steps;
  let currentStep = 0;

  const fade = setInterval(() => {
    currentStep++;
    bgMusic.volume =
      startVolume + (targetVolume - startVolume) * (currentStep / steps);

    if (currentStep >= steps) {
      clearInterval(fade);
      bgMusic.volume = targetVolume;
    }
  }, stepTime);
}


function startMusic() {
  bgMusic.volume = 0.6;

  const playPromise = bgMusic.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      console.log("Autoplay blocked — waiting for interaction");
    });
  }
}

function go(from, to) {
  document.getElementById(from).classList.remove("active");
  document.getElementById(to).classList.add("active");

  if (to === "collage") {
    fadeMusic(0.7, 2000);
    initCarousel();
  }
}


/* ================= COLLAGE CAROUSEL (ENHANCED) ================= */

const collageImages = [
  "pics/1.jpg",
  "pics/2.jpg",
  "pics/3.jpg",
  "pics/4.jpg",
  "pics/5.jpg",
  "pics/6.jpg"
];

let currentImgIndex = 0;
let autoSlideInterval = null;
let autoPaused = false;

const carouselImg = document.getElementById("carousel-img");
const carouselBg = document.getElementById("carousel-bg");
const carousel = document.querySelector(".carousel");

/* Show image */
function showImage(index) {
  carouselImg.style.opacity = "0";

  setTimeout(() => {
    carouselImg.src = collageImages[index];
    carouselBg.style.backgroundImage =
      `url('${collageImages[index]}')`;
    carouselImg.style.opacity = "1";
  }, 250);
}

/* Navigation */
function nextImage() {
  pauseAutoSlide();
  currentImgIndex = (currentImgIndex + 1) % collageImages.length;
  showImage(currentImgIndex);
}

function prevImage() {
  pauseAutoSlide();
  currentImgIndex =
    (currentImgIndex - 1 + collageImages.length) % collageImages.length;
  showImage(currentImgIndex);
}

/* Auto-advance */
function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    if (!autoPaused) {
      currentImgIndex =
        (currentImgIndex + 1) % collageImages.length;
      showImage(currentImgIndex);
    }
  }, 4000); // every 4 seconds
}

function pauseAutoSlide() {
  autoPaused = true;
  clearTimeout(autoResumeTimeout);

  autoResumeTimeout = setTimeout(() => {
    autoPaused = false;
  }, 5000); // resume after 5s of no interaction
}

let autoResumeTimeout = null;

/* Swipe gestures (mobile) */
let touchStartX = 0;

carousel.addEventListener("touchstart", e => {
  touchStartX = e.touches[0].clientX;
});

carousel.addEventListener("touchend", e => {
  const touchEndX = e.changedTouches[0].clientX;
  const diff = touchEndX - touchStartX;

  if (Math.abs(diff) > 50) {
    pauseAutoSlide();
    if (diff < 0) {
      nextImage();
    } else {
      prevImage();
    }
  }
});

/* Initialize when collage opens */
function initCarousel() {
  currentImgIndex = 0;
  carouselImg.src = collageImages[0];
  carouselBg.style.backgroundImage =
    `url('${collageImages[0]}')`;
  carouselImg.style.opacity = "1";

  if (autoSlideInterval) clearInterval(autoSlideInterval);
  startAutoSlide();
}


/* ================= RESTART ================= */

function restart() {
  typingActive = false; // stop any ongoing typing

  // Soften music first
  fadeMusic(0.4, 500);

  setTimeout(() => {
    /* ---------- Reset screens ---------- */
    document.querySelectorAll(".screen").forEach(screen => {
      screen.classList.remove("active");
    });
    document.getElementById("intro").classList.add("active");

    /* ---------- Reset typing ---------- */
    typed.textContent = "";
    lineIndex = 0;
    charIndex = 0;
    typingActive = true;
    typeLines();

    /* ---------- Reset memories ---------- */
    memIndex = 0;

    /* ---------- Reset wish state ---------- */
    candleBlown = false;
    wishStartTime = null;
  
    currentImgIndex = 0;
if (carouselImg) {
  carouselImg.src = collageImages[0];
  carouselImg.style.opacity = "1";
}


    const flame = document.querySelector(".flame");
    flame.style.opacity = "1";
    flame.style.transform = "translateX(-50%) scale(1)";

    document.getElementById("wish-after").classList.add("hidden");
    document.getElementById("wish-btn").disabled = true;
    document.getElementById("wish-instruction").textContent =
      "Hold the candle for a moment.\nMake your wish quietly.";

    document.getElementById("candle-wrapper").classList.remove("holding");

    /* ---------- Reset popup ---------- */
    document.getElementById("popup").classList.add("hidden");
    nextFrom = null;
    nextTo = null;

    /* ---------- Bring music back ---------- */
    fadeMusic(0.6, 1000);

  }, 500);
}
