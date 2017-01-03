 var config = {
     apiKey: "AIzaSyCER5b8cOQOu5MKqIAhuxCJwSsZuSBztpg",
     authDomain: "ensayo-9123f.firebaseapp.com",
     databaseURL: "https://ensayo-9123f.firebaseio.com",
     storageBucket: "ensayo-9123f.appspot.com",
     messagingSenderId: "387866099851"
 };

 firebase.initializeApp(config);

 // Database
 var myRates = firebase.database().ref().child('rates'); // 

 /*myRates.on("value", function (snap) {
   console.log(snap.val());*/

 // Update manual
 /*firebase.database().ref('rates/' + 1).set({
    nombre: 'carlos',
    rate: 14    
 });*/

 //Variables
 var quien = document.getElementById('quien');
 var cuanto = document.getElementById('cuanto');
 var enviar = document.getElementById('enviar');
 var alerta = document.getElementById('alert');

 //Save
 enviar.addEventListener('click', function() {
     var newRate = firebase.database().ref().child('posts').push().key;
     var obj = {
         "nombre": quien.value,
         "rate": cuanto.value
     };
     firebase.database().ref('rates/' + newRate).set(obj);
 });

 //Escucha acciones sobre la base de datos on
 myRates.on("child_added", function(snap) {
     var rate = snap.val();
     alerta.innerHTML = '<br><strong>' + rate.nombre + '</strong> ha calificado este meetup con: <strong>' + rate.rate + '</strong> puntos' + alerta.innerHTML;
     if (rate.rate <= 5) {
         alerta.setAttribute('class', 'alert alert-danger');
     } else if (rate.rate > 5 && rate.rate <= 7) {
         alerta.setAttribute('class', 'alert alert-warning');
     } else if (rate.rate > 7) {
         alerta.setAttribute('class', 'alert alert-success');
     }
     alerta.hidden = false;
 });