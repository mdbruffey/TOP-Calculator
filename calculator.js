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
var resultDisplaying = false;

function updateDisplay(e){
    let string = display.textContent;
    let char = this.textContent;
    if (resultDisplaying) {
        string = "0"
        resultDisplaying = false;
    }
    if (string === "0"){
        if (char !== "0"){
            string = char;
        }
    }
    else{
        string += char;
    }
    display.textContent = string;
}

function clearCalc(e){
    display.textContent = "0";
    array = [];
}

function opUpdate(e){
    let num = parseFloat(display.textContent);
    let ops = "+-×÷"
    if (ops.includes(array[array.length-1])){
        array[array.length-1] = this.textContent;
        return;
    }
    array.push(num);
    array.push(this.textContent);
    display.textContent = "0";
}

function calculate(e){
    array.push(parseFloat(display.textContent));
    let result = array[0];
    for (let i = 1; i < array.length;i += 2){
        result = operate(result,array[i],array[i+1]);
        if(result === null){
            result = "Oops :(";
            break;
        }
    }
    display.textContent = result;
    resultDisplaying = true;
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