const achtergronden = [
    '#00257A',
    '#009B74'
]

function bloeddrukSymtomsClicked(btnId){
    var btn = document.getElementById(btnId);
    var btnConfirm = document.getElementById('btnConfirm');

    btn.value++
    btn.value = btn.value  < achtergronden.length ? btn.value : 0;
    btn.style.backgroundColor = achtergronden[btn.value]
    btn.style.color = '#ffffff'

    if(btn.getAttribute('clicked') == null)
    {
        btnConfirm.value++
        if(btnConfirm.value >= 9) btnConfirm.disabled = false;
        btn.setAttribute('clicked', true)
    }
}

function confirmationButtonClicked() 
{
    window.location.href='./bloeddrukToelichting.html'
}
/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
/*eslint-env browser*/
/*eslint 'no-console':0*/

const TIMEOUT_DATE_NAME = "timeoutDate";
const TIMEOUT_TARGET_PATH_NAME = "timeoutTargetPath";


//Code voor 'slapend scherm'. De tijd moet bij de pagina voor het 'slapend scherm' aangegeven worden. Zie pagina 'meneer-kok-geruststellen'.
//Evenals de pagina waarnaar het 'slapend scherm' gelinkt moet worden.
window.onload = _ => {
  initTxtZondeVoeding()
    
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

document.getElementById("geluidsfragment-knop")
        .addEventListener("click", function() {
  document.getElementById("geluidsfragment").style.visibility = 'hidden';
  document.getElementById("geluidsfragment-pauze").style.visibility = 'visible';
}, false);

document.getElementById("geluidsfragment-knop-pauze")
        .addEventListener("click", function() {
  document.getElementById("geluidsfragment").style.visibility = 'visible';
  document.getElementById("geluidsfragment-pauze").style.visibility = 'hidden';
}, false);


//zonde lengte
function setZondeLengte(lengte)
{
  sessionStorage.setItem('zondeLengte', lengte);
}


function getZondeLengte()
{
  return sessionStorage.getItem('zondeLengte');
}


function checkZondeLengte()
{
  const ZONDELENGTEMIN = 50
  const ZONDELENGTEMAX = 100

  var zondeLengte = getZondeLengte()

  if(zondeLengte >= ZONDELENGTEMIN && zondeLengte <= ZONDELENGTEMAX) var path='./lengte-sonde-toelichting-goed.html'
  else var path='./lengte-sonde-toelichting-verkeerd.html'

  window.location.href = path
}

function initTxtZondeVoeding() {
  var zondeVoedingLengte = getZondeLengte()
  document.getElementById('invoering-sondedraad').value = zondeVoedingLengte
};
