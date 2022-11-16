
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
    { path: '/Pedidofinal/', url: 'Pedidofinal.html', },
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

  traerDatos();
  creaProductos();

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

$$(document).on('page:init', '.page[data-name="log"]', function (e) { 

  $$("#btnNuevoPedido").on("click", fnp);

});


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





var fnpnom,fnpedido,fnpnum;


function fnp() {

  fnpnom = $$('#pdfnombre').val();
  fnpedido = $$('#pdf').val();
  fnpnum = $$('#pdfnum').val();

console.log("Datos FNP: " + fnpnum + fnpedido + fnpnom)


  mainView.router.navigate('/Pedidofinal/');

}

//===================================LOGIN===========================================



// cada un@ pone su magia para recuperar el mail y la clave de un form...



//=====================Base de Datos================
function traerDatos() {



  var db = firebase.firestore();
  var perRef = db.collection("productos");
  perRef.get()
  .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc){
      console.log("data:" + doc.data().nombre)
      console.log("data:" + doc.data().id)
      console.log("data:" + doc.data().descripcion)
      console.log("data:" + doc.data().precio)
    })
  }
  
  
  )
  
  


}




function creaProductos() {

console.log("crearproductos")
 var db = firebase.firestore();

/*
var data1 = {  nombre: "Hamb1",   precio: 900,
  descripcion: "1 medallon, cebolla, queso, tomate, lechuga ",
  img: "img/hamb1.jpg"
};
var miId1 = "1";

db.collection("productos").doc(miId1).set(data1);


var data2 = {  nombre: "Hamb2",   precio: 1200,
  descripcion: "2 medallones, huevo, cebolla, queso, tomate, lechuga, jamon, panceta ",
  img: "img/.jpg"
};
var miId2 = "2";

db.collection("productos").doc(miId2).set(data2);



var data3 = {  nombre: "Fideos",   precio: 800,
  descripcion: "fideos con salsa casera",
  img: "img/fideos.jpg"
};
var miId3 = "3";

db.collection("productos").doc(miId3).set(data3);


var data4 = {  nombre: "tortilla",   precio: 600,
  descripcion: "tortilla con JyQ y cebolla",
  img: "img/tortilla.jpg"
};
var miId4 = "4";
db.collection("productos").doc(miId4).set(data4);


var data5 = {  nombre: "milanesa",   precio: 800,
  descripcion: "Milanesa con papas fritas",
  img: "img/milanesa.jpg"
};
var miId5 = "5";

db.collection("productos").doc(miId5).set(data5);


var data6 = {  nombre: "milanesa2",   precio: 800,
  descripcion: "Milanesa con pure",
  img: "img/milanesa2.jpg"
};
var miId6 = "6";

db.collection("productos").doc(miId6).set(data6);

var data7 = {  nombre: "ñoquis",   precio: 800,
  descripcion: "ñoqui con salsa mixta",
  img: "img/ñoquis.jpg"
};
var miId7 = "7";

db.collection("productos").doc(miId7).set(data7);


var data8 = {  nombre: "guiso",   precio: 800,
  descripcion: "quiso de lentejas",
  img: "img/guiso.jpg"
};
var miId8 = "8";

db.collection("productos").doc(miId8).set(data8);



var data9 = {  nombre: "pollo",   precio: 800,
  descripcion: "pollo con papas a la portuguesa",
  img: "img/pollo.jpg"
};
var miId9 = "9";

db.collection("productos").doc(miId9).set(data9);



var data10 = {nombre:"ensalada", precio:500, 
tipo:"vegano",
descripcion:"ensalada de tomate, lechuga, choclo, arroz y queso",
img:"img/ensalada.jpg"
};
 
var miId10 = "10";

db.collection("productosVeganos").doc(miId10).set(data10);



var data11 = {nombre:"lasaña", precio:500, 
tipo:"vegano",
descripcion:"lasaña de espinaca con queso y jugo de tomate",
img:"img/lasaña.jpg",
};
 
var miId11 = "11";

db.collection("productosVeganos").doc(miId11).set(data11);



var data12 = {nombre:"wook", precio:500, 
tipo:"vegano",
descripcion:"wook de verduras salteadas, cebolla, morron, zanahoria, berenjenas, brocoli",
img:"img/wook.jpg",
};
 
var miId12 = "12";

db.collection("productosVeganos").doc(miId12).set(data12);

*/

}




