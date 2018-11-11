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
    signo:"",
    cantSigno: 0,
    cantDecimal: false,
    pressIgual: false,
    limpiar: false,
    /*-------------------------------------------
             Metodos Calculadora
    ---------------------------------------------*/
    mCalc: {
        inicio: function () {
            this.accionCalculadora();
            this.teclado();
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
                if (Calculadora.tablero.textContent.length <= 8) {
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
                            Calculadora.cantDecimal=false;
                            Calculadora.operador="";
                        } else {
                            //si se continua realizando operaciones 
                            Calculadora.tablero.innerHTML += Digito;
                        }
                    }
                } else {
                    alert("Lo sentimos no puede ingresar más numeros") // mostrar mensaje al ingresar mas numeros de los permitidos
                }
                Calculadora.valorA = Calculadora.tablero.innerHTML; //Asignar el valor que tenga el tablero
                /*=================================================================
                                Signos de la calculadora 
                ===================================================================*/
            } else if (Digito == "por" || Digito == "menos" || Digito == "mas" || Digito == "dividido" || Digito == "raiz") {
                Calculadora.cantSigno++; //permitir colocar solo un signo
                if (Calculadora.cantSigno == 1) {
                    Calculadora.mCalc.realizarOperacion(Calculadora.valorA, Calculadora.operador) //llamar el metodo realizarOperacion
                    if (Calculadora.tablero.innerHTML == 0) {
                        Calculadora.tablero.innerHTML = 0; //si se presiona un signo replazar el tablero con 0
                    } else {
                        
                        Calculadora.operador = Digito; //Asignar el signo presionado

                        //------------- si se presiona raiz mostrar su resultado ----------------------------
                        if (Calculadora.operador == "raiz") {
                            Calculadora.resultado = Math.sqrt(Calculadora.resultado);
                            Calculadora.tablero.innerHTML = Calculadora.resultado.toString().slice(0, 8); //mostrar solo 8 numeros en pantalla 
                            Calculadora.limpiar=true; //limpiar la pantalla al ingresar un nuevo numero
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
                            Calculadora.tablero.innerHTML = - +Calculadora.tablero.innerHTML; //si en su pocision 0 es igual a menos cambiar su signo 
                        } else {

                            Calculadora.tablero.innerHTML = "-" + Calculadora.tablero.innerHTML; //asingar el menos al lado izquierdo del numero
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
                    Calculadora.signo = "";
                    break;
                    //----------Mostrar Rersultado---------------
                case "igual":
                    if (!Calculadora.pressIgual) {
                        Calculadora.mCalc.realizarOperacion(Calculadora.valorA, Calculadora.operador)
                        Calculadora.valorB = parseFloat(Calculadora.tablero.innerHTML); //Asignar el valor del ultimo digito
                        Calculadora.signo=Calculadora.operador;
                    } else {
                        Calculadora.mCalc.realizarOperacion(Calculadora.valorB,Calculadora.signo) // relizar la operacion con el ultimo valor ingresado la presionar igual varias veces
                    }
                    Calculadora.pressIgual = true; //cambia su estado para poder ejecutar la operacion la presionar varias veces igual
                    Calculadora.limpiar = true; // cambiar su valor para saber si hay que limpiar la pantalla para una nueva operacion o no 
                    Calculadora.valorA=Calculadora.resultado; //Asignar al valorA lo que se encuentra en resultado, para seguir realizando operaciones con el numero 
                    Calculadora.operador=""; //dejar el operador vacio para evitar errores al seguir realizando operaciones con el mismo numero
                    Calculadora.tablero.innerHTML=Calculadora.resultado.toString().slice(0,8); //mostrar en pantalla solo 8 numeros
                    break;

            }
        },
        //-------- Realizar operaciones matematicas -------------------------
        realizarOperacion: function (dato1, signo) {
            switch (signo) {
                case "mas":
                    Calculadora.resultado = parseFloat(Calculadora.resultado) + parseFloat(dato1);
                    break;
                case "menos":
                    Calculadora.resultado = parseFloat(Calculadora.resultado) - parseFloat(dato1);
                    break;
                case "por":
                    Calculadora.resultado = parseFloat(Calculadora.resultado) * parseFloat(dato1);
                    break;
                case "dividido":
                    if(dato1==0){
                        alert("!Ups¡ No puedes dividir entre cero ");
                    }else{
                        Calculadora.resultado = parseFloat(Calculadora.resultado) / parseFloat(dato1);
                    }
                    break;
                default:
                    Calculadora.resultado = parseFloat(dato1);
                    break;
            }
        },
        /*==========================================================
                        Funciones usando el teclado
        ============================================================*/
        teclado: function () {
                document.addEventListener("keydown", Calculadora.mCalc.oprimirTeclado);
            },
            oprimirTeclado: function (tecla) {
                var x = tecla.keyCode || tecla.which; //código de la tecla presionada
                var sig = tecla.key; //seleccionar el valor de la tecla 
                //--------- condicion para evitar que al presionar otras teclas ingrese numeros en pantalla ----------------------
                if ((x >= 48 && x <= 57) || (x >= 96 && x <= 105) || x == 13 || x == 83 || x == 8 || x == 190 || x == 110) {

                    if ((x >= 48 && x <= 57) || (x >= 96 && x <= 105)) {
                        Calculadora.accion = tecla.key; //condicion para mostrar lo numeros en pantalla
                    } else if (x == 13) {
                        Calculadora.accion = "igual"; //si presiona enter enviar el valor igual
                    } else if (x == 83) {
                        Calculadora.accion = "sign"; //si preiona s cambiar el signo
                    } else if (x == 8) {
                        Calculadora.accion = "on"; //si presiona tecla borrar o atras limpiar pantalla
                    } else if (x == 190 || x == 110) {
                        Calculadora.accion = "punto"; // si presiona la tecla punto en el teclado o teclado numerico ingresar decimal
                    }
                    Calculadora.mCalc.operacionC(Calculadora.accion)
                }
                //para usar los operadores del teclado como del teclado numerico se usa la llave de la tecla o simbolo 
                switch (sig) {
                    case "/":
                        Calculadora.accion = "dividido";
                        Calculadora.mCalc.operacionC(Calculadora.accion)
                        break;
                    case "+":
                        Calculadora.accion = "mas";
                        Calculadora.mCalc.operacionC(Calculadora.accion)
                        break;
                    case "-":
                        Calculadora.accion = "menos"
                        Calculadora.mCalc.operacionC(Calculadora.accion)
                        break;
                    case "*":
                        Calculadora.accion = "por";
                        Calculadora.mCalc.operacionC(Calculadora.accion)
                        break;
                    case "r":
                        Calculadora.accion = "raiz";
                        Calculadora.mCalc.operacionC(Calculadora.accion)
                        break;
                }

            }
    }
}
Calculadora['mCalc'].inicio(); //ejecutar la calculadora