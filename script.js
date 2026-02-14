const secret = document.getElementById("secret");
const loading = document.getElementById("loading");
const question = document.getElementById("question");
const celebration = document.getElementById("celebration");
const surprise1 = document.getElementById("surprise1");

const unlockBtn = document.getElementById("unlock");
const codeInput = document.getElementById("codeInput");
const error = document.getElementById("error");

const yesBtn = document.getElementById("yes");
const noBtn = document.getElementById("no");
const questionText = document.getElementById("questionText");
const surpriseBtn = document.getElementById("surpriseBtn");
const surprise1Btn = document.getElementById("surprise1Btn");
const surprise2Btn = document.getElementById("surprise2Btn");
const surprise2Message = document.getElementById("surprise2Message");
const surprise2 = document.getElementById("surprise2");

const SECRET_CODE = "0521";

function show(screen) {
  [secret, loading, question, celebration, surprise1].forEach(s => s.classList.remove("active"));
  screen.classList.add("active");
}

// Unlock
unlockBtn.addEventListener("click", () => {
  if (codeInput.value === SECRET_CODE) {
    show(loading);
    setTimeout(() => show(question), 2000);
  } else {
    error.innerText = "Wrong code 😜 Try again";
  }
});

// NO logic
let noCount = 0;
const maxYesScale = 2.2;
const minNoScale = 0.4;

const messages = [
  "Are you sure? 🥺", "Think again 😢", "Pleaseeee 💔", "That hurts 😭",
  "You don’t mean that 😞", "Still thinking? 😌", "Last chance 😳",
  "Smash the yes button My Pretty Girly😭"
];

noBtn.addEventListener("click", () => {
  if (noCount < messages.length) {
    questionText.innerText = messages[noCount];
    noCount++;
    updateNoEffects();
  }
});

function updateNoEffects() {
  if (noCount >= messages.length) {
    noBtn.style.display = "none";
    return;
  }
  questionText.innerText = messages[Math.floor(noCount - 1)];
  const yesScale = Math.min(1 + noCount * 0.2, maxYesScale);
  yesBtn.style.transition = 'transform 0.4s ease';
  yesBtn.style.transform = `scale(${yesScale})`;

  const noScale = Math.max(1 - noCount * 0.1, minNoScale);
  noBtn.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
  noBtn.style.transform = `scale(${noScale})`;
  noBtn.style.opacity = `${1 - noCount * 0.12}`;
}

// YES
yesBtn.addEventListener("click", () => {
  show(celebration);
  startHearts();
});

// Surprise buttons
surpriseBtn.addEventListener("click", () => {
  surpriseBtn.style.display = "none";
  surprise1Btn.style.display = "block";
  surprise2Btn.style.display = "block";
});

surprise1Btn.addEventListener("click", () => {
  show(surprise1);
  surprise1Btn.style.display = "none";
  surprise2Btn.style.display = "none";
});

// Surprise 2 - Envelope Animation
// Surprise 2 - Envelope + Auto Scrolling Note
surprise2Btn.addEventListener("click", () => {
  show(surprise2);
  surprise1Btn.style.display = "none";
  surprise2Btn.style.display = "none";
  
  // Open envelope after screen loads
  setTimeout(() => {
    document.getElementById("envelope").classList.add("open");
  }, 700);
});
  // Open envelope after screen appears
  setTimeout(() => {
    document.getElementById("envelope").classList.add("open");
  }, 800);

// Falling hearts
function startHearts() {
  const heartsContainer = document.getElementById("heartsContainer");
  setInterval(() => {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerText = "❤️";
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.animationDuration = `${Math.random() * 2 + 3}s`;
    heartsContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
  }, 300);
}

// ==================== AUTO GALLERY (ALL 26 PHOTOS) ====================
function buildGallery() {
  const track = document.getElementById("galleryTrack");
  if (!track) return;
  track.innerHTML = "";

  // All 26 photos from the assets/photos folder
  for (let i = 1; i <= 26; i++) {
    const img = document.createElement("img");
    img.src = `assets/photos/photo${i}.jpg`;
    // NO alt text anymore (removed as requested)
    img.loading = "lazy";
    track.appendChild(img);
  }

  // Duplicate the entire set for seamless infinite scroll
  for (let i = 1; i <= 26; i++) {
    const img = document.createElement("img");
    img.src = `assets/photos/photo${i}.jpg`;
    img.loading = "lazy";
    track.appendChild(img);
  }
}

window.addEventListener("load", buildGallery);