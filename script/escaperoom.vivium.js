//Bloeddruk


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
  window.location.href = './10-meneer-dijkstra-irrelevant.html'
}

function setBloeddruk(Onderdruk, Bovendruk, Soort)
{
  var Bloeddruk = {
  'Onderdruk': Onderdruk,
  'Bovendruk': Bovendruk,
  'Soort': Soort
  }
  Bloeddruk = JSON.stringify(Bloeddruk)
  sessionStorage.setItem('Bloeddruk', Bloeddruk);
}

function getBloeddruk()
{
  var Bloeddruk = sessionStorage.getItem('Bloeddruk');
  Bloeddruk = Bloeddruk ? JSON.parse(Bloeddruk) : {}
  
  return Bloeddruk
}

function confirmBloeddruk()
{
  var Onderdruk = document.getElementById('txtOnderdruk').value
  var Bovendruk = document.getElementById('txtBovendruk').value

  var Soort = document.getElementsByName('bloeddrukSoort')
  Soort = Array.from(Soort)
  Soort = Soort.filter(function(rbtn){ return rbtn.checked});
  var Soort = Soort[0] ? Soort[0].value : undefined
  
  setBloeddruk(Onderdruk, Bovendruk, Soort)
}

function initBloeddruk()
{
  var Bloeddruk = getBloeddruk()

  var Onderdruk = document.getElementById('txtOnderdruk')
  var Bovendruk = document.getElementById('txtBovendruk')
  var Soort = document.getElementsByName('bloeddrukSoort')
  Soort = Array.from(Soort)
  Soort = Soort.filter(function(rbtn){ return rbtn.value == Bloeddruk['Soort']});

  if(Soort[0]) Soort[0].checked = true
  if(Onderdruk && Bloeddruk['Onderdruk']) Onderdruk.value = Bloeddruk['Onderdruk']
  if(Bovendruk && Bloeddruk['Bovendruk']) Bovendruk.value = Bloeddruk['Bovendruk']
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
  initBloeddruk()
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
  'meneer-dijkstra-antwoord1': {
    'success': false,
    'message': 'Wij moeten jou in de gaten houden, maar als je dat niet wilt dan gaan we wel weer weg. Weet wel dat we morgen pas weer tijd hebben voor u en dat we ook echt niet van plan zijn eerder te komen.',
    'feedback': 'lekker bezig',
  },
  'meneer-dijkstra-antwoord2': {
    'success': false,
    'message': 'U bent hier ook niet voor uw rust. Kom hier met uw arm, we moeten uw bloeddruk meten.',
    'feedback': 'lekker bezig',
  },
  'meneer-dijkstra-antwoord3': {
    'success': false,
    'message': 'We hebben niet veel tijd en zin dus we zijn toch zo weer weg.',
    'feedback': 'lekker bezig',
  },
  'meneer-dijkstra-antwoord4': {
    'success': true,
    'message': 'Nee meneer, we moeten heel even uw bloeddruk opmeten, zodat we in de gaten kunnen houden hoe het met u gaat. Het zal niet lang duren, dan kunt u daarna weer verder met uitrusten.',
    'feedback': 'lekker bezig',
  },

  'meneer-dijkstra-antwoord5': {
    'success': true,
    'message': 'Wat goed van uw kleindochter! Ik moet nu verder, maar ik kom vanmiddag als ik tijd heb wel even kijken naar uw filmpje oké?',
    'feedback': 'lekker bezig',
  },
  'meneer-dijkstra-antwoord6': {
    'success': false,
    'message': 'Nee hoor, daar heb ik echt geen interesse in.',
    'feedback': 'lekker bezig',
  },
  'meneer-dijkstra-antwoord7': {
    'success': true,
    'message': 'Sorry, maar dat komt nu even niet gelegen. Misschien een andere keer.',
    'feedback': 'lekker bezig',
  },
  'meneer-dijkstra-antwoord8': {
    'success': false,
    'message': 'Ik heb al vaker filmpjes van uw kleindochter gezien, dus deze hoeft voor mij niet. Ik heb er al genoeg gezien.',
    'feedback': 'lekker bezig',
  },
}