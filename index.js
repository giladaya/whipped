"use strict";


// States
const STATE_IDLE = 0;
const STATE_IN_FIRST = 20,
      STATE_AFTER_FIRST = 21,
      STATE_AFTER_SECOND = 23;

// Acceleration threshold
const ACC_TH = 6; 

// Time deltas
// debouncing and prunning
const MAX_TIME_DELTA_MS = 800,
      MIN_TIME_DELAY_MS = 400;

// Sample smoothing factor
const ALPHA = 0.5;

let lastStateTs = Date.now(),
    state = STATE_IDLE,
    lastAx = 0,
    direction = 1;


// Level out
resetState();

// Audio sample holders
const sound1 = new Audio('assets/whip_whoosh.mp3');
const sound2 = new Audio('assets/whip_crack.mp3');

// We need a gesture to load the audio samples
document.getElementById('cover').onclick = loadAudio;
window.addEventListener('devicemotion', onMotion);


function loadAudio() {
  sound1.play();
  sound1.pause();
  sound2.play();
  sound2.pause();

  //hide the cover - we got what we wanted (user interaction)
  const el = document.getElementById('cover');
  el.classList.add('fall');
  setTimeout(function() {
    el.style.display = 'none'; 
  }, 600);  
}

function onMotion(ev) {
  const ax = ALPHA*event.acceleration.x + (1-ALPHA)*lastAx;
  lastAx = ax;
  const now = Date.now();
  const elapsed = now - lastStateTs;

  // Generic keep fresh
  if (elapsed > MAX_TIME_DELTA_MS && state != STATE_IDLE && state != STATE_AFTER_FIRST) {
    // Deprecate whatever state we are in
    resetState();
  }
  // Too long after first motion
  if (elapsed > 2*MAX_TIME_DELTA_MS && state == STATE_AFTER_FIRST) {
    resetState();
  }

  if (state == STATE_IDLE && Math.abs(ax) > ACC_TH && elapsed > MIN_TIME_DELAY_MS) {
    console.log(ax);
    direction = Math.sign(ax);
    setState(STATE_IN_FIRST);
    playSound1();
  } else if (state == STATE_IN_FIRST && Math.abs(ax) > ACC_TH && Math.sign(ax) == -direction) {
    setState(STATE_AFTER_FIRST);
  } else if (state == STATE_AFTER_FIRST && Math.abs(ax) > ACC_TH && Math.sign(ax) == direction) {
    console.log(ax);
    setState(STATE_AFTER_SECOND);
    playSound2();

    // block for a while
    setTimeout(function() {
      resetState();
    }, MIN_TIME_DELAY_MS);
  } 
}

function resetState() {
  console.log('reset');
  setState(STATE_IDLE);
  // document.body.style.background = "blue";
}
function setState(newState) {
  state = newState;
  lastStateTs = Date.now();
  console.log('State', newState);
}

function playSound1() {
  // document.body.style.background = "red";
  sound1.play();
}

function playSound2(){
  // document.body.style.background = "green";
  sound2.play();
}