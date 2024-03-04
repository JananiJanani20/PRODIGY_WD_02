let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let laps = [];

function startStop() {
  if (isRunning) {
    clearInterval(timer);
    document.getElementById('startStop').textContent = 'Start';
    isRunning = false;
  } else {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(updateDisplay, 10);
    document.getElementById('startStop').textContent = 'Stop';
    isRunning = true;
  }
}

function reset() {
  clearInterval(timer);
  document.getElementById('display').textContent = '00:00:00';
  document.getElementById('startStop').textContent = 'Start';
  isRunning = false;
  elapsedTime = 0;
  laps = [];
  updateLaps();
}

function updateDisplay() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;
  const formattedTime = formatTime(elapsedTime);
  document.getElementById('display').textContent = formattedTime;
}

function formatTime(time) {
  let milliseconds = time % 1000;
  time = (time - milliseconds) / 1000;
  let seconds = time % 60;
  time = (time - seconds) / 60;
  let minutes = time % 60;
  let hours = (time - minutes) / 60;

  return (
    pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
  );
}

function pad(num) {
  return ('0' + num).slice(-2);
}

function lap() {
  laps.unshift(formatTime(elapsedTime));
  updateLaps();
}

function updateLaps() {
  const lapsList = document.getElementById('laps');
  lapsList.innerHTML = '';
  laps.forEach((lap, index) => {
    const li = document.createElement('li');
    li.textContent = `Lap ${index + 1}: ${lap}`;
    lapsList.appendChild(li);
  });
}
function changeTheme() {
    const theme = document.querySelector('input[name="theme"]:checked').value;
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
  }
  
