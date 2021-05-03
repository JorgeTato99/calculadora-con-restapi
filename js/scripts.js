var NumeroPantalla = "0";
var PantallaConNumero = "Si" // Valores posibles: "Si" & "No"
var UsarPunto = "No" // Valores posibles: "Si" & "No"
var NumeroEspera = 0;
var OperacionPendiente = "";
var Solucion = "";

// Función que se ejecuta al teclear un número, recibe como parámetro el número ingresado.
function ingresarNumero(Numero){

    // Caso 1: Si no es un punto
    if(Numero != "."){

        if(NumeroPantalla == "0" || PantallaConNumero == "Si"){
            document.Calculadora.TextBoxNumeros.value = Numero;
            NumeroPantalla = Numero;
        }else if(Numero != "."){
            document.Calculadora.TextBoxNumeros.value += Numero;
            NumeroPantalla += Numero;
        }// Fin if(NumeroPantalla == "0" || PantallaConNumero == "Si")

    } // Fin if(Numero !== ".")

    // Caso 2: Si es un punto
    if(Numero == "." && UsarPunto == "No" && NumeroPantalla == "0"){
        document.Calculadora.TextBoxNumeros.value = "0.";
        NumeroPantalla = Numero;
        UsarPunto = "Si";
    }else if(Numero == "." && UsarPunto == "No"){
        document.Calculadora.TextBoxNumeros.value += Numero;
        NumeroPantalla += Numero;
        UsarPunto = "Si";
    }else if(Numero == "." && UsarPunto == "Si"){

    }

    PantallaConNumero = "No";

} // Fin ingresarNumero(Numero)

// Función que se ejecuta al teclear una operación, recibe como parámetro la operación ingresada.
function ingresarOperacion(Operacion){

    // Caso 1: Si es la primera vez que se está ingresando una operación
    if(OperacionPendiente == ""){
        NumeroEspera = document.Calculadora.TextBoxNumeros.value; // El número en pantalla se pasa a Espera
        document.Calculadora.TextBoxNumeros.value += Operacion; // Se agrega la operación a la pantalla
        OperacionPendiente = Operacion; // La operacion ingresada se pasa a operacion pendiente.
        PantallaConNumero = "No";
        NumeroPantalla = ""; // Se limpia el número en pantalla
        UsarPunto = "No"; // Se resetea el punto
    }

} // Fin ingresarOperacion(Operacion)

// Funcion que
function resultado(){

    // Se verifica que haya alguna operación pendiente
    if(OperacionPendiente != ""){

        Solucion = NumeroEspera + OperacionPendiente + NumeroPantalla;

        var url = "http://localhost:8085/resultado?Solucion="+Solucion;
        $.getJSON(url,
            function(json) {
                console.log(json);
                document.Calculadora.TextBoxNumeros.value = json.Resultado;
                NumeroPantalla = json.Resultado;
            }
        );

        // Se reinician las variables.
        PantallaConNumero = "Si";
        OperacionPendiente = "";
        UsarPunto = "No";

    }

} // Fin resultado()

function raizCuadrada(){

    if(OperacionPendiente == ""){

        var url = "http://localhost:8085/resultado?Num="+NumeroPantalla;
        $.getJSON(url,
            function(json) {
                console.log(json);
                document.Calculadora.TextBoxNumeros.value = json.Resultado;
            }
        );

        PantallaConNumero = "Si";
        OperacionPendiente = "";
        UsarPunto = "No";

    }

} // Fin raizCuadrada()

function limpiarPantalla(){

    // Se reinician todas las variables y el número en la pantalla.
    NumeroPantalla = "0";
    PantallaConNumero = "Si"
    UsarPunto = "No"
    NumeroEspera = 0;
    OperacionPendiente = "";
    Solucion = "";
    document.Calculadora.TextBoxNumeros.value = "0";

} // Fin limpiarPantalla()