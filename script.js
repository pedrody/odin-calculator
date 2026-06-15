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

function operate(num1, num2, operator) {
    switch (operator) {
        case "+":
            return add(num1, num2);
            break;
        case "-":
            return subtract(num1, num2);
            break;
        case "x":
            return multiply(num1, num2);
            break;
        case "/":
            return divide(num1, num2);
            break;
    }
}

function enterNumber(num) {
    if (operator === "") {
        num1 += num;
        display.textContent = num1;
    } else {
        num2 += num;
        display.textContent = num2;
    }
}

let num1 = "";
let num2 = "";
let operator = "";

let display = document.querySelector("#display");
let buttons = document.querySelectorAll("button");

buttons.forEach(button => button.addEventListener(
    "click", (event) => {
        let buttonId = event.target.id;
        if (buttonId === "add" || buttonId === "subtract" ||
            buttonId === "multiply" || buttonId === "divide") {
                operator = buttonId;
        } else {
            enterNumber(buttonId)
        }
    })
);

