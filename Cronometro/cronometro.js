/* ==================================================
    cronometro.js

    Autores:

    NUSP 13782230 - Nome: Fernando Ramos Takara
    NUSP 10352624 - Nome: Welton Carlos Ferreira Silva
    NUSP - Nome:

    Ao preencher esse cabeçalho com os nomes e número USP dos participantes,
    declaramos que todas as partes originais desse exercício programa (EP)
    foram desenvolvidas e implementadas por nosso time e que portanto não
    constituem desonestidade acadêmica ou plágio.

    Declaramos também que somos responsáveis por todas as cópias desse
    programa e que não distribuímos ou facilitamos a sua distribuição.
    Estamos cientes que os casos de plágio e desonestidade acadêmica
    serão tratados segundo os critérios divulgados na página da
    disciplina.
    Entendemos que EPs sem assinatura devem receber nota zero e, ainda
    assim, poderão ser punidos por desonestidade acadêmica.

================================================== */

console.log("Inicializando");
const DEFAULT_REF_VALUE = "0000"
let timer = false;
let running = false;
let pausedAux = false;
let startTime = null;
let timePaused = 0;

let ref = document.querySelector('#ref')
let b0 = document.querySelector('#b0');
let b1 = document.querySelector('#b1');
let b2 = document.querySelector('#b2');
let b3 = document.querySelector('#b3');
let b4 = document.querySelector('#b4');
let b5 = document.querySelector('#b5');
let b6 = document.querySelector('#b6');
let b7 = document.querySelector('#b7');
let b8 = document.querySelector('#b8');
let b9 = document.querySelector('#b9');
let cl = document.querySelector('#cl');

let bstart = document.querySelector('#bstart');
let bpause = document.querySelector('#bpause');
let bcrono = document.querySelector('#bcrono');

let refValue = "0000";
let buttons = [b1, b2, b3, b4, b5, b6, b7, b8, b9, b0];

let currentTime = 0
let timeDisplay = document.querySelector('#timeDisplay')

function setTimeDisplayValue() {
  let elapsedTime = "Date.now() - startTime"
  if (running) {
    elapsedTime = Date.now() - startTime
    result = parseElapsedTime(elapsedTime)
    timeDisplay.innerHTML = `${result}`
  }
  else {
    if (pausedAux) {
      timePaused = Date.now()
      pausedAux = false;
    }
  }
}

function parseElapsedTime(value) {
  let seconds = Math.floor((value / 1000) % 60)
  let minutes = Math.floor((value / 1000) / 60)
  let str = `${value}`
  let ms = str.substring(str.length - 3, str.length - 1)

  if (seconds >= Number(refValue.substring(2, 4)) && minutes >= Number(refValue.substring(0, 2))) {
    handleStop()
    return refValue.substring(0, 2) + '  :  ' + refValue.substring(2, 4) + '  : 00'
  }
  else return `${minutes} :  ${seconds}  :  ${ms}`
}

function setInitialValues() {
  console.log("Setting initial values");
  setRefValue(refValue);
  setTimeDisplayValue(currentTime)
}
setInitialValues();

function setRefValue(value) {
  console.log("setting ref value", value)
  refValue = value
  ref.value = `   ${value.substring(0, 2)}:${value.substring(2, 4)}`
}

function handleClear() {
  if (!running) setRefValue(DEFAULT_REF_VALUE)
}

function handleKeyBoardClick(e) {
  console.log(e)
  // manipula refValue para visualizaçãão
  let clickedValue = e.target.value
  let prefix = refValue.substring(1, 4)
  let result = prefix + clickedValue;
  setRefValue(result)
}

function setButtonsListeners(buttons) {
  buttons.map(setButtonListener)
  cl.addEventListener('click', handleClear)
  bstart.addEventListener('click', handleStart)
  bpause.addEventListener('click', handlePause)
}

function setButtonListener(button) {
  button.addEventListener('click', handleKeyBoardClick)
}
setButtonsListeners(buttons)

// Crono -------------------------------------------------------

function handleStart() {
  if (bstart.value == "Stop") {
    console.log("Changing type");
    if (bcrono.value == "Crono") {
      bstart.value = "Timer";
    }
    else handleStop();
  }
}

// Start -------------------------------------------------------

function handleStart() {
  console.log("Starting");
  setStartTime();
  if (bstart.value == "Start") {
    bstart.value = "Stop";
    running = true
    timePaused = 0;
  }
  else handleStop();
}

function handleStop() {
  bstart.value = "Start"
  bpause.value = "Pause"
  pausedAux = false
  running = false
}

function setStartTime() {
  if (startTime) {
    startTime = null
  }
  currentTime = Date.now()
  startTime = currentTime;
}

// Pause -------------------------------------------------------

function handlePause() {
  if (bstart.value == "Stop") {
    if (bpause.value == "Pause") {
      console.log("Pausing");
      bpause.value = "Run";
      running = false
      pausedAux = true
    }
    else {
      console.log("Unpausing");
      bpause.value = "Pause"
      console.log(timePaused - Date.now())
      startTime = startTime + (Date.now() - timePaused)
      running = true
    }
  }
}

//  ------------------------------------------------------------

setInterval(setTimeDisplayValue, 1);