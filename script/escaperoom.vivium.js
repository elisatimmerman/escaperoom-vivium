/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
/*eslint-env browser*/
/*eslint 'no-console':0*/

// var terug = document.querySelector('.back');

// terug.setAttribute('href', document.referrer);

// terug.onclick = function() {
//   history.back();
//   return false;
// }

// var slapendScherm1 = document.getElementById('#slapendSchermEen')
// var myWindowURL = "slapen-scherm-1";
// var myWindowProperties  = "width=100vw,height=100vh";
// var openWindow;

// setTimeout(function() {
//     openWindow = window.open(myWindowURL, myWindowName, myWindowProperties); 
// }, 5000);

// setTimeout(function() { 
//     openWindow.close() 
// }, 10000);

// slapendScherm1.addEventListener("click", setTimeout);



// function countdown() {

//   var i = document.getElementById('slapendSchermEen');

//   i.innerHTML = parseInt(i.innerHTML)-1;

// if (parseInt(i.innerHTML)<=0) {

// window.close();

// }

// }

// setInterval(function(){ countdown(); },1000);





// setTimeout(
//   function ( )
//   {
//     self.close();
//   }, 5000 );





//   var openedWindow;

// function openWindow() {
//   openedWindow = window.open('slapen-scherm-1');
//   setTimeout(closeOpenedWindow, 1000);
// }

var slapendSchermEen = document.getElementById('slapendSchermEen')


setTimeout(function(){
  window.location.href = 'meneer-kok-nagedacht.html';
  console.log('test');
  // return false;
}, 2000)


slapendSchermEen.addEventListener('click', setTimeout, false);



// function leave() {
//   window.location.href = 'meneer-kok-nagedacht.html';
// }
// slapenSchermEen.setTimeout('click', "leave()", 5000);
