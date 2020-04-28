function bloeddrukSymtomsClicked(btnId) {
  const achtergronden = [
    '#00257A',
    '#009B74'
  ]

  var btn = document.getElementById(btnId);
  var btnConfirm = document.getElementById('btnConfirm');

  btn.value++
  btn.value = btn.value < achtergronden.length ? btn.value : 0;
  btn.style.backgroundColor = achtergronden[btn.value]
  btn.style.color = '#ffffff'

  if (btn.getAttribute('clicked') == null) {
    btnConfirm.value++
    if (btnConfirm.value >= 9) btnConfirm.disabled = false;
    btn.setAttribute('clicked', true)
  }
}

function confirmationButtonClicked() {
  window.location.href = './bloeddrukToelichting.html'
}
/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
/*eslint-env browser*/
/*eslint 'no-console':0*/

var TIMEOUT_DATE_NAME = "timeoutDate";
var TIMEOUT_TARGET_PATH_NAME = "timeoutTargetPath";


//Code voor 'slapend scherm'. De tijd moet bij de pagina voor het 'slapend scherm' aangegeven worden. Zie pagina 'meneer-kok-geruststellen'.
//Evenals de pagina waarnaar het 'slapend scherm' gelinkt moet worden.
window.onload = _ => {
  initTxtZondeVoeding();
  initResponseBubbles();
  initConversation();
  startvoiceMessage();

  let timeoutStorageItem = sessionStorage.getItem(TIMEOUT_DATE_NAME);
  let targetPath = sessionStorage.getItem(TIMEOUT_TARGET_PATH_NAME);
  if (!timeoutStorageItem || !targetPath) return;

  let timeoutDate = new Date(timeoutStorageItem);
  let timeout = timeoutDate.getTime() - new Date().getTime();
  if (timeout < 0) return;
  openWithTimeout(targetPath, timeout);

};

function openWithTimeout(path, timeout) {
  setTimeout(_ => {
    sessionStorage.removeItem(TIMEOUT_DATE_NAME);
    sessionStorage.removeItem(TIMEOUT_TARGET_PATH_NAME);
    window.location.href = path;
  }, timeout)
}

function SetTimeoutToDisableScreen(targetPath, timeoutMs) {
  let timeoutDate = new Date(new Date().getTime() + timeoutMs);
  sessionStorage.setItem(TIMEOUT_DATE_NAME, timeoutDate);
  sessionStorage.setItem(TIMEOUT_TARGET_PATH_NAME, targetPath);
}

try {
  document.getElementById("geluidsfragment-knop")
    .addEventListener("click", function () {
      document.getElementById("geluidsfragment").style.visibility = 'hidden';
      document.getElementById("geluidsfragment-pauze").style.visibility = 'visible';
    }, false);
}
catch (e) { }

try {
  document.getElementById("geluidsfragment-knop-pauze")
    .addEventListener("click", function () {
      document.getElementById("geluidsfragment").style.visibility = 'visible';
      document.getElementById("geluidsfragment-pauze").style.visibility = 'hidden';
    }, false);
}
catch (e) { }

//zonde lengte
function setZondeLengte(lengte) {
  sessionStorage.setItem('zondeLengte', lengte);
}


function getZondeLengte() {
  return sessionStorage.getItem('zondeLengte');
}


function checkZondeLengte() {
  const ZONDELENGTEMIN = 50
  const ZONDELENGTEMAX = 100

  var zondeLengte = getZondeLengte()

  if (zondeLengte >= ZONDELENGTEMIN && zondeLengte <= ZONDELENGTEMAX) var path = './lengte-sonde-toelichting-goed.html'
  else var path = './lengte-sonde-toelichting-verkeerd.html'

  window.location.href = path
}

function initTxtZondeVoeding() {
  var zondeVoedingLengte = getZondeLengte()
  var invoerZonde = document.getElementById('invoering-sondedraad')
  if (invoerZonde) invoerZonde.value = zondeVoedingLengte
};


//Voice messages
function startvoiceMessage() {
  var btnStartMessage = document.getElementById('geluidsfragment-knop')
  if (btnStartMessage) btnStartMessage.onclick()
}

//conversatie
function quote(str) {
  return `“${str}”`
}

function setFeedback(feedbackId) {
  sessionStorage.setItem('feedback', feedbackId);
}

function getFeedback() {
  var feedbackId = sessionStorage.getItem('feedback');
  return responses[feedbackId]
}

function enterFeedback(feedbackId) {
  setFeedback(feedbackId)
  window.location.href = './conversatie-reactie.html'
}

function retrieveFeedbackText(feedbackId) {
  var message = responses[feedbackId]['message']
  var btn = document.getElementById(feedbackId)
  if (btn) btn.appendChild(document.createTextNode(quote(message)));
}

function initResponseBubbles() {
  var responseBubbles = document.getElementById('responseBubbles')
  if (responseBubbles) responseBubbles = responseBubbles.children
  else return
  for (let btn of responseBubbles) {
    retrieveFeedbackText(btn.id)
  }
}

function initConversation() {

  var feedback = getFeedback()
  if (feedback) {
    setConversationMessage(feedback.message)
    setConversationFeedback(feedback.feedback)
  }
}

function setConversationMessage(message) {
  try {
    var conversationMessage = document.getElementById('conversationMessage')
    conversationMessage.innerHTML = quote(message);
  }
  catch (e) { }
}

function setConversationFeedback(feedback) {
  try {
    var conversationFeedback = document.getElementById('conversationFeedback')
    conversationFeedback.innerHTML = feedback;
  }
  catch (e) { }
}

responses = {
  'antwoord1': {
    'success': true,
    'message': 'Wat goed van uw kleindochter! Ik moet nu verder, maar ik kom vanmiddag als ik tijd heb wel even kijken naar uw filmpje oké?',
    'feedback': 'lekker bezig'
  },
  'antwoord2': {
    'success': false,
    'message': 'Nee hoor, daar heb ik echt geen interesse in.',
    'feedback': 'lekker bezig'
  },
  'antwoord3': {
    'success': true,
    'message': 'Sorry, maar dat komt nu even niet gelegen. Misschien een andere keer.',
    'feedback': 'lekker bezig'
  },
  'antwoord4': {
    'success': false,
    'message': 'Ik heb al vaker filmpjes van uw kleindochter gezien, dus deze hoeft voor mij niet. Ik heb er al genoeg gezien.',
    'feedback': 'lekker bezig'
  }
}