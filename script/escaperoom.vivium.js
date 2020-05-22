//Bloeddruk


function bloeddrukSymtomsClicked(btnId) {
  /* Deze functie wordt aangeroepen wanneer er een symptoom van een bloeddruk wordt aangeklikt. 
  * Wanneer dit gebeurd, wordt de value van de knop gerotate. Ook wordt de kleur van de achtergrond aangepast om dit te laten zien.
  */

  var btn = document.getElementById(btnId);
  btn.value++
  setSymptoom(btn, btn.value)
}

function setSymptoom(btn, value)
{
    // Achtergrondkleuren van bloeddruksymptomen opdracht
    const achtergronden = [
      '#00257A',
      '#009B74'
    ]
  
  var btnConfirm = document.getElementById('btnConfirm');
  btn.value = value < achtergronden.length ? value : 0
  btn.style.backgroundColor = achtergronden[btn.value]
  btn.style.color = '#ffffff'

  //Wanneer er 9 verschillende knoppen zijn ingedrukt, wordt de confirmknop geënabled
  if (btn.getAttribute('clicked') == null) {
    btnConfirm.value++
    if (btnConfirm.value >= 9) btnConfirm.disabled = false;
    btn.setAttribute('clicked', true)
  }
}

function confirmationButtonClicked() {
  const HOOG = 0
  const LAAG = 1
  const correctAwnsers = {
    "btnLichtInHetHoofd":LAAG,
    "btnDuizeligheid":LAAG,
    "btnKortademigheid":HOOG,
    "btnFlauwvallen":LAAG,
    "btnWazigZien":HOOG,
    "btnMisselijkheidEnBraken":HOOG,
    "btnHoofdpijn":HOOG,
    "btnRusteloosheid":HOOG,
    "btnVermoeidheid":HOOG
  }
  
  var awnsers = document.getElementById('symptomen').children
  awnsers = [].slice.call(awnsers)
  var success = true
 
  for(i in awnsers)
  {
    /*Controleer of het gegeven antwoord overeenkomt met het correcte antwoord*/
    awnser = awnsers[i]
    if(correctAwnsers[awnser.id] != awnser.value)
    {
      awnser.style.backgroundColor = 'red'
      success = false
    }
  }
  /*De confirmatieknop leidt naar het volgende scherm*/
  if(success) window.location.href = './10-meneer-dijkstra-irrelevant.html'
}

function setBloeddruk(Onderdruk, Bovendruk, Soort)
{
  /* Deze functie slaat de bloeddruk op in de sessionstorage
   * De bloeddruk bestaat uit 3 waardes: onderdruk, bovendruk, soort
   */
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
  /* Deze functie haalt de bloeddruk op uit de sessionstorage
  */
  var Bloeddruk = sessionStorage.getItem('Bloeddruk');
  Bloeddruk = Bloeddruk ? JSON.parse(Bloeddruk) : {}
  
  return Bloeddruk
}

function confirmBloeddruk()
{
  /* Deze functie wordt gebruikt om de bloeddrukwaarden op te halen van de pagina, deze worden vervolgens opgeslagen. 
  */
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
  /**Deze functie wordt gebruikt om de textvakken en knoppen goed te zetten. Dit wordt gedaan met de waarden die zijn opgeslagen.
   */
  var Bloeddruk = getBloeddruk()

  var Onderdruk = document.getElementById('txtOnderdruk')
  var Bovendruk = document.getElementById('txtBovendruk')
  var Soort = document.getElementsByName('bloeddrukSoort')
  Soort = Array.from(Soort)
  Soort = Soort.filter(function(rbtn){ return rbtn.value == Bloeddruk['Soort']});

  if(Soort[0]) Soort[0].checked = true
  if(Onderdruk && Bloeddruk['Onderdruk']) Onderdruk.value = Bloeddruk['Onderdruk']
  if(Bovendruk && Bloeddruk['Bovendruk']) Bovendruk.value = Bloeddruk['Bovendruk']

  var success
  switch( Bloeddruk['Soort']) {
    case 'hoog':
      if(Bloeddruk['Onderdruk'] > 90 && Bloeddruk['Bovendruk'] > 140) success = true
      else success = false
      break;
    case 'laag':
      if(Bloeddruk['Onderdruk'] < 70 && Bloeddruk['Bovendruk'] < 110) success = true
      else success = false
        break;
    case 'normaal':
      if(Bloeddruk['Onderdruk'] > 70 && Bloeddruk['Bovendruk'] > 110 && Bloeddruk['Onderdruk'] < 90 && Bloeddruk['Bovendruk'] < 140) success = true
      else success = false
      break;
    default:
      // code block
  } 

  var toelichting = document.getElementById('toelichting')
  if(toelichting)
  {
    if(!success)
    {
      toelichting.innerHTML = 'Helaas, het gekozen antwoord is niet goed. Zie hiernaast de toelichting voor meer informatie.'
    }
  }

}

function initBloeddruksoort(){
  var bloeddrukSoorten = document.getElementById('bloeddruk-soorten')
  let lastMove = null
  
  if(bloeddrukSoorten == null) return
  bloeddrukSoorten = bloeddrukSoorten.children

  var eventListener =  function(){dragBloeddruk(this.bloeddrukSoort, lastMove);}

  for(i  in bloeddrukSoorten)
  {
    try {
      bloeddrukSoorten[i].addEventListener("touchend",eventListener.bind({'bloeddrukSoort': bloeddrukSoorten[i].value, 'lastMove': lastMove}), false);
      bloeddrukSoorten[i].addEventListener('touchmove', function(event) {
        lastMove = event.touches[0];
      });
    } catch (error) {

    }
  }
}

function dragBloeddruk(bloeddrukSoort, lastMove){
  var symptoom = getElementByMouse(lastMove)
  if(symptoom.className == 'bloeddruk-antwoord') setSymptoom(symptoom, bloeddrukSoort)
}

function getElementByMouse(coords){
  var x = coords.clientX;     // Get the horizontal coordinate
  var y = coords.clientY;     // Get the vertical coordinate

  return document.elementFromPoint(x, y);
}

/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
/*eslint-env browser*/
/*eslint 'no-console':0*/

var TIMEOUT_DATE_NAME = "timeoutDate";
var TIMEOUT_TARGET_PATH_NAME = "timeoutTargetPath";


//Code voor 'slapend scherm'. De tijd moet bij de pagina voor het 'slapend scherm' aangegeven worden. Zie pagina 'meneer-kok-geruststellen'.
//Evenals de pagina waarnaar het 'slapend scherm' gelinkt moet worden.
window.onload = _ => {
  // Roep alle functies aan die bij het laden van de pagina benodigd zijn
  initTxtZondeVoeding();
  initResponseBubbles();
  initConversation();
  initBloeddruk();
  initBloeddruksoort()
  initTimer();
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



function startTimer(duration, display) {
  //Hiermee wordt de timer gestart waardoor de gebruiker weet wanneer er wordt doorverwezen naar de volgende pagina
  var timer = duration, minutes, seconds;
  setInterval(function () {
      minutes = parseInt(timer / 60, 10)
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      if (--timer < 0) timer = duration;
  }, 1000);
}

function initTimer() {
  /* In deze functie wordt het tijdstip opgehaald voor wanneer er wordt doorverwezen naar een andere pagina. 
  Vervolgens wordt het aantal seconden en minuten berekend tot er verder kan worden gegaan. Hierop wordt de timer ingesteld.
  */
  var now = Date.now()
  var timeOut = new Date(sessionStorage.getItem(TIMEOUT_DATE_NAME));
  timeOut = (timeOut - now) / 1000 //Get seconds till timeout
  display = document.querySelector('#time');
  if(display) startTimer(timeOut, display);
};

//zonde lengte
function setZondeLengte(lengte) {
  sessionStorage.setItem('zondeLengte', lengte);
}


function getZondeLengte() {
  return sessionStorage.getItem('zondeLengte');
}


function checkZondeLengte() {
  /**
   * Hier wordt de lengte van de zonde gecontroleerd.
   * Eerst wordt de ingevoerde waarde van de zonde berekend. Daarna wordt er gegeken of deze ligt tussen bepaalde waarden.
   * Wanneer dit het geval is, wordt er doorverwezen naar de goede pagina. 
   * Anders wordt er doorverwezen naar de pagina waar de gebruiker het nog een keer kan proberen.
   */
  const ZONDELENGTEMIN = 50
  const ZONDELENGTEMAX = 100

  var zondeLengte = getZondeLengte()

  if (zondeLengte >= ZONDELENGTEMIN && zondeLengte <= ZONDELENGTEMAX) var path = './13-lengte-sonde-toelichting-goed.html'
  else var path = './14-lengte-sonde-toelichting-verkeerd.html'

  window.location.href = path
}

function initTxtZondeVoeding() {
  /**
   * Haal de waarde op van de zondevoeding. Vul deze in in het textvak 'invoering-sonde-draad'
   */
  var zondeVoedingLengte = getZondeLengte()
  var invoerZonde = document.getElementById('invoering-sondedraad')
  if (invoerZonde) invoerZonde.value = zondeVoedingLengte
};


//Voice messages
function startvoiceMessage() {
  /* Wanneer er een voice bericht aanwezig is, wordt deze automatisch gestart bij het aanroepen van deze functie*/
  var btnStartMessage = document.getElementById('geluidsfragment-knop')
  if (btnStartMessage) btnStartMessage.onclick()
}

//conversatie
function quote(str) {
  /* Zet een string tussen aanhalingstekens */
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
  /* Deze functie wordt gebruikt om het feedback id op te slaan */
  setFeedback(feedbackId)
}

function retrieveFeedbackText(feedbackId) {
  /* deze functie wordt gebruikt om het feedback bericht op te halen. */
  var message = responses[feedbackId]['message']
  var btn = document.getElementById(feedbackId)
  if (btn) btn.appendChild(document.createTextNode(quote(message)));
}

function initResponseBubbles() {
  /* Deze functie wordt gebruikt om text te zetten in de responsebubles. Hierbij wordt het id van de bubble gebruikt om de feedbacktext op te halen*/
  var responseBubbles = document.getElementById('responseBubbles')
  if (responseBubbles) responseBubbles = responseBubbles.children
  else return
  for (let btn of responseBubbles) {
    retrieveFeedbackText(btn.id)
  }
}

function initConversation() {
  /* Deze functie wordt gebruikt om de feedback en het ingevulde antwoordt te laten zien bij de conversatietraining. */
  var feedback = getFeedback()
  if (feedback) {
    setConversationMessage(feedback.message)
    setConversationFeedback(feedback.feedback)
  }
}

function setConversationMessage(message) {
  /* Deze functie wordt gebruikt om het ingevulde antwoord te laten zien bij de conversatietraining. */
  try {
    var conversationMessage = document.getElementById('conversationMessage')
    conversationMessage.innerHTML = quote(message);
  }
  catch (e) { }
}

function setConversationFeedback(feedback) {
  /* Deze functie wordt gebruikt om de feedback te laden. De feedback heeft betrekking op het ingevoerde antwoord bij de conversatietraining. */
  try {
    var conversationFeedback = document.getElementById('conversationFeedback')
    conversationFeedback.innerHTML = feedback;
  }
  catch (e) { }
}

responses = {
  'meneer-dijkstra-antwoord1': {
    'success': false,
    'message': 'Wij moeten jou in de gaten houden, maar als je dat niet wilt dan gaan we wel weer weg. Weet wel dat we morgen pas weer tijd hebben voor u.',
    'feedback': 'Dit is niet het juiste antwoord. Het is belangrijk voor het monitoren van de toestand van meneer Dijkstra dat je zijn bloeddruk dagelijks meet.',
  },
  'meneer-dijkstra-antwoord2': {
    'success': false,
    'message': 'U bent hier ook niet voor uw rust. Kom hier met uw arm, we moeten uw bloeddruk meten.',
    'feedback': 'Dit is niet het juiste antwoord. Door meneer Dijkstra op een onbeleefde manier te beantwoorden, is de kans groot dat meneer Dijkstra je geen toestemming geeft om zijn bloeddruk te meten.',
  },
  'meneer-dijkstra-antwoord3': {
    'success': false,
    'message': 'We hebben niet veel tijd en zin dus we zijn toch zo weer weg.',
    'feedback': 'Dit is niet het juiste antwoord. Het is niet beleefd om tegen patiënten te zeggen dat je niet veel tijd hebt, voor patiënten maak je tijd.',
  },
  'meneer-dijkstra-antwoord4': {
    'success': true,
    'message': 'Het is belangrijk dat we heel even uw bloeddruk opmeten meneer, zodat we in de gaten kunnen houden hoe het met u gaat. Het zal niet lang duren, dan kunt u daarna weer verder met uitrusten.',
    'feedback': 'Dit is inderdaad het juiste antwoord. Op deze manier leg je meneer Dijkstra uit dat het meten van zijn bloeddruk belangrijk is voor het monitoren van zijn dagelijkse toestand, maar geef je ook aan dat je maar een paar minuten van zijn tijd nodig heeft, zodat hij daarna weer kan rusten.',
  },

  'meneer-dijkstra-antwoord5': {
    'success': true,
    'message': 'Wat goed van uw kleindochter! Ik moet nu verder, maar ik kom vanmiddag wel even kijken naar uw filmpje oké? Is na mijn lunch goed?',
    'feedback': 'Dit is inderdaad het juiste antwoord. Je toont interesse in iets wat betekenisvol is voor meneer Dijkstra en spreekt gelijk een tijd met hem af. Op deze manier weet meneer Dijkstra dat je langskomt, ondanks dat je nu geen tijd meer hebt.',
  },
  'meneer-dijkstra-antwoord6': {
    'success': false,
    'message': 'Nee hoor, daar heb ik echt geen interesse in.',
    'feedback': 'Dit is niet het juiste antwoord. Probeer beleefder te antwoorden en interesse te tonen in een betekenisvol onderdeel van het leven van meneer.',
  },
  'meneer-dijkstra-antwoord7': {
    'success': false,
    'message': 'Sorry, maar dat komt nu even niet gelegen. Misschien een andere keer.',
    'feedback': 'Dit is niet het juiste antwoord. Door te antwoorden dat je geen tijd hebt, gaat meneer Dijkstra denken dat je waarschijnlijk niet meer terug komt en geen interesse hebt, omdat je altijd druk bent.',
  },
  'meneer-dijkstra-antwoord8': {
    'success': false,
    'message': 'Ik heb al vaker filmpjes van uw kleindochter gezien, dus deze hoeft voor mij niet. Ik heb er al genoeg gezien.',
    'feedback': 'Dit is niet het juiste antwoord. Toon interesse in iets wat betekenisvol is voor meneer.',
  },
  'meneer-dijkstra-antwoord9': {
    'success': true,
    'message': 'Ik weet dat het vervelend is, maar dit moet toch even gebeuren. Het is voor u vervelender als we de katheter niet vervangen en hij verstopt zou raken.',
    'feedback': 'Dit is inderdaad het juiste antwoord. Op deze manier beaam je dat het vervelend is, maar leg je meneer Dijkstra ook de noodzaak van de handeling uit. Hij begrijpt hierdoor beter waarom je de katheter wilt verwisselen.',
  },
  'meneer-dijkstra-antwoord10': {
    'success': false,
    'message': 'Niet zeuren, we gaan gewoon door. Des te eerder bent u er weer van af.',
    'feedback': 'Dit is niet het juiste antwoord. Je kan meneer Dijkstra beter beleefd uit te leggen waarom je de katheter wilt verwisselen en stel hem gerust.',
  },
  'meneer-dijkstra-antwoord11': {
    'success': false,
    'message': 'Niks. Je begint gewoon met het verwisselen van de katheter. Het zal toch moeten gebeuren, dat is het protocol.',
    'feedback': 'Dit is niet het juiste antwoord. Door meneer Dijkstra geen uitleg te geven en tegen zijn zin een handeling te starten, zal hij je geen toestemming geven en kan je de katheter niet gaan verwisselen.',
  },
  'meneer-dijkstra-antwoord12': {
    'success': false,
    'message': 'Dan doet mijn collega het morgen.',
    'feedback': 'Dit is niet het juiste antwoord. De katheter moet vervangen worden, om te voorkomen dat hij verstopt raakt. Als je hier een dag mee wacht, kan dit problemen veroorzaken voor meneer. ',
  },

  'mevrouw-kok-antwoord1': {
    'success': false,
    'message': 'Ach meneer, ik merk dat het veel met u doet. Kun je mij uitleggen waarom u het zo vervelend vindt? Waarom doet het advies om mevrouw een sonde te geven zoveel met u? Denkt u niet ook dat het eigenlijk beter is?',
    'feedback': 'Dit is niet het juiste antwoord. Door veel vragen te gaan stellen geef je meneer Kok niet de ruimte om zijn emoties te laten zien, maar gaat hij naar jou luisteren. Als je de emoties bij meneer Kok eerst even laat zakken, door hem bijvoorbeeld een glaasje water aan te bieden, gaat hij waarschijnlijk vanzelf vertellen wat er aan de hand is. Als dit niet het geval is kan je altijd nog vragen wat hem zo verdrietig maakt.',
  },
  'mevrouw-kok-antwoord2': {
    'success': true,
    'message': 'Wat raakt u het meest?',
    'feedback': 'Dit is inderdaad het juiste antwoord. Door de emoties eerst wat te laten zakken en daarna meneer Kok zelf te laten vertellen wat er aan de hand is, kan hij de situatie zelf ook weer wat verwerken en/of dingen meer op een rijtje zetten.',
  },  
  'mevrouw-kok-antwoord3': {
    'success': false,
    'message': 'Oh sorry, dat was niet mijn bedoeling! Komen uw kinderen vanavond nog?',
    'feedback': 'Dit is niet helemaal het juiste antwoord. Vanuit ongemak kan het zijn dat je het gesprek graag op een ander onderwerp wilt krijgen, maar door dit ongemak ga je eigenlijk alleen de huilende Gerard en/of zijn verhaal vermijden, terwijl de Gerard je juist nodig heeft om zijn emoties en achterliggende verhaal met je te delen.',
  },  
  'mevrouw-kok-antwoord4': {
    'success': false,
    'message': 'Je schuift meneer Kok een doos tissues en een glas water toe, waarna je weg loopt en hem alleen laat.',
    'feedback': 'Dit is niet het juiste antwoord. Je laat meneer Kok nu alleen in zijn verdriet, waardoor je zijn verhaal vermijdt. Hij heeft je juist nodig om zijn emoties en achterliggende verhaal te delen.',
  },
  'mevrouw-kok-antwoord5': {
    'success': false,
    'message': 'Ik denk ook echt dat mevrouw sondevoeding moet krijgen. Ik vind het zo echt niet veilig meer voor haar. Er is vast een ander moment waarop u bij mevrouw Kok kan zijn. Daar verzint u wel weer wat anders voor. Maakt u zich daar maar geen zorgen over.',
    'feedback': 'Dit is niet het juiste antwoord. Meneer Kok moet nu zelf een moment creëren waarop hij bij zijn echtgenote kan zijn. Meneer weet waarschijnlijk niet dat het voor hem ook mogelijk is om te ondersteunen bij het geven van de sondevoeding. Dit kan je hem aanbieden.',
  },
  'mevrouw-kok-antwoord6': {
    'success': false,
    'message': '“Ik snap het helemaal meneer Kok. Het is ook een belangrijk moment van jullie samen en dat willen we jullie absoluut niet afnemen. Zullen we samen kijken hoe u uw echtgenote toch kan blijven ondersteunen bij de maaltijden? U zou bijvoorbeeld kunnen ondersteunen bij het geven van de sondevoeding. Dit kunnen wij u leren. Denk er maar even over na, dan kom ik na mijn lunch wel weer even langs, oké?',
    'feedback': 'Dit is niet helemaal het juiste antwoord. Probeer niet gelijk te verwijzen naar een diëtist of logopedist. Wat kan je zelf eerst doen om het verdriet van meneer Kok te ondervangen?',
  },  
  'mevrouw-kok-antwoord7': {
    'success': false,
    'message': 'Meneer Kok, ze geven dit advies niet voor niks. Als ik u was zou ik toch kiezen voor sondevoeding voor uw echtgenote. Ze zijn echt bang dat het de volgende keer helemaal fout gaat met het eten.',
    'feedback': 'Dit is niet het juiste antwoord. Probeer beter naar meneer Kok te luisteren en zijn verdriet te ondervangen en samen met hem een oplossing te verzinnen voor het moment samen.',
  },  
  'mevrouw-kok-antwoord8': {
    'success': true,
    'message': 'Ik snap het helemaal meneer Kok. Het is ook een belangrijk moment van jullie samen en dat willen we jullie absoluut niet afnemen. Zullen we samen kijken hoe u uw echtgenote toch kan blijven ondersteunen bij de maaltijden? U zou bijvoorbeeld kunnen ondersteunen bij het geven van de sondevoeding. Dit kunnen wij u leren. Denk er maar even over na, dan kom ik na mijn lunch wel weer even langs, oké?',
    'feedback': 'Dit is inderdaad het juiste antwoord. Met dit antwoord ondersteun je meneer Kok en verzin je samen met hem een alternatief voor het moment samen. Door hem aan te bieden dat hij ondersteuning kan bieden bij het geven van de sondevoeding, behoudt hij het moment samen en verlicht je zijn verdriet in het kiezen voor een sonde voor zijn echtgenote.',
  },
  'mevrouw-kok-antwoord9': {
    'success': false,
    'message': 'Rustig maar mevrouw Kok, we zijn bijna klaar. Even doorbijten.',
    'feedback': 'Dit is niet het juiste antwoord. Probeer meer beleefd te zijn in het geruststellen van mevrouw Kok.',
  },
  'mevrouw-kok-antwoord10': {
    'success': false,
    'message': 'Je negeert het en gaat door met het inbrengen van de sonde. Het moet tenslotte toch gewoon gebeuren.',
    'feedback': 'Dit is niet het juiste antwoord. Het inbrengen van een sonde is een erg nare ervaring en op deze manier maak je het voor mevrouw Kok niet prettiger. ',
  },
  'mevrouw-kok-antwoord11': {
    'success': true,
    'message': 'U doet het super goed. Probeer nog een keer mee te slikken, we zijn er bijna. Knijp maar in de hand van mijn collega.',
    'feedback': 'Dit is inderdaad het juiste antwoord. Je stelt op deze manier mevrouw Kok goed gerust.',
  },
  'mevrouw-kok-antwoord12': {
    'success': false,
    'message': 'Je vraagt of je collega die erbij is wat dichterbij komt staan om mevrouw Kok vast te houden en rustig toe te spreken.',
    'feedback': 'Dit is niet helemaal het juiste antwoord. Jij bent bezig met het inbrengen van de sonde, dus ook jij kan mevrouw geruststellen tijdens het inbrengen van de sonde.',
  },
}