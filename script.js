const add = function(a, b) {
    return a + b
}

const substract = function(a, b) {
    return a - b
}

const multiply = function(a, b) {
    return a * b
}

const divide = function(a, b) {
    if (b === 0) {
        return  "Nice try! No 0";
    } else {
        return a / b;
    }
}

let firstNum = "";
let operator = null;
let secondNum = "";

const operate = function(firstNumber, operator, secondNumber) {
    switch (operator) {
        case '+':
            return add(firstNumber, secondNumber);
        case '-': 
            return substract(firstNumber, secondNumber);
        case '*':
            return multiply(firstNumber, secondNumber);
        case '/':
            return divide(firstNumber, secondNumber);
    }
}

const numbersBtn = document.querySelectorAll(".number");
const displayScreen = document.querySelector(".screen");
const operatorBtns = document.querySelectorAll(".operator")
const equalBtn = document.querySelector(".equal");
const clearBtn = document.querySelector(".clear");
const backspaceBtn = document.querySelector(".backspace");

function resetState() {
    firstNum = "";
    secondNum = "";
    operator = null;
}

function inputNum(val) {
    if (operator === null) {
        if (val === '.' && firstNum === "") {
            firstNum = "0.";
        }
    
    else if (val === '.' && firstNum.includes('.')) return;

    else {
        firstNum += val;
    }
    
    displayScreen.value = firstNum;
   }
     else {
        if (val === '.' && secondNum === "") {
            secondNum = "0.";
        }
        else if (val === '.' && secondNum.includes('.')) return 
        else { 
        secondNum += val;
        }

        displayScreen.value = secondNum;
    }
}

function updateOperator(op) {
    if (!firstNum) return;
    if (firstNum && secondNum && operator) {
        calculate();
    } 
    operator = op;
}

function roundDecimalNum(num) {
    return Math.round(num * 1000) / 1000;
}
function calculate() {
    if (firstNum && operator && secondNum) {
    const result = operate(+firstNum, operator, +secondNum);

    if (typeof result === "string") {
        displayScreen.value = result;
        resetState();

    } else {
    firstNum = roundDecimalNum(result);
    displayScreen.value = firstNum;
    secondNum = "";
    }
    }
}

function clear() {
    resetState();
    displayScreen.value = "0";
}

function backspace() {
    
    if (secondNum) {
        secondNum = secondNum.slice(0, -1);
        displayScreen.value = secondNum || operator
    } else if (!secondNum && operator) {
        operator = null;
        displayScreen.value = firstNum || "0";
    } else {
        if (typeof firstNum === 'string') {
        firstNum = firstNum.slice(0, -1);
        displayScreen.value = firstNum || "0";
       }
    }
    
}

numbersBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        inputNum(btn.textContent);
    });
});

operatorBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        updateOperator(btn.textContent);
    });
});

equalBtn.addEventListener("click", calculate);

clearBtn.addEventListener("click", clear);

backspaceBtn.addEventListener("click", backspace)

const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const ops = ['-', '+', '/', '*'];

window.addEventListener("keydown", (event) => {

    if (digits.includes(event.key) || event.key === "Enter" || event.key === "Backspace" || ops.includes(event.key)) {
        event.preventDefault();
    }

    if (digits.includes(event.key)) {
        inputNum(event.key);
    }
    switch (event.key) { 
        case  'Backspace':
            backspace();
            break;
        case '+':
        case '-':
        case '/':
        case '*':
            updateOperator(event.key);
            break;
        case 'Enter':
            calculate();
            break;
    };
});
