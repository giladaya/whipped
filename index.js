const STATE_BETWEEN = 10
const ACC_TH = 6;

const STATE_IDLE = 0,
      STATE_BK_PT1 = 1,
      STATE_BK_PT2 = 2,
      STATE_FW_PT1 = 3,
      STATE_FW_PT2 = 4;

const PT1_ACC_TH = 4,
      PT2_ACC_TH = 7;

const MAX_TIME_DELTA_MS = 800,
      MIN_TIME_DELAY_MS = 150;

const ALPHA = 0.5;

let lastStateTs = Date.now(),
    state = STATE_IDLE,
    lastAx = 0,
    direction = 1;


resetState();

const sound1 = document.createElement("audio");
sound1.preload = 'auto';
sound1.src = 'assets/whip_whoosh.mp3';

const sound2 = document.createElement("audio");
sound2.preload = 'auto';
sound2.src = 'assets/whip_crack.mp3';

document.getElementById('cover').onclick = loadAudio;
window.addEventListener('devicemotion', onMotion);


function loadAudio() {
  sound1.play();
  sound1.pause();
  sound2.play();
  sound2.pause();
  document.getElementById('cover').style.display = 'none';
}

function onMotion(ev) {
  const ax = ALPHA*event.acceleration.x + (1-ALPHA)*lastAx;
  lastAx = ax;
  const now = Date.now();
  const elapsed = now - lastStateTs;
  // if (elapsed > MAX_TIME_DELTA_MS && state != STATE_IDLE && state != STATE_BK_PT2) {
  //   resetState();
  // }
  // if (elapsed > 3*MAX_TIME_DELTA_MS && state == STATE_BK_PT1) {
  //   resetState();
  // }

  if (elapsed > MAX_TIME_DELTA_MS && state != STATE_IDLE && state != STATE_BETWEEN) {
    resetState();
  }
  if (elapsed > 2*MAX_TIME_DELTA_MS && state == STATE_BETWEEN) {
    resetState();
  }

  if (state == STATE_IDLE && Math.abs(ax) > ACC_TH && elapsed > MIN_TIME_DELAY_MS) {
    console.log(ax);
    direction = Math.sign(ax);
    setState(STATE_BETWEEN);
    playSound1();
  } else if (state == STATE_BETWEEN && Math.abs(ax) > ACC_TH && Math.sign(ax) == direction && elapsed > MIN_TIME_DELAY_MS) {
    console.log(ax);
    setState(STATE_IDLE);
    playSound2();
  } 

  // if (state == STATE_IDLE && Math.abs(ax) > PT1_ACC_TH && elapsed > MIN_TIME_DELAY_MS) {
  //   direction = Math.sign(ax);
  //   setState(STATE_BK_PT1);
  // } else if (state == STATE_BK_PT1 && ax < -direction*PT2_ACC_TH ) {
  //   setState(STATE_BK_PT2);
  //   playSound1();
  // } else if (state == STATE_BK_PT2 && ax < -direction*PT1_ACC_TH && elapsed > MIN_TIME_DELAY_MS) {
  //   setState(STATE_FW_PT1);
  // } else if (state == STATE_FW_PT1 && ax > direction*PT2_ACC_TH) {
  //   setState(STATE_FW_PT2);
  //   playSound2();
  //   setState(STATE_IDLE);
  // }
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