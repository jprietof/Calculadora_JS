/* 
    Proyecto: Calculadora con JS
    Autor: Jorge Prieto
    Aprendizaje: Desarrollo - Web (next-u)
*/
var Calculadora = {
    /*-------------------------------------------
             Propriedades Calculadora
    ---------------------------------------------*/
    teclas: document.getElementsByClassName("tecla"), //seleccionar todos los elementos con la clase tecla
    tablero: document.getElementById("display"), //seleccionar la pantalla para visualizar los datos
    accion: "",
    valorA: 0,
    ValorB: 0,
    resultado: 0,
    operador: "",
    cantSigno: 0,
    cantDecimal: false,
    pressIgual: false,
    limpiar: false,
    ult: 0,
    /*-------------------------------------------
             Metodos Calculadora
    ---------------------------------------------*/
    mCalc: {
        inicio: function () {
            this.accionCalculadora()
        },
        accionCalculadora: function () {
            for (i = 0; i < Calculadora.teclas.length; i++) {
                Calculadora.teclas[i].onmousedown = Calculadora.mCalc.oprimirTecla;
                Calculadora.teclas[i].onmouseup = Calculadora.mCalc.teclaNormal;
            }
        },
        oprimirTecla: function (teclaPresionada) {

            Calculadora.accion = teclaPresionada.target.getAttribute("id"); //seleccionar el atributo de las teclas
            Calculadora.mCalc.operacionC(Calculadora.accion); //llamar a la funcion operacionC
            /*..............................................................
                         Reducir Teclas de Calculadora
            ................................................................ */
            if (Calculadora.accion == 1 || Calculadora.accion == 2 || Calculadora.accion == 3 || Calculadora.accion == 0 || Calculadora.accion == "punto" || Calculadora.accion == "igual") {
                teclaPresionada.target.style = "width:28%; height:61.91px;";
            } else if (Calculadora.accion == "mas") {
                teclaPresionada.target.style = "width:89%; height:99%;";
            } else {
                teclaPresionada.target.style = "width:21%; height:61.91px;";
            }
        },
        teclaNormal: function (teclaPresionada) {
            //------------ Volver la teclas a su estado inicial -----------
            Calculadora.accion = teclaPresionada.target.getAttribute("id")
            if (Calculadora.accion == 1 || Calculadora.accion == 2 || Calculadora.accion == 3 || Calculadora.accion == 0 || Calculadora.accion == "punto" || Calculadora.accion == "igual") {
                teclaPresionada.target.style = "width:29%; height:62.91px;";
            } else if (Calculadora.accion == "mas") {
                teclaPresionada.target.style = "width:90%; height:100%;";
            } else {
                teclaPresionada.target.style = "width:22%; height:62.91px;";
            }
        },
        /*..............................................................
                       Mostrar numeros en tablero - Calculadora
          ................................................................ */
        operacionC: function (Digito) {

            if (Digito >= 0 && Digito <= 9) {
                //si la cantidad de numeros en pantalla son menor a 8, 9 para acupar toda la pantalla
                if (Calculadora.tablero.textContent.length < 8) {
                    Calculadora.cantSigno = 0; //para controlar la cantidad de signos 
                    if (Calculadora.tablero.innerHTML == "0") {
                        //controlar la cantidad de 0 y poder usar el decimal
                        Calculadora.tablero.innerHTML = "";
                        Calculadora.tablero.innerHTML += Digito;
                    } else {
                        if (Calculadora.limpiar) {
                            //limpiar la pantalla si se preciona un numero despues de realizar la operación
                            Calculadora.tablero.innerHTML = "";
                            Calculadora.tablero.innerHTML += Digito;
                            Calculadora.limpiar = false;
                        } else {
                            //si se continua realizando operaciones 
                            Calculadora.tablero.innerHTML += Digito;
                        }
                    }
                } else {
                    alert("Lo sentimos no puede ingresar más numeros") // mostrar mensaje al ingresar mas numeros de los permitidos
                }
                /*=================================================================
                                Signos de la calculadora 
                ===================================================================*/
            } else if (Digito == "por" || Digito == "menos" || Digito == "mas" || Digito == "dividido" || Digito == "raiz") {
                Calculadora.cantSigno++; //permitir colocar solo un signo
                if (Calculadora.cantSigno == 1) {
                    if (Calculadora.tablero.innerHTML == 0) {
                        Calculadora.tablero.innerHTML = 0; //si se presiona un signo replazar el tablero con 0
                    } else {
                        Calculadora.valorA = parseFloat(Calculadora.tablero.innerHTML); //Asignar el numero que esta en tablero
                        Calculadora.operador = Digito; //Asignar el signo presionado

                        //------------- si se presiona raiz mostrar su resultado ----------------------------
                        if (Calculadora.operador == "raiz") {
                            Calculadora.resultado = Math.sqrt(Calculadora.valorA);
                            Calculadora.tablero.innerHTML = Calculadora.resultado.toString().slice(0, 8); //mostrar solo 8 numeros en pantalla 
                        } else {
                            Calculadora.tablero.innerHTML = ""; //Mostrar la pantalla en blanco para entender que esta en operacion
                            Calculadora.cantDecimal = false; //pemitir que puda ingresar decimal 
                            Calculadora.pressIgual = false; //controlar el ultimo valor para las operaciones, al pulsar el igual constantemente
                            Calculadora.limpiar = false; //permitir seguir con las operaciones 
                        }
                    }
                }
                //-----------------------------------------------------------------
            }
            /*=================================================================
                           Otras operaciones de la calculadora
            ===================================================================*/
            switch (Digito) {
                //----------cambiar signo------------------
                case "sign":
                    if (Calculadora.tablero.innerHTML != 0) {

                        if (Calculadora.tablero.innerHTML.charAt(0) == "-") {
                            Calculadora.tablero.innerHTML = - +Calculadora.tablero.innerHTML;
                        } else {

                            Calculadora.tablero.innerHTML = "-" + Calculadora.tablero.innerHTML;
                        }
                    }
                    break;
                    //----------Agregar decimal----------------
                case "punto":
                    if (!Calculadora.cantDecimal) {
                        Calculadora.tablero.innerHTML += ".";
                        Calculadora.cantDecimal = true;
                        Calculadora.limpiar = false;
                    }
                    break;
                    //-----------Borrar Tablero-----------------
                case "on":
                    Calculadora.tablero.innerHTML = 0;
                    Calculadora.cantDecimal = false;
                    Calculadora.pressIgual = false;
                    Calculadora.limpiar = false;
                    Calculadora.cantSigno = 0;
                    Calculadora.valorA = 0;
                    Calculadora.valorB = 0;
                    Calculadora.resultado = 0;
                    Calculadora.operador = "";
                    Calculadora.ult = 0;
                    break;
                    //----------Mostrar Rersultado---------------
                case "igual":
                    if (!Calculadora.pressIgual) {
                        Calculadora.valorB = parseFloat(Calculadora.tablero.innerHTML); //Asignar el valor del ultimo digito
                        Calculadora.ult = Calculadora.valorB; //asignar el valor para futuras operaciones del igual
                        Calculadora.mCalc.realizarOperacion(Calculadora.valorA, Calculadora.valorB, Calculadora.operador); //ejecutar la funcion realizarOperacion
                    } else {
                        Calculadora.valorA = Calculadora.resultado; //remplazar el valorA por el resultado, para realizar mas operaciones con el resultado
                        Calculadora.mCalc.realizarOperacion(Calculadora.valorA, Calculadora.ult, Calculadora.operador);

                    }
                    Calculadora.pressIgual = true; //cambia su estado para poder ejecutar la operacion la presionar varias veces igual
                    Calculadora.limpiar = true; // cambiar su valor para saber si hay que limpiar la pantalla para una nueva operacion o no 
                    break;

            }
        },
        realizarOperacion: function (dato1, dato2, signo) {
            switch (signo) {
                case "mas":
                    Calculadora.resultado = dato1 + dato2;
                    break;
                case "menos":
                    Calculadora.resultado = dato1 - dato2;
                    break;
                case "por":
                    Calculadora.resultado = dato1 * dato2;
                    break;
                case "dividido":
                    Calculadora.resultado = dato1 / dato2;
                    break;
            }
            Calculadora.tablero.innerHTML = Calculadora.resultado.toString().slice(0, 8); //muestra en pantalla 8 numeros
        }
    }
}
Calculadora['mCalc'].inicio(); //ejecutar la calculadora