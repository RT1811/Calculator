# Calculator

A simple browser-based calculator built as part of [The Odin Project Foundations course](https://www.theodinproject.com/lessons/foundations-calculator).

This project focuses on JavaScript fundamentals, DOM manipulation, event handling, and creating a responsive calculator interface using CSS Grid.

## Features

* Addition, subtraction, multiplication, and division
* Multi-digit number input
* Decimal number support
* Chained calculations
* Clear button
* Backspace button
* Keyboard support
* Prevention of multiple decimal points in one number
* Division-by-zero handling
* Rounded decimal results
* Responsive calculator layout

## Keyboard Controls

| Key             | Action                |
| --------------- | --------------------- |
| `0–9`           | Enter a number        |
| `.`             | Enter a decimal point |
| `+`             | Addition              |
| `-`             | Subtraction           |
| `*`             | Multiplication        |
| `/`             | Division              |
| `Enter` or `=`  | Calculate the result  |
| `Backspace`     | Remove the last digit |
| `Escape` or `C` | Clear the calculator  |

## Built With

* HTML
* CSS
* JavaScript

## What I Learned

While building this project, I practiced:

* Selecting and updating HTML elements using the DOM
* Handling button clicks and keyboard events
* Using `data-*` attributes to identify calculator buttons
* Storing calculator state between user inputs
* Separating calculator operations into reusable functions
* Using CSS Grid to create a calculator layout
* Handling edge cases such as division by zero
* Preventing invalid decimal input
* Rounding long decimal results

## How It Works

The calculator stores three main pieces of information:

```javascript
let firstNumber = null;
let operator = null;
let shouldResetDisplay = false;
```

* `firstNumber` stores the first number in the calculation.
* `operator` stores the selected mathematical operator.
* `shouldResetDisplay` determines whether the next digit should replace the current display or be appended to it.

The `operate()` function selects the correct mathematical operation:

```javascript
function operate(operator, a, b) {
  switch (operator) {
    case '+':
      return add(a, b);
    case '-':
      return subtract(a, b);
    case '*':
      return multiply(a, b);
    case '/':
      return divide(a, b);
  }
}
```

Event listeners handle calculator button clicks and keyboard input.

## Running the Project Locally

1. Clone the repository:

```bash
git clone https://github.com/RT1811/Calculator
```

2. Open the project folder:

```bash
cd calculator
```

3. Open `index.html` in your browser.

You can also use the Live Server extension in Visual Studio Code.

## Project Structure

```text
calculator/
├── index.html
├── style.css
├── script.js
├── README.md
```

## Future Improvements

Possible improvements include:

* Adding positive and negative number support
* Adding percentage calculations
* Highlighting the currently selected operator
* Improving support for very large numbers
* Adding calculator themes
* Improving accessibility with ARIA labels

## Acknowledgements

This project was completed as part of [The Odin Project](https://www.theodinproject.com/) Foundations curriculum.
