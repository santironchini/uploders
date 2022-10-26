
var $$ = Dom7;

var app = new Framework7({
  // App root element
  root: '#app',
  // App Name
  name: 'My App',
  // App id
  id: 'com.myapp.test',
  // Enable swipe panel
  panel: {
    swipe: 'left',
  },
  // Add default routes
  routes: [
    { path: '/about/', url: 'about.html', },
    { path: '/log/', url: 'log.html', },
  ]
  // ... other parameters
});

var mainView = app.views.create('.view-main');

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function () {
  console.log("Device is ready!");
});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
  // Do something here when page loaded and initialized
  console.log(e);
})

// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="index"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized

  $$("#hrefRegistro").on("click", fnChange);

  function fnChange() {
    mainView.router.navigate('/about/')
  }

  $$("#Inicio").on("click", fnLog);

  function fnLog() {
    let email = $$('#email').val();
    let password = $$('#pass').val();

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;

        console.log("Bienvenid@!!! down " + email);
        mainView.router.navigate('/log/')
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.error(errorCode);
        console.error(errorMessage);
      });

  }
})

$$(document).on('page:init', '.page[data-name="about"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  $$('#registrar').on('click', fnCrear);




  function fnCrear() {
    let email = $$('#EMAIL').val();
    let password = $$('#PASS').val();
    let nomb = $$('#NOMBRE').val();
    let apell =$$('#APELLIDO').val();

    console.log(email);
    console.log(password);
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log("Bienvenid@!!! " + email);
        // ...

        // base de datos
        var db = firebase.firestore();
        /*
        var data = {
          nombre: "luciano",
          mail: "lucianoaronson@gmail.com",
          rol: "developer"
        };
        */
        var miId = email;
        var data = { nombre: nomb, apellido: apell};


        db.collection("personas").doc(miId).set(data)
          .then(function (docRef) {
            //console.log("ok con el ID: " + docRef.id):
            mainView.router.navigate('/log/');
          })

          .catch(function (error) {
            console.log("error: " + error);
          });





       

      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.error(errorCode);
        console.error(errorMessage);

        if (errorCode == "auth/email-already-in-use") {
          console.error("el mail ya esta usado");
        }

        // ..
      });

  }
})




/*
signInWithEmailAndPassword(auth, email, psw)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  */
// ==================REGISTRO====================================================

function fnReg() {


  let Email = document.getElementById("Email").value;


  let Psw = $$("#Pass").val(); //document.getElementById("pass");

  console.log(Email);
  console.log(Psw);




  /*
      email="men@tira.com";
      psw="12345678";
  */
  // 



}

//===================================LOGIN===========================================



// cada un@ pone su magia para recuperar el mail y la clave de un form...



//=====================Base de Datos================

