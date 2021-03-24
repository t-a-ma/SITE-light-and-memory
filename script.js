//Global Constants
const startClueHoldTime = 1000;
const minClueHoldTime = 100;
const startCluePauseTime = 500;
const minCluePauseTime = 100;
const nextClueWaitTime = 1500; //time to wait before starting playback


var patterns = [
  [1,2,4,2,6,6,5],
  [1,1,2,1,4,3,1,1,2,1,5,4], /*happy birthday*/
  [1,1,1,2,3,3,2,3,4,5], /*row your boat*/
  [3,2,1,2,3,3,3,2,2,2,3,5,5], /*mary had a little lamb*/
  [8,7,8,5,4,8,7,8,5,5,1,6], /*jurassic park*/
  [3,2,1,3,2,1,1,1,1,1,2,2,2,2,3,2,1] /*Hot cross buns*/
];
var pattern = new Array();
var progress = 0; 
var gamePlaying = false;
var tonePlaying = false;
var volume = 0.75;  /*must be between 0.0 and 1.0*/
var guessCounter = 0;
var mistakes = 0;
var mode = 0; /* 0 = easy, hard = 1; defaults to easy mode */
var clueHoldTime = 1000;
var cluePauseTime = 500; //pause between clue


/* help with indeterminism */
function getRandInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

/*****************Functions that handle mode setting*******************/
function setEasyMode(btn) {
  mode = 0;
  btn.style.backgroundColor = "#fc6c85";
}

function setHardMode(btn) {
  mode = 1;
  btn.style.backgroundColor = "#00ffef";
}

function resetModeButtons() {
  mode = 0;
  document.getElementById("easyMode").style.backgroundColor = "#ffe4e1";
  document.getElementById("hardMode").style.backgroundColor = "#b9f2ff";
}

/************************************************************************/


/********************Functions related to game control flow *************/
function startGame(){
    //initialize game variables
    clueHoldTime = startClueHoldTime;
    cluePauseTime = startCluePauseTime;
    progress = 0;
    mistakes = 0;
    gamePlaying = true;
    if (mode == 0) {
        let randIndex = getRandInt(patterns.length);
        pattern = patterns[randIndex].slice(0);  
        /*get a predetermined melody*/
    } else if (mode == 1) {
        pattern = genRandMelody();
        /*Creates a random melody and set it to be played*/
    }
    document.getElementById("startBtn").classList.add("hidden");
    document.getElementById("stopBtn").classList.remove("hidden");
    playClueSequence();
}

function stopGame(){
    gamePlaying = false;
    document.getElementById("numMistakes").classList.add("hidden"); 
    document.getElementById("startBtn").classList.remove("hidden");
    document.getElementById("stopBtn").classList.add("hidden");
    resetModeButtons();
}

function guess(btn) {
  if(!gamePlaying) {
    return;
  }
  
  if (btn == pattern[guessCounter]) {
    if (progress == guessCounter) { /*is turn over?*/
      if(progress == pattern.length - 1) {
        winGame();  
      } else {
        progress++;
        playClueSequence();
      }
    } else { /*not at end of turn*/
      guessCounter++;
    } 
  } else { /*Count how many mistakes have been made before*/
    document.getElementById("numMistakes").classList.remove("hidden");
    mistakes++;
    document.getElementById("numMistakes").innerHTML =
            "Oops! You've made " + mistakes + " mistakes!";
    if (mistakes == 3) {
      loseGame();  
    } else {
      /* play time does not speed up if mistake is made*/
      if (mode == 1) {
        clueHoldTime += 100;
        cluePauseTime += 100;       
      } else {
        clueHoldTime += 50;
        cluePauseTime += 50;  
      }
      playClueSequence();
    }
  }
}

function loseGame() {
    stopGame();
    alert("You made 3 mistakes! Game Over. :( )");
}

function winGame() {
    stopGame();
    alert("Wahoo!! You just won the game! :D )");
}
/************************************************************************************/


/*******************Lighting and activation of buttons and changing the colors ******/

function lightButton(btn) {
    document.getElementById("button"+btn).classList.add("lit")
}

function clearButton(btn) {
    document.getElementById("button"+btn).classList.remove("lit")
}

/*************************************************************************************/


/*******************Functions related to creating the melody and playing the audio****/
function genRandMelody(){
    let num_notes = getRandInt(12) + 1; 
    /*arbitrary length! mixing it up; avoid length of 0*/
  
    let melody = new Array();
    for( let i = 0; i <=num_notes; i++ ) {
        /*Get a random note and add it to the pattern*/
        melody.push(getRandInt(8) + 1);
    }
    return melody;
}

function playClueSequence(){
    guessCounter = 0;
    let delay = 500; //set delay to initial wait time
    for(let i=0; i<= progress; i++){
        setTimeout(playSingleClue, delay, pattern[i]); // set a timeout to play that clue
        /*Made play time shorter*/
        delay += clueHoldTime
        delay += cluePauseTime;
        
    }
    /*Decrease time with every turn down to a certain threshold*/
    if (clueHoldTime > minClueHoldTime) {
      if (mode == 1){
        clueHoldTime -= 100;
      } else {
        /*Decrease less time in easy mode*/
        clueHoldTime -= 50;
      }   
    }
  
    if (cluePauseTime > minCluePauseTime ) {
      if (mode == 1){
        cluePauseTime -= 100;
      } else {
        /*Decrease less time in easy mode*/
        cluePauseTime -= 50;
      }  
    }
}

function playSingleClue(btn){
    if(gamePlaying){
        lightButton(btn);
        playTone(btn, clueHoldTime);
        setTimeout(clearButton, clueHoldTime,btn);
    }
}

// Sound Synthesis Functions
const freqMap = {
    1: 220.0, //A3
    2: 246.942, // B3
    3: 277.183, //C#4
    4: 293.665, //D4
    5: 329.628,  //E4
    6: 369.994,  //F#4
    7: 415.305,//G#4 
    8: 440 //A4
}

function playTone(btn,len){ 
  o.frequency.value = freqMap[btn]
  g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
  tonePlaying = true
  setTimeout(function(){
    stopTone()
  },len)
}

function startTone(btn){
  if(!tonePlaying){
   //g.resume();
    o.frequency.value = freqMap[btn]
    g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
    tonePlaying = true
  }
}

function stopTone(){
    g.gain.setTargetAtTime(0,context.currentTime + 0.05,0.025)
    tonePlaying = false
}

//Page Initialization
// Init Sound Synthesizer
var context = new AudioContext()
var o = context.createOscillator()
var g = context.createGain()
g.connect(context.destination)
g.gain.setValueAtTime(0,context.currentTime)
o.connect(g)
o.start(0)
/*************************************************************************/