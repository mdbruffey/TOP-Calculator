const numbers = document.querySelectorAll(".num");
for (num of numbers){
    num.addEventListener("click", updateDisplay);
}

const operators = document.querySelectorAll(".operator");
for (op of operators){
    op.addEventListener("click", opUpdate);
}

const display = document.querySelector(".calc-display");

const clear = document.querySelector(".clear");
clear.addEventListener("click", clearCalc);

const equal = document.querySelector(".equals");
equal.addEventListener("click", calculate);

const decimal = document.querySelector(".decimal");
decimal.addEventListener("click", addDecimal);

let array = [];
var calculating = false;
var num_pressed = false;

function updateDisplay(e){
    let string = display.textContent;
    let char = this.textContent;
    if (string === "0" || calculating){
        string = char;
        calculating = false;
    }
    else{
        string += char;
    }
    display.textContent = string;
    num_pressed = true;
}

function clearCalc(e){
    display.textContent = "0";
    calculating = false;
    array = [];
}

function opUpdate(e){
    let ops = "+-×÷";
    if (array.length === 2 && num_pressed){
        calculate(null);
    }
    else if (ops.includes(array[array.length-1])){
        array[array.length-1] = this.textContent;
        return;
    }
    let num = parseFloat(display.textContent);
    array.push(num);
    array.push(this.textContent);
    calculating = true;
    num_pressed = false;
}

function calculate(e){
    if (!num_pressed) return;
    array.push(parseFloat(display.textContent));
    console.log(array);
    let result = operate(array[0],array[1],array[2]);
    if(result === null){
        result = "Oops :(";
    }
    display.textContent = result;
    calculating = false;
    array = []
}

function addDecimal(e){
    let string = display.textContent;
    if(!string.includes(".")){
        string += ".";
    }
    display.textContent = string;
}

function operate(num1, op, num2){
    switch(op){
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "×":
            return num1 * num2;
        case "÷":
            if(num2 === 0){return null;}
            return num1 / num2;
    }
}