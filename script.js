class Calculator{
    constructor(previousOperandText, currentOperandText){
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        this.clear();
    }

    clear(){
        this.previousOperand = "";
        this.currentOperand = "";
        this.operation = undefined;
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number){
        if(number === "." && this.currentOperand.includes(".")) 
            return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation){
        if(this.currentOperand === "")
            return;
        if(this.previousOperand !== "")
            this.compute();
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    compute(){
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(current))
            return;
        switch(this.operation){
            case "+":
                computation = prev + current;
                break;
            case "-":
                computation = prev - current;
                break;
            case "*":
                computation = prev * current;
                break;
            case "/":
                computation = prev / current;
                break;
            default:
                return;
        }

        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = "";
    }

    getDispNum(number){
        const num = number.toString();
        const integerDigits = parseFloat(num.split(".")[0]);
        const decimalDigits = num.split(".")[1];
        let integerDisplay;
        if(isNaN(integerDigits))
            integerDisplay = "";
        else
            integerDisplay = integerDigits.toLocaleString("en", {maximumFractionDigits: 0});

        if(decimalDigits != null)
        {
            return `${integerDisplay}.${decimalDigits}`
        }
        else{
            return  integerDisplay
        }
    }

    updateDisplay(){
        this.currentOperandText.innerText = this.getDispNum(this.currentOperand);
        if(this.operation != null){
            this.previousOperandText.innerText = `${this.getDispNum(this.previousOperand)} ${this.operation}`;
        }
        else
            this.previousOperandText.innerText = "";
    }

}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[all-clear]');
const previousOperandText = document.querySelector('[previous-operand]');
const currentOperandText = document.querySelector('[current-operand]');
const calculator = new Calculator(previousOperandText, currentOperandText);
console.log(numberButtons)
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})
