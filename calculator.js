"use strict";

// Function to initialize the calculator when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    hljs.highlightAll();
    // Define global variables for storing operand, operator values
    let firstOperand = "";
    let currentOperator = null;
    let resetScreen = false;
    let isDecimal = false;

    // Get reference to the display and buttons on the page
    const display = document.querySelector("#display");
    const buttons = document.querySelectorAll("button");

    // Event listener for all buttons. On click, handle the button action
    buttons.forEach(button => {
        button.addEventListener('click', () => handleButtonClick(button.textContent));
    });

    // Event listener for keyboard inputs
    document.addEventListener('keydown', event => {
        const key = event.key;
        if ('0123456789+-*/.=C'.includes(key)) {
            handleButtonClick(key);
        }
        if (key === 'Enter') {
            handleButtonClick('=');
        }
        if (key === 'Backspace') {
            handleBackspace();
        }
    });

    // Function to handle button clicks
    function handleButtonClick(value) {
        if (value >= '0' && value <= '9') {
            if (resetScreen) {
                display.textContent = "";
                resetScreen = false;
            }
            display.textContent += value;
        } else if ('+-*/'.includes(value)) {
            if (currentOperator !== null) {
                compute();
            }
            firstOperand = parseFloat(display.textContent);
            currentOperator = value;
            resetScreen = true;
            isDecimal = false;
        } else if (value === '=') {
            if (currentOperator === null || resetScreen) {
                return; // Do nothing if no operator or reset screen
            }
            compute();
            currentOperator = null;
        } else if (value === 'C') {
            clear();
        } else if (value === '.') {
            if (!isDecimal) {
                isDecimal = true;
                display.textContent += value;
            }
        }
    }

    // Function to handle the Backspace key
    function handleBackspace() {
        if (resetScreen) {
            return; // Do nothing if the screen is already reset
        }
        const currentText = display.textContent;
        display.textContent = currentText.slice(0, -1);
        if (currentText.slice(-1) === '.') {
            isDecimal = false; // Re-enable decimal if it's deleted
        }
    }

    // Function to perform the calculation and display the result
    function compute() {
        const secondOperand = parseFloat(display.textContent);
        switch (currentOperator) {
            case '+':
                display.textContent = firstOperand + secondOperand;
                break;
            case '-':
                display.textContent = firstOperand - secondOperand;
                break;
            case '*':
                display.textContent = firstOperand * secondOperand;
                break;
            case '/':
                if (secondOperand === 0) {
                    display.textContent = 'Error! Div by 0';
                } else {
                    display.textContent = firstOperand / secondOperand;
                }
                break;
        }
        resetScreen = true;
        isDecimal = false;
    }

    // Function to clear all stored data and reset the display
    function clear() {
        display.textContent = "0";
        firstOperand = "";
        currentOperator = null;
        resetScreen = false;
        isDecimal = false;
    }
});