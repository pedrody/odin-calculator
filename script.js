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

let num1 = "";
let num2 = "";
let operator = "";
let result = "";
let shouldStartNewCalculation = false;

let display = document.querySelector("#display");
let buttons = document.querySelectorAll("button");

buttons.forEach(button => button.addEventListener(
    "click", (event) => {
        let buttonId = event.target.id;
        if (buttonId === "add" || buttonId === "subtract" ||
            buttonId === "multiply" || buttonId === "divide") {
            enterOperator(buttonId);
        } else if (buttonId === "equal") {
            operate(num1, num2, operator);
        } else if (buttonId === "clear") {
            clearCalculator();
        }
        else {
            enterNumber(buttonId)
        }

        console.log("num1: " + num1);
        console.log("num2: " + num2);
        console.log("operator: " + operator);
    })
);

