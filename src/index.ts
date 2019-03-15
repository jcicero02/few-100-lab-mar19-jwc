import './styles.css';
console.log('Ready to Party');

const tipInput = document.getElementById('tip-input') as HTMLInputElement;
const tipOption1 = document.getElementById('tip-option1');
const tipOption2 = document.getElementById('tip-option2');
const tipOption3 = document.getElementById('tip-option3');
const optionList = document.querySelectorAll(".btn-secondary")
const tipAmount = document.getElementById('tip-amount');
const billAmount = document.getElementById('bill-amount');
const tipPercentage = document.getElementById('tip-percentage');
const amountToTip = document.getElementById('amount-to-tip');
const totalToBePaid = document.getElementById('total-to-be-paid');

tipInput.addEventListener('input', handleTip);

tipOption1.addEventListener('click', selectTipAmount);
tipOption2.addEventListener('click', selectTipAmount);
tipOption3.addEventListener('click', selectTipAmount);


optionList.forEach(element => {
    const el = element as HTMLLabelElement;
    if (el.classList.contains('disabled')) {
        tipPercentage.innerText = `Tip Percentage: ${el.innerText}`;
        tipAmount.innerText = `You are tipping ${el.innerText}`;
    }
})


let billTotalAmount: number;
let tipOption: number;
function handleTip() {
    tipInput.classList.remove('border-danger');
    billTotalAmount = tipInput.valueAsNumber
    billAmount.innerText = `Bill Amount: ${tipInput.value}`
    optionList.forEach(element => {
        const el = element as HTMLLabelElement;
        if (el.classList.contains('disabled')) {
            tipOption = parseInt(el.innerText);
        }
    })
    calculateTip()


}

function selectTipAmount() {
    const el = this as HTMLLabelElement;
    if (!el.classList.contains('disabled')) {
        el.classList.add('disabled');
        tipOption = parseInt(el.innerText);
        tipPercentage.innerText = `Tip Percentage: ${el.innerText}`;
        tipAmount.innerText = `You are tipping ${el.innerText}`;
        optionList.forEach(element => {
            if (el !== element) {
                element.classList.remove('disabled')
            }
        })
        calculateTip()
    }
}

function calculateTip() {
    if (tipInput.valueAsNumber > 0) {
        let tip: number = (billTotalAmount * tipOption / 100);
        amountToTip.innerText = `Amount to Tip: $${tip.toFixed(2)}`
        totalToBePaid.innerText = `Total to be Paid: $${(billTotalAmount + tip).toFixed(2)}`
    } else if (tipInput.valueAsNumber < 0) {
        tipInput.classList.add('border-danger');
        billAmount.innerText = `Bill Amount:`
        amountToTip.innerText = `Amount to Tip:`
        totalToBePaid.innerText = `Total to be Paid:`
    } else {
        amountToTip.innerText = `Amount to Tip:`
        totalToBePaid.innerText = `Total to be Paid:`
    }
}






