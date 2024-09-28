// Get the display element
const display = document.getElementById('display');

// Variables to store current input and result
let currentInput = '';
let result = 0;
let lastOperator = null;

// Function to handle number and operator buttons
function handleButtonClick(value) {
    if (!isNaN(value) || value === '.') {
        // If value is a number or dot, add it to the input
        currentInput += value;
        display.value = currentInput;
    } else if (value === '=') {
        // If equals is pressed, perform the calculation
        if (lastOperator !== null && currentInput !== '') {
            result = calculate(result, parseFloat(currentInput), lastOperator);
            display.value = result;
            currentInput = '';
            lastOperator = null;
        }
    } else if (value === 'C') {
        // Clear everything
        currentInput = '';
        result = 0;
        lastOperator = null;
        display.value = '';
    } else {
        // If operator is pressed
        if (currentInput !== '') {
            result = result === 0 ? parseFloat(currentInput) : calculate(result, parseFloat(currentInput), lastOperator);
            display.value = result;
            currentInput = '';
        }
        lastOperator = value;
    }
}

// Function to perform basic calculations
function calculate(a, b, operator) {
    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return a / b;
        default:
            return b;
    }
}

// Add event listeners to all buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', function() {
        const value = this.getAttribute('data-value');
        handleButtonClick(value);
    });
});

// Add event listener to clear button
document.getElementById('clear').addEventListener('click', function() {
    handleButtonClick('C');
});
