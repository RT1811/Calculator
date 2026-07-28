function add(a, b){return a + b;}
function substract(a, b){return a - b;}
function multiply(a, b){return a * b;}
function divide(a, b){
    if (b == 0 ){
        return "Error";
    }
    return a / b;}

function operate(operator, a , b){
    switch(operator){
        case '+': return add(a,b);
        case '-': return substract(a,b);
        case '*': return multiply(a,b);
        case '/': return divide(a,b);
    }
}

let firstNumber = null;
let operator = null;
let shouldResetDisplay = false;

const display = document.querySelector('#display');
const calculator = document.querySelector('#calculator');
const decimalButton = document.querySelector('[data-value="."]');

function updateDecimalButton() {
  decimalButton.disabled =
    !shouldResetDisplay && display.textContent.includes('.');
}

function updateDisplay(value) {
  if (typeof value === 'number' && !Number.isInteger(value)) {
    value = Math.round(value * 100000) / 100000;
  }

  display.textContent = value;
  updateDecimalButton();
}

function inputDigit(digit) {
  // Prevent multiple decimal points
  if (
    digit === '.' &&
    !shouldResetDisplay &&
    display.textContent.includes('.')
  ) {
    return;
  }

  // Start entering a new number
  if (shouldResetDisplay) {
    display.textContent = digit === '.' ? '0.' : digit;
    shouldResetDisplay = false;
  } else if (display.textContent === '0' && digit !== '.') {
    display.textContent = digit;
  } else {
    display.textContent += digit;
  }

  updateDecimalButton();
}

function handleOperator(nextOperator) {
  const currentValue = Number(display.textContent);

  // Prevent calculations when an error message is displayed
  if (Number.isNaN(currentValue)) {
    return;
  }

  if (operator && !shouldResetDisplay) {
    const result = operate(operator, firstNumber, currentValue);
    updateDisplay(result);

    if (typeof result !== 'number') {
      firstNumber = null;
      operator = null;
      shouldResetDisplay = true;
      updateDecimalButton();
      return;
    }

    firstNumber = result;
  } else {
    firstNumber = currentValue;
  }

  operator = nextOperator;
  shouldResetDisplay = true;
  updateDecimalButton();
}

function evaluate() {
  if (
    operator === null ||
    firstNumber === null ||
    shouldResetDisplay
  ) {
    return;
  }

  const secondNumber = Number(display.textContent);
  const result = operate(operator, firstNumber, secondNumber);

  updateDisplay(result);

  firstNumber = null;
  operator = null;
  shouldResetDisplay = true;
  updateDecimalButton();
}

function clearCalculator() {
  firstNumber = null;
  operator = null;
  shouldResetDisplay = false;

  updateDisplay('0');
}

function backspace() {
  // Do nothing if the calculator is waiting for a new number
  if (shouldResetDisplay) {
    return;
  }

  const currentDisplay = display.textContent;

  if (currentDisplay.length <= 1) {
    display.textContent = '0';
  } else {
    display.textContent = currentDisplay.slice(0, -1);
  }

  updateDecimalButton();
}

calculator.addEventListener('click', (e) => {
  if (e.target.dataset.value !== undefined) {
    inputDigit(e.target.dataset.value);
  }

  if (e.target.dataset.operator !== undefined) {
    handleOperator(e.target.dataset.operator);
  }
});

document.querySelector('#equals').addEventListener('click', evaluate);

document
  .querySelector('#clear')
  .addEventListener('click', clearCalculator);

document
  .querySelector('#backspace')
  .addEventListener('click', backspace);

document.addEventListener('keydown', (e) => {
  const key = e.key;
  let recognizedKey = true;

  if (key >= '0' && key <= '9') {
    inputDigit(key);
  } else if (key === '.') {
    inputDigit('.');
  } else if (['+', '-', '*', '/'].includes(key)) {
    handleOperator(key);
  } else if (key === 'Enter' || key === '=') {
    evaluate();
  } else if (key === 'Backspace') {
    backspace();
  } else if (key === 'Escape' || key.toLowerCase() === 'c') {
    clearCalculator();
  } else {
    recognizedKey = false;
  }

  if (recognizedKey) {
    e.preventDefault();
  }
});

updateDecimalButton();