function add (a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(a, b, operation) {
    a = +a;
    b = +b;

    switch (operation) {
        case "add":
            result = add(a, b);
            break;
        case "subtract":
            result = subtract(a, b);
            break;
        case "multiply":
            result = multiply(a, b);
            break;
        case "divide":
            if (b === 0) {
                clearCalculator();
                display.textContent = "Nice try :)";
                return;
            }

            result = divide(a, b);
            break;
        default:
            return;
    }
    
    display.textContent = result;
    num1 = result;
    num2 = "";
    operator = "";
    result = "";
    shouldStartNewCalculation = true;
}

function enterNumber(num) {
    if (num === ".") {
        let currentNum = operator === "" ? num1 : num2;
        
        if (currentNum.toString().includes(".")) {
            return;
        }

        if (currentNum === "" || shouldStartNewCalculation) {
            num = "0.";
        }
    }

    if (shouldStartNewCalculation && operator === "") {
        num1 = num;
        display.textContent = num1;
        shouldStartNewCalculation = false;
    } else if (operator === "") {
        num1 += num;
        display.textContent = num1;
    } else if (num2 !== "" && result !== "") {
        num2 = num;
        display.textContent = num2;
    } else {
        num2 += num;
        display.textContent = num2;
    }
}

function enterOperator(operation) {
    if (num1 !== "" && num2 !== "") {
        operate(num1, num2, operator);
    }

    operator = operation;
}

function clearCalculator() {
    num1 = "";
    num2 = "";
    operator = "";
    result = "";
    display.textContent = "0";
}

function deleteDigit() {
    if (num1 === "" && num2 === "") {
        return;
    }

    if (operator !== "") {
        num2 = num2.toString().slice(0, -1);
        
        if (num2 === "") {
            display.textContent = "0";
            return;
        }

        display.textContent = num2;
    } else {
        num1 = num1.toString().slice(0, -1);

        if (num1 === "") {
            display.textContent = "0";
            return;
        }

        display.textContent = num1;
    }
}

function handleKeyboard(event) {
    let numbers = "0123456789."
    let operators = "x-+/";
    
    if (numbers.includes(event.key)) {
        enterNumber(event.key);
    } else if (operators.includes(event.key)) {
        if (event.key === "+") {
            enterOperator("add");
        } else if (event.key === "-") {
            enterOperator("subtract");
        } else if (event.key === "x") {
            enterOperator("multiply");
        } else {
            enterOperator("divide");
        }
    } else if (event.key === "Enter") {
        equalButton.click();
    } else if (event.key === "c") {
        clearCalculator();
    } else if (event.key === "Backspace") {
        backspaceButton.click();
    }
}

let num1 = "";
let num2 = "";
let operator = "";
let result = "";
let shouldStartNewCalculation = false;

let display = document.querySelector("#display");
let digits = document.querySelectorAll("#digit");
let operators = document.querySelectorAll(
    "#multiply, #subtract, #add, #divide");
let equalButton = document.querySelector("#equal");
let clearButton = document.querySelector("#clear");
let backspaceButton = document.querySelector("#backspace");

digits.forEach(digit => digit.addEventListener(
    "click", (event) => enterNumber(event.target.textContent)
));

operators.forEach(op => op.addEventListener(
    "click", (event) => enterOperator(event.target.id)
));

equalButton.addEventListener("click", () => 
    operate(num1, num2, operator));

clearButton.addEventListener("click", () => clearCalculator());

backspaceButton.addEventListener("click", () => deleteDigit());

document.addEventListener("keydown", (event) => 
    handleKeyboard(event))