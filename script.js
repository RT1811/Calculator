function add(a, b){return a + b;}
function substract(a, b){return a - b;}
function multiply(a, b){return a * b;}
function divide(a, b){
    if (b == 0 ){
        return "pls enter a non-zero value";
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

function updateDisplay(value) {
    if (typeof value === 'number' && !Number.isInteger(value)) {
      value = Math.round(value * 100000) / 100000;
    }
    display.textContent = value;
}

function inputDigit(digit) {
  if (display.textContent === '0' || shouldResetDisplay) {
    display.textContent = digit;
    shouldResetDisplay = false;
  } else {
    display.textContent += digit;
  }
}

document.querySelector('#calculator').addEventListener('click', (e) => {
  if (e.target.dataset.value !== undefined) {
    inputDigit(e.target.dataset.value);
  }
  if (e.target.dataset.operator !== undefined) {
    handleOperator(e.target.dataset.operator);
  }
});

function handleOperator(nextOperator) {
  const currentValue = Number(display.textContent);

  if (operator && !shouldResetDisplay) {
    const result = operate(operator, firstNumber, currentValue);
    updateDisplay(result);
    firstNumber = result;
  } else {
    firstNumber = currentValue;
  }

  operator = nextOperator;
  shouldResetDisplay = true;
}

document.querySelector('#equals').addEventListener('click', () => {
  if (operator === null || shouldResetDisplay) return; // nothing to evaluate
  const result = operate(operator, firstNumber, Number(display.textContent));
  updateDisplay(result);
  firstNumber = null;
  operator = null;
  shouldResetDisplay = true;
});

document.querySelector('#clear').addEventListener('click', () => {
  firstNumber = null;
  operator = null;
  shouldResetDisplay = false;
  updateDisplay('0');
});