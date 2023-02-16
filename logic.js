class CalculadoraBasica {
    //  Clase padre
    constructor() {
        //  Constructor
        this.basicOperationShape = new RegExp( //  Expresión regular para validar operaciones básicas
            '(([1-9][0-9]*|[0.])(.[0-9]*[1-9])?[-+*/])(([1-9][0-9]*|[0.])(.[0-9]*[1-9])?)' //  Expresión regular para validar operaciones básicas
        )
        this.memoryRegister = 0 //  Registro de memoria
    }

    printMemoryContents() {
        //  Imprime el contenido de la memoria
        this.clearDisplay() //  Limpia la pantalla
        this.writeToDisplay(this.memoryRegister) //  Escribe en la pantalla el contenido de la memoria
    }

    subtractFromMemory() {
        //  Resta el contenido de la memoria
        this.memoryRegister -= this.solveOperation() //  Resta el contenido de la memoria
    }

    addToMemory() {
        //  Suma el contenido de la memoria
        this.memoryRegister += this.solveOperation() //  Suma el contenido de la memoria
    }

    writeToDisplay(data) {
        //  Escribe en la pantalla
        let legacy = document.getElementById('displayBox').value //  Obtiene el valor de la pantalla
        if (data == '.') {
            //  Si el dato es un punto
            legacy += data //  Agrega el punto al valor de la pantalla
        } else {
            //  Si no es un punto
            legacy = legacy == '0' ? data : (legacy += data) //  Si el valor de la pantalla es 0, el valor de la pantalla es igual al dato, de lo contrario, el valor de la pantalla es igual al valor de la pantalla más el dato
        }
        document.getElementById('displayBox').value = legacy //  Escribe en la pantalla el valor de la pantalla
    }

    writeOperatorToDisplay(operator) {
        //  Escribe el operador en la pantalla
        let legacy = document.getElementById('displayBox').value //  Obtiene el valor de la pantalla
        if (this.basicOperationShape.test(legacy)) {
            //  Si el valor de la pantalla cumple con la expresión regular
            this.solveOperation() //  Resuelve la operación
        }
        this.writeToDisplay(operator) //  Escribe el operador en la pantalla
    }

    clearDisplay() {
        //  Limpia la pantalla
        document.getElementById('displayBox').value = '0' //  Escribe en la pantalla un 0
    }

    solveOperation() {
        //  Resuelve la operación
        let operation = document.getElementById('displayBox').value //  Obtiene el valor de la pantalla
        let result = 0 //  Variable para el resultado
        try {
            //  Intenta
            result = eval(operation == '' ? 0 : operation) //  Evalúa la operación, si la operación es vacía, el resultado es 0, de lo contrario, el resultado es la operación
        } catch (err) {
            //  Si hay un error
            alert('Syntax error') //  Muestra un mensaje de error
            this.clearDisplay() //  Limpia la pantalla
        }
        document.getElementById('displayBox').value = result //  Escribe en la pantalla el resultado
        return result //  Regresa el resultado
    }
}

class CalculadoraCientifica extends CalculadoraBasica {
    //  Clase hija
    constructor() {
        //  Constructor
        super() //  Llama al constructor de la clase padre
        this.inputList = new Array() //  Lista de entradas
        this.operationString = '' //  Operación
        this.justSolved = false //  Bandera para saber si se resolvió la operación
        this.operationMap = {
            //  Mapa de operaciones
            'sin(': 'Math.sin(', //  Función seno
            'cos(': 'Math.cos(', //  Función coseno
            'tan(': 'Math.tan(', //  Función tangente
            'log(': 'Math.log10(', //  Función logaritmo
            'ln(': 'Math.log(', //  Función logaritmo natural
            'sqrt(': 'Math.sqrt(', //  Función raíz cuadrada
            PI: 'Math.PI', //  Constante PI
            e: 'Math.E', //  Constante e
        }
    }

    /**
     * Writes new user input from the calculator buttons onto the
     * display.
     *
     * @param {String} data The data to display on the screen.
     * Given by a button click from the user.
     */
    writeToDisplay(data) {
        //  Escribe en la pantalla
        if (document.getElementById('displayBox').value == 'Syntax Error') {
            //  Si el valor de la pantalla es un error de sintaxis
            super.clearDisplay() //  Limpia la pantalla
        }
        super.writeToDisplay(data) //  Escribe en la pantalla el dato
        this.operationString += data //  Agrega el dato a la operación
        this.inputList.push(data) //  Agrega el dato a la lista de entradas
    }

    /**
     * Writes the operator clicked by the user to the screen.
     *
     * @param {String} operator An string representing the operator
     * that has been clicked on by the user.
     */
    writeOperatorToDisplay(operator) {
        //  Escribe el operador en la pantalla
        if (document.getElementById('displayBox').value == 'Syntax Error') {
            //  Si el valor de la pantalla es un error de sintaxis
            super.clearDisplay() //  Limpia la pantalla
        } //  Si el valor de la pantalla es un error de sintaxis
        this.operationString += operator //  Agrega el operador a la operación
        super.writeToDisplay(operator) //  Escribe el operador en la pantalla
        this.inputList.push(operator) //  Agrega el operador a la lista de entradas
    }

    solveOperation() {
        //    Resuelve la operación
        let result = 0 //  Variable para el resultado
        try {
            //  Intenta
            result = eval(
                //  Evalúa la operación
                this.operationString == '' || //  Si la operación es vacía
                    this.operationString == 'Syntax Error' //  Si la operación es un error de sintaxis
                    ? 0 //  El resultado es 0
                    : this.operationString //  De lo contrario, el resultado es la operación
            )
        } catch (err) {
            //   Si hay un error
            result = 'Syntax Error' //  El resultado es un error de sintaxis
        }
        document.getElementById('displayBox').value = result //  Escribe en la pantalla el resultado
        this.operationString = '' //  Limpia la operación
        this.operationString += result //  Agrega el resultado a la operación
        this.justSolved = true //  La operación se resolvió
        return result //  Regresa el resultado
    }

    /**
     * Clears the display screen.
     */
    clearDisplay() {
        //  Limpia la pantalla
        super.clearDisplay() //  Limpia la pantalla
        this.operationString = '' //  Limpia la operación
    }

    toggleSign() {
        //  Cambia el signo
        var displayBox = document.getElementById('displayBox') //  Obtiene el elemento de la pantalla
        var displayContents = displayBox.value //  Obtiene el valor de la pantalla
        if (displayContents == 'Syntax Error') {
            //  Si el valor de la pantalla es un error de sintaxis
            super.clearDisplay() //  Limpia la pantalla
        }
        if (displayContents == '0') {
            //  Si el valor de la pantalla es 0
            displayBox.value = '-' //  Escribe un menos
            this.operationString += '-' //  Agrega un menos a la operación
        } else {
            //  De lo contrario
            displayBox.value = '-' + displayBox.value //  Escribe un menos y el valor de la pantalla
            this.operationString = '-' + this.operationString //  Agrega un menos y la operación
        }
    }

    clearMemory() {
        //  Limpia la memoria
        super.subtractFromMemory(this.memoryRegister) //  Resta el valor de la memoria a la memoria
    }

    readMemory() {
        //  Lee la memoria
        this.clearDisplay() //  Limpia la pantalla
        this.writeToDisplay(this.memoryRegister) //  Escribe en la pantalla el valor de la memoria
    }

    saveToMemory() {
        //  Guarda en la memoria
        this.memoryRegister = this.solveOperation() //  Guarda el resultado de la operación en la memoria
    }

    eraseLastInput() {
        //  Borra la última entrada
        this.inputList.pop() //  Elimina el último elemento de la lista de entradas
        var recreatedOperation = '' //  Variable para la operación reconstruida
        for (var each in this.inputList) {
            //  Para cada elemento de la lista de entradas
            recreatedOperation += this.inputList[each] //  Agrega el elemento a la operación reconstruida
        }
        document.getElementById('displayBox').value = recreatedOperation //  Escribe en la pantalla la operación reconstruida
        for (var each in this.operationMap) {
            //  Para cada elemento del mapa de operaciones
            recreatedOperation = recreatedOperation.replace(
                //  Reemplaza el elemento del mapa de operaciones por el elemento de la lista de entradas
                each, //  El elemento del mapa de operaciones
                this.operationMap[each] //  El elemento de la lista de entradas
            )
        }
        this.operationString = recreatedOperation //  La operación es la operación reconstruida
    }

    writeMathFunction(data) {
        //  Escribe la función matemática
        if (document.getElementById('displayBox').value == 'Syntax Error') {
            //  Si el valor de la pantalla es un error de sintaxis
            super.clearDisplay() //  Limpia la pantalla
        }
        super.writeToDisplay(data) //  Escribe en la pantalla el elemento
        this.operationString += this.operationMap[data] //  Agrega el elemento a la operación
        this.inputList.push(data) //  Agrega el elemento a la lista de entradas
    }

    calculateFactorial() {
        //  Calcula el factorial
        var number = parseInt(this.operationString.split(new RegExp('[^0-9]'))) //  Obtiene el número
        var result = 0 //  Variable para el resultado
        try {
            //  Intenta
            result = this.calculateRecursiveFactorial(number) //  Calcula el factorial recursivamente
        } catch (err) {
            //  Si hay un error
            document.getElementById('displayBox').value = //  Escribe en la pantalla
                'That number is too big' //  Escribe en la pantalla que el número es demasiado grande
        }
        this.clearDisplay() //  Limpia la pantalla
        document.getElementById('displayBox').value = result //  Escribe en la pantalla el resultado
    }

    calculateRecursiveFactorial(number) {
        //  Calcula el factorial recursivamente
        if (number == 1 || number == 0) {
            //  Si el número es 1 o 0
            return 1 //  El resultado es 1
        }
        return number * this.calculateRecursiveFactorial(number - 1) //  El resultado es el número por el factorial recursivo del número menos 1
    }

    nthTenPower() {
        //  Potencia de 10
        var number = parseInt(this.operationString.split(new RegExp('[^0-9]'))) //  Obtiene el número
        this.clearDisplay() //  Limpia la pantalla
        document.getElementById('displayBox').value = Math.pow(
            10,
            parseInt(number) //  Escribe en la pantalla la potencia de 10 al número
        )
    }

    square() {
        //  Cuadrado
        var number = parseInt(this.operationString.split(new RegExp('[^0-9]'))) //  Obtiene el número
        this.clearDisplay() //  Limpia la pantalla
        document.getElementById('displayBox').value = Math.pow(
            //   Escribe en la pantalla el cuadrado del número
            parseInt(number), //  El número
            2 //  El exponente (2
        )
    }

    cube() {
        //  Cubo
        var number = parseInt(this.operationString.split(new RegExp('[^0-9]'))) //  Obtiene el número
        this.clearDisplay() //  Limpia la pantalla
        document.getElementById('displayBox').value = Math.pow(
            //  Escribe en la pantalla el cubo del número
            parseInt(number), //  El número
            3 //  El exponente (3
        )
    }

    inverseNumber() {
        //  Inverso del número
        var number = parseInt(this.operationString.split(new RegExp('[^0-9]'))) //  Obtiene el número
        this.clearDisplay() //  Limpia la pantalla
        document.getElementById('displayBox').value = Math.pow(
            //   Escribe en la pantalla el inverso del número
            parseInt(number), //  El número
            -1 //  El exponente (-1
        )
    }
}

const calculadora = new CalculadoraCientifica() //  Crea una nueva calculadora científica
