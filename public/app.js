const desktop = document.getElementById('desktop');
desktop.classList.add('visible');
document.getElementById('add-btn').addEventListener('click', function() {
    let inputValue = document.getElementById('text20').value;
    console.log(inputValue);
    console.log(currentSpecies);
});

  setTimeout(() => {
    bootScreen.classList.add('fade-out');
    desktop.classList.add('visible');
    setTimeout(() => bootScreen.classList.add('gone'), 1200);
  }, 4200);

window.addEventListener('load', function() {
    setTimeout(function() {
        const canvas = document.querySelector('canvas');
        document.getElementById('shell-window-canvas').appendChild(canvas);
    }, 500);
});

setTimeout(function() {
    const canvas = document.querySelector('canvas');
    const target = document.getElementById('shell-window-canvas');
    if (canvas && target) target.appendChild(canvas);
}, 1000);

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

document.getElementById('add-btn').addEventListener('click', function() {
    let inputValue = document.getElementById('text20').value;
    if (inputValue.length % 2 === 0) {
        currentSpecies = 0;
    } else {
        currentSpecies = 1;
    }
    resetGrids();
});

document.querySelector('#add-btn').onclick = function() {
  const textarea = document.getElementById('text20');
  const text = textarea.value.trim();
  if (!text) return;
  const content = document.querySelector('#facts-window .window-content');
  const newLine = document.createElement('div');
  newLine.textContent = text;
  content.insertBefore(newLine, content.querySelector('.field-row-stacked'));
  textarea.value = '';
};

function openWindow(id) {
    document.getElementById(id).classList.add('open');
    event.stopPropagation()
}

function closeWindow(id) {
    document.getElementById(id).classList.remove('open');
}

function getTopZ() {
    let max = 100;
    document.querySelectorAll('.win98-window.open').forEach(w => { const z = parseInt(w.style.zIndex)||100; if(z>max) max=z; });
    return max + 1;
  }

  function updateTaskbar() {
    const c = document.getElementById('taskbar-buttons');
    c.innerHTML = '';
    openWindows.forEach(id => {
      const win = document.getElementById(id);
      if (!win) return;
      const label = win.querySelector('.title-bar-text').textContent.substring(0,18);
      const btn = document.createElement('button');
      btn.className = 'button taskbar-btn';
      btn.textContent = label;
      btn.onclick = () => { win.style.zIndex = getTopZ(); };
      c.appendChild(btn);
    });
  }

function updateClock() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('clock').textContent = h + ':' + m;
}
setInterval(updateClock, 1000);
updateClock();

document.querySelector('#add-btn').onclick = function() {
  const textarea = document.getElementById('text20');
  const text = textarea.value.trim();
  if (!text) return;
  const content = document.querySelector('#facts-window .window-content');
  const newLine = document.createElement('div');
  newLine.textContent = text;
  content.insertBefore(newLine, content.querySelector('.field-row-stacked'));
  textarea.value = '';
};