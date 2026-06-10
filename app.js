// Audio Context variables
let audioCtx = null;
let nextNoteTime = 0.0;
let timerID = null;
let incrementTimerID = null;
let countdownTimerID = null;

// Metronome state
let isPlaying = false;
let bpm = 110; // Set default starting BPM to 110
const tempoMin = 40;
const tempoMax = 250;
let secondsLeft = 5;

// Tracking the 4-beat pattern (1, 2, 3, 4)
let currentBeat = 0; 
const beatsPerMeasure = 4;

// DOM Elements
const startBtn = document.getElementById('start-btn');
const minusBtn = document.getElementById('minus-btn');
const plusBtn = document.getElementById('plus-btn');
const bpmNumber = document.getElementById('bpm-number');
const intervalSelect = document.getElementById('interval-select');
const countdownDisplay = document.getElementById('countdown');

// 1. Precise Audio Scheduler
function scheduler() {
    while (nextNoteTime < audioCtx.currentTime + 0.1) {
        scheduleNote(currentBeat, nextNoteTime);
        advanceNote();
    }
    timerID = setTimeout(scheduler, 25.0);
}

function scheduleNote(beatNumber, time) {
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    // Dynamic pitch: Beat 0 (which is the 1st beat) gets a higher click
    if (beatNumber === 0) {
        osc.frequency.value = 1200; // High accent beep for beat 1
    } else {
        osc.frequency.value = 800;  // Standard low beep for beats 2, 3, 4
    }

    gainNode.gain.setValueAtTime(1, time);
    gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.05);

    osc.start(time);
    osc.stop(time + 0.05);
}

function advanceNote() {
    const secondsPerBeat = 60.0 / bpm;
    nextNoteTime += secondsPerBeat; 
    
    // Cycle through beats: 0, 1, 2, 3, then back to 0
    currentBeat = (currentBeat + 1) % beatsPerMeasure;
}

// 2. Speed Trainer Logic
function startSpeedTrainer() {
    const intervalSeconds = parseInt(intervalSelect.value);
    secondsLeft = intervalSeconds;
    countdownDisplay.textContent = secondsLeft;

    countdownTimerID = setInterval(() => {
        secondsLeft--;
        countdownDisplay.textContent = secondsLeft;
        if (secondsLeft <= 0) {
            secondsLeft = intervalSeconds;
        }
    }, 1000);

    incrementTimerID = setInterval(() => {
        if (bpm < tempoMax) {
            bpm += 1;
            bpmNumber.textContent = bpm;
        }
    }, intervalSeconds * 1000);
}

// 3. Start/Stop Controller
function toggleMetronome() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (isPlaying) {
        // STOP
        isPlaying = false;
        startBtn.textContent = 'START';
        startBtn.classList.remove('playing');
        
        clearTimeout(timerID);
        clearInterval(incrementTimerID);
        clearInterval(countdownTimerID);
    } else {
        // START
        isPlaying = true;
        startBtn.textContent = 'STOP';
        startBtn.classList.add('playing');
        
        currentBeat = 0; // Ensure we always start on beat 1 ("TICK-tock-tock-tock")
        nextNoteTime = audioCtx.currentTime + 0.05;
        
        scheduler();
        startSpeedTrainer();
    }
}

// 4. BPM Manual Adjustment Functions
function changeBPM(amount) {
    // Only allow adjustments if the metronome isn't running
    if (isPlaying) return;

    bpm += amount;
    
    // Keep BPM within safe boundaries (40 to 250)
    if (bpm < tempoMin) bpm = tempoMin;
    if (bpm > tempoMax) bpm = tempoMax;
    
    bpmNumber.textContent = bpm;
}

// Event Listeners
startBtn.addEventListener('click', toggleMetronome);

minusBtn.addEventListener('click', () => changeBPM(-1));
plusBtn.addEventListener('click', () => changeBPM(1));