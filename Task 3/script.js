        const task = document.querySelector('.task');
        const result = document.querySelector('.result h1');
        const buttons = document.querySelectorAll('.button');
        const clearButton = document.querySelector('.clearbutton');
        const backspaceButton = document.querySelector('.backspacebutton');

        let currentTask = '';
        let previousTask = '';

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const buttonValue = button.value;

                // Handle special operations (not implemented for ln, lg, e)
                if (buttonValue === '+' || buttonValue === '-' || buttonValue === '*' || buttonValue === '/' || buttonValue === '(' || buttonValue === ')' || buttonValue === '.') {
                    currentTask += buttonValue;
                } else if (buttonValue === '=') {
                    previousTask = currentTask;
                    try {
                        let resultValue = eval(currentTask);
                        let decimalPlaces = getDecimalPlaces(currentTask);
                        resultValue = parseFloat(resultValue).toFixed(decimalPlaces);
                        result.textContent = `=${resultValue}`;
                    } catch (error) {
                        result.textContent = '=Error';
                    }
                } else { // Numbers
                    currentTask += buttonValue;
                }

                task.textContent = currentTask;
            });
        });

        clearButton.addEventListener('click', () => {
            currentTask = '';
            previousTask = '';
            task.textContent = '';
            result.textContent = '=0';
        });

        backspaceButton.addEventListener('click', () => {
            currentTask = currentTask.slice(0, -1);
            task.textContent = currentTask;
        });

        function getDecimalPlaces(expression) {
            let maxDecimalPlaces = 0;
            let numbers = expression.match(/-?\d*\.?\d+/g);
            if (numbers) {
                numbers.forEach(number => {
                    let decimalPlaces = number.split('.').length > 1 ? number.split('.')[1].length : 0;
                    if (decimalPlaces > maxDecimalPlaces) {
                        maxDecimalPlaces = decimalPlaces;
                    }
                });
            }
            return maxDecimalPlaces;
        }