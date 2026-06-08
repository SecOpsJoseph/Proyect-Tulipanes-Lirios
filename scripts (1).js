/* ══════════════════════════════════════
   scripts.js — Lenguaje de las Flores
   ══════════════════════════════════════ */

const SECRET_PIN = '1505';
let currentPin = '';

function pressKey(digit) {
  if (currentPin.length >= 4) return;
  currentPin += digit;
  updateDots();
  if (currentPin.length === 4) setTimeout(checkPin, 200);
}

function clearPin() {
  currentPin = '';
  updateDots();
  hideError();
}

function updateDots() {
  for (let i = 1; i <= 4; i++) {
    document.getElementById('d' + i).classList.toggle('filled', i <= currentPin.length);
  }
}

function checkPin() {
  if (currentPin === SECRET_PIN) {
    const lock = document.getElementById('lockScreen');
    lock.classList.add('unlock-out');
    setTimeout(() => {
      lock.style.display = 'none';
      document.getElementById('app').classList.remove('hidden');
      initPetals();
    }, 700);
  } else {
    showError();
    const box = document.querySelector('.lock-box');
    box.classList.remove('shake');
    void box.offsetWidth;
    box.classList.add('shake');
    currentPin = '';
    setTimeout(() => { updateDots(); hideError(); }, 1200);
  }
}

function showError() { document.getElementById('lockError').classList.add('visible'); }
function hideError() { document.getElementById('lockError').classList.remove('visible'); }

function toggleCard(panel) {
  panel.classList.toggle('open');
}

function createPetals(containerId, color1, color2, count) {
  const container = document.getElementById(containerId);
  if (!container) return;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    const size = Math.random() * 10 + 6;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random()*100}%; top:${Math.random()*-20}%;
      background:${Math.random()>.5?color1:color2};
      animation-duration:${Math.random()*12+10}s;
      animation-delay:${Math.random()*15}s;
      transform:rotate(${Math.random()*360}deg);
      opacity:0;
    `;
    container.appendChild(p);
  }
}

function initPetals() {
  createPetals('lilyPetals',  'rgba(200,169,126,0.35)', 'rgba(245,230,208,0.45)', 18);
  createPetals('tulipPetals', 'rgba(199,92,126,0.35)',  'rgba(232,160,184,0.3)',  18);
}

document.addEventListener('keydown', (e) => {
  if (document.getElementById('lockScreen').style.display === 'none') return;
  if (e.key >= '0' && e.key <= '9') pressKey(e.key);
  if (e.key === 'Enter')     checkPin();
  if (e.key === 'Backspace') clearPin();
});
