document.addEventListener("DOMContentLoaded", function() {
    const display = document.getElementById('col-display');
    const buttons = document.getElementsByClassName('btn');

    let currentValue = "";
    let currentExpression = "";

    function evaluateResult() {
        let result;
        try {
            result = new Function('return ' + currentExpression.replace(/÷/g, '/').replace(/×/g, '*'))();
            currentValue = result.toString();
        } catch (error) {
            console.error("Invalid expression:", error.message);
            currentValue = "Error";
        }

        display.value = currentValue;
        currentExpression = currentValue;  
    }

    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];

        button.addEventListener('click', function() {
            const value = button.innerText;

            if (value === "AC") {
                currentValue = "";
                currentExpression = "";
            } else if (value === "=") {
                evaluateResult();
            } else if (value === "%") {
                currentExpression += "*0.01";
            } else if (value === "÷" || value === "×" || value === "-" || value === "+" || value === "." || value === "(" || value === ")") {
                currentExpression += value;
            } else if (!isNaN(value)) {
                currentExpression += value;
            } else {
                console.warn("Invalid character:", value);
            }

            display.value = currentExpression;
        });
    }
});
