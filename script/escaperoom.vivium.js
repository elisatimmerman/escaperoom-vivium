var terug = document.querySelector('.back');

terug.setAttribute('href', document.referrer);

terug.onclick = function() {
  history.back();
  return false;
}

