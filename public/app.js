// app.js - Interface logic for Undine.03
// Handles: desktop visibility, window dragging, species selection,
// text input processing, clock, and canvas placement
// 98.css desktop pattern referenced from: https://github.com/jdan/98.css

const desktop = document.getElementById('desktop');
const bootScreen = document.getElementById('boot-screen');


//Boot sequence - fades out boot screen and reveals desktop after a few seconds
setTimeout(() => {
  bootScreen.classList.add('fade-out');
  setTimeout(() => bootScreen.classList.add('gone'), 1200);
  desktop.classList.add('visible');
}, 2200);

//Moves p5.js canvas into the shell window after it loads
window.addEventListener('load', function () {
  setTimeout(function () {
    const canvas = document.querySelector('canvas');
    document.getElementById('shell-window-canvas').appendChild(canvas);
  }, 500);
});

//98.css window dragging with cursor
let dragging = null, dragOffX = 0, dragOffY = 0;

function dragStart(e, id) {
  if (e.target.tagName === 'BUTTON') return;
  dragging = document.getElementById(id);
  dragging.style.zIndex = getTopZ();
  const r = dragging.getBoundingClientRect();
  dragOffX = e.clientX - r.left;
  dragOffY = e.clientY - r.top;
}

document.addEventListener('mousemove', e => {
  if (!dragging) return;
  dragging.style.left = (e.clientX - dragOffX) + 'px';
  dragging.style.top = (e.clientY - dragOffY) + 'px';
  dragging.style.right = 'auto';
});

document.addEventListener('mouseup', () => { dragging = null; });

//Button to read text input to reset the simulation and new species selection 
document.getElementById('add-btn').addEventListener('click', function () {
  let inputValue = document.getElementById('text20').value;
  //species selection 
  //even number of characters = Lyria planicostata taiwanica,
  //odd = Oliva porphyria
  if (inputValue.length % 2 === 0) {
    currentSpecies = 0;
  } else {
    currentSpecies = 1;
  }
  document.getElementById('shell-placeholder').style.display = 'none';
  document.getElementById('shell-window-canvas').style.display = 'block';
  patternStarted = true;
  //Fun activity: try to comment out resetGrids, and see what happens to the pattern generation
  resetGrids();
  const textarea = document.getElementById('text20');
  const text = textarea.value.trim();
  if (!text) return;
  const content = document.querySelector('#note-window .window-content');
  const newLine = document.createElement('div');
  newLine.textContent = text;
  content.insertBefore(newLine, content.querySelector('.field-row-stacked'));
  textarea.value = '';
  openWindow('book-window');
  document.getElementById('quote-display').textContent = currentQuote;
  const confirmation = document.createElement('div');
confirmation.textContent = '— transmission received —';
confirmation.style.color = '#666';
content.insertBefore(confirmation, content.querySelector('.field-row-stacked'));
});


function openWindow(id) {
  document.getElementById(id).classList.add('open');
  event.stopPropagation()
}

function closeWindow(id) {
  document.getElementById(id).classList.remove('open');
}

function getTopZ() {
  let max = 100;
  document.querySelectorAll('.win98-window.open').forEach(w => { const z = parseInt(w.style.zIndex) || 100; if (z > max) max = z; });
  return max + 1;
}

function fullScreen() {
  //Fullscreen mode display
  if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(console.warn);
  else document.exitFullscreen();
}


function updateClock() {
  //clock updates in real time
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  document.getElementById('clock').textContent = h + ':' + m;
}

setInterval(updateClock, 1000);
updateClock();
