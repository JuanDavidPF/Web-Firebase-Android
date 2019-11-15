package com.example.parcial2_android;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.EditText;

import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

import java.util.HashMap;
import java.util.Map;

public class MainActivity extends AppCompatActivity {


    //variables globales para llamar elementos de la parte grafica

    EditText name;
    EditText pass;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        //Recuerda que el tutorial de como usar Firebase en android está en Tools/Firebase, y seleccionas
        //el servicio a utilizar, en este caso Real Time Database, recuerda que en tu Firebase, ya hay un
        //proyecto, selecciona el proyecto que ya existe.


        //para llamar a un elemento de la parte grafica hay que crear una variable global mas arriba del tipo de elemento y buscarla por su id

        name = findViewById(R.id.name);
        pass = findViewById(R.id.pass);

    }//cierra el onCreate


    //ESCRITURA

    //Estos metodos dan un parametro View view, lo que permite, en la parte grafica, darle a los botones, en el atributo onClick
    //que ejecuten dicho metodo


    //boton que sobrescribe/actualiza
    public void rutaFija(View view) {

        //ecribir en la base de datos con una ruta fija, osea, se VA a sobrescribir o
        //actualizar, a no ser que se cambie la ruta dentro del .getReference(" ")

        //en android toca crear un hashMap, para poder mandar un key y un value tipo, nombre: "juan David".
        Map<String, String> holaMundo = new HashMap<>();
        holaMundo.put("hola", "mundo, soy el mismo, pero desde Android");


        //luego pasar el hashmap dentro del .setValue para enviarlo
        FirebaseDatabase database = FirebaseDatabase.getInstance();
        DatabaseReference myRef = database.getReference("rutaFija/");
        myRef.setValue(holaMundo);


    }//cierra el metodo ruta fija


    //boton que agrega nuevo contenido
    public void rutaRandom(View view) {

        // escribe en la ruta dada en .ref, un elemento nuevo random que no se
        //sobrescriben pues son un nuevo elemento


        //en android toca crear un hashMap, para poder mandar un key y un value tipo, nombre: "juan David".
        Map<String, String> holaMundo = new HashMap<>();
        holaMundo.put("hola", "mundo, soy un elemento nuevo, desde Android");


        //luego pasar el hashmap dentro del .setValue para enviarlo
        FirebaseDatabase database = FirebaseDatabase.getInstance();
        DatabaseReference myRef = database.getReference("rutaNueva/").push();
        myRef.setValue(holaMundo);


    }//cierra el metodo ruta random


    //boton que crea un elemento dependiendo de los inputs del usuario
    public void rutaParametros(View view) {

        //primero se obtiene el texto que contenia los inputs creando una variable local que los guarde

        String nameString = name.getText().toString();
        String passString = pass.getText().toString();


        //en android toca crear un hashMap, para poder mandar un key y un value tipo, nombre: "juan David".
        Map<String, String> usuario = new HashMap<>();
        usuario.put("nombre", nameString);
        usuario.put("clave", passString);

        //luego pasar el hashmap dentro del .setValue para enviarlo
        FirebaseDatabase database = FirebaseDatabase.getInstance();
        DatabaseReference myRef = database.getReference("parametros/").push();
        myRef.setValue(usuario);


    }//ciera el metodo rutaParametros

}//cierra la actividad principal
