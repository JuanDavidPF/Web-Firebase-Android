var firebaseConfig = {
    apiKey: "AIzaSyCAys0rCDyg_H8VBVNWq3ZUqn8jL9qWhj4",
    authDomain: "parcial2-eco.firebaseapp.com",
    databaseURL: "https://parcial2-eco.firebaseio.com",
    projectId: "parcial2-eco",
    storageBucket: "parcial2-eco.appspot.com",
    messagingSenderId: "756695498014",
    appId: "1:756695498014:web:acbb78f048a399ab549d0f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
//PROGRAMAR DE AQUI PARA ABAJO, NO TOCAR LO DE ARRIBA




//llamar elementos del html por el nombre de su class o id establecido en el html
//si es un id "#nombreId" si es un class ".nombreClass"

let btnTestFija = document.querySelector(".fija")
let btnTestNueva = document.querySelector(".nueva")
let btnCraer = document.querySelector(".crear")
let btnRemover = document.querySelector(".remover")
let btnBorrar = document.querySelector(".borrarTodo")

//llamar los campos de texto para sacarles su texto
let nombreTexto = document.querySelector(".nombreUsuario")
let claveTexto = document.querySelector(".claveUsuario")

let ramaTexto = document.querySelector(".rama")
let subRamaTexto = document.querySelector(".subRama")

//lista
let lista = document.querySelector(".listaNombres")




//ESCRITURA

//EventListener = funcion que se ejecuta al dar click en algun elemento html que 
//previamente haya sido llamado con query selector



//boton que sobrescribe/actualiza

btnTestFija.addEventListener("click", function (event) {


    //ecribir en la base de datos con una ruta fija, osea, se VA a sobrescribir o 
    //actualizar, a no ser que se cambie la ruta dentro del .ref(" ")

    firebase.database().ref('rutaFija/').set({
        hola: "mundo, soy el mismo elemento",

    });

}) //cierra el event listener del boton fijo




//boton que agrega nuevo contenido
btnTestNueva.addEventListener("click", function (event) {

    // escribe en la ruta dada en .ref, un elemento nuevo random que no se 
    //sobrescriben pues son un nuevo elemento

    firebase.database().ref('rutaNueva/').push({
        hola: "mundo, soy un elemento nuevo",

    });

}) ////cierra el event listener del boton nueva



//boton que crea un elemento dependiendo de los inputs del usuario
btnCraer.addEventListener("click", function (event) {

    //refresca todo el contenido de la lista para que no se acumulen
    while (lista.firstChild) lista.removeChild(lista.firstChild);

    //saca el texto que haya ingresado el usuario en los campos
    nombre = nombreTexto.value;
    clave = claveTexto.value;



    //Se crea un elemento nuevo con el texto que el usuario ingresó
    //y en una ruta que escribio el usuario
    firebase.database().ref('parametros/').push({
        nombre: nombre,
        clave: clave

    });
})


//boton que borra un elemento con base a unos parametros
btnRemover.addEventListener("click", function (event) {
    rama = ramaTexto.value;
    subRama = subRamaTexto.value;

    firebase.database().ref(rama).child(subRama).remove();

})

//boton que borra todo los elementos de firebase
btnBorrar.addEventListener("click", function (event) {

    firebase.database().ref().remove();

    //refresca todo el contenido de la lista para que no se acumulen
    while (lista.firstChild) lista.removeChild(lista.firstChild);

})


//LECTURA
//metodo que recupera TODA los datos del firebase si .ref() está vacio o de la ruta 
//que se especifique dentro del .ref(), en este caso los que esten dentro de rutaNueva


let ref = firebase.database().ref("/parametros");
ref.on('value', function (snapshot) {

    //snapshotVal() recoge todos los elementos del firebase
    let completeData = snapshot.val();

    //Object.Keys() transforma todos los elemntos en un arreglo
    let arregloDeDatos = Object.keys(completeData)

    for (let i = 0; i < arregloDeDatos.length; i++) {

        let id = arregloDeDatos[i]
        let nombre = completeData[id].nombre;
        let pass = completeData[id].clave;


        //crea un elemento html <li> con los datos de firabase y los pone en la lista
        let user = document.createElement("li")
        user.innerText = "nombre: " + nombre + ", contraseña: " + pass;
        lista.appendChild(user);
    }


}, function (err) {
    console.log(err)
});