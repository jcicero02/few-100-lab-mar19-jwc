import './styles.css';
console.log('Ready to Party');

const tipInput = document.getElementById('tip-input') as HTMLInputElement;
const tipOption1 = document.getElementById('tip-option1');
const tipOption2 = document.getElementById('tip-option2');
const tipOption3 = document.getElementById('tip-option3');
const tipOption4 = document.getElementById('tip-option4');
const splitOption = document.getElementById('split-option');
const splitList = document.getElementById('split-list') as HTMLUListElement;
const optionList = document.querySelectorAll(".btn-secondary");
const tipAmount = document.getElementById('tip-amount');
const billAmount = document.getElementById('bill-amount');
const tipPercentage = document.getElementById('tip-percentage');
const amountToTip = document.getElementById('amount-to-tip');
const totalToBePaid = document.getElementById('total-to-be-paid');
const tipAmountKey = "tipAmountKey";

tipInput.addEventListener('input', handleTip);

tipOption1.addEventListener('click', selectTipAmount);
tipOption2.addEventListener('click', selectTipAmount);
tipOption3.addEventListener('click', selectTipAmount);
tipOption4.addEventListener('input', customTip);
splitOption.addEventListener('input', split);
split();

let localStorageTip = localStorage.getItem(tipAmountKey);
let tipSelector: string;
let tipOption: number;
switch (localStorageTip) {
    case "10%":
        tipSelector = "tip-option1";
        break;
    case "15%":
        tipSelector = "tip-option2";
        break;
    case "20%":
        tipSelector = "tip-option3";
        break;
    case "":
        break;
    case null:
        break;
    default:
        tipSelector = "tip-option4";
        (tipOption4.children[0] as HTMLInputElement).value = localStorageTip;
        break;
}

optionList.forEach(element => {
    const el = element as HTMLLabelElement;
    if (!tipSelector || !localStorageTip) { return };
    if (el.id === tipSelector && tipSelector !== 'tip-option4') {
        el.classList.add('disabled');
    } else {
        el.classList.remove('disabled');
    }
})

optionList.forEach(element => {
    const el = element as HTMLLabelElement;
    if (el.classList.contains('disabled')) {
        handleTipLabels(el.innerText);
    } else if (tipSelector === 'tip-option4') {
        let value = (el.children[0] as HTMLInputElement).valueAsNumber;
        tipOption = value;
        handleTipLabels(localStorageTip + '%');
    }
})


let billTotalAmount: number;


function handleTip() {
    tipInput.classList.remove('border-danger');
    billTotalAmount = tipInput.valueAsNumber;
    billAmount.innerText = `Bill Amount: $${billTotalAmount.toFixed(2)}`;
    optionList.forEach(element => {
        const el = element as HTMLLabelElement;
        if (el.classList.contains('disabled')) {
            tipOption = parseInt(el.innerText);
        }
    });
    calculateTip();
    split();


}

function selectTipAmount() {
    const el = this as HTMLLabelElement;
    if (!el.classList.contains('disabled')) {
        (tipOption4.children[0] as HTMLInputElement).value = "";
        el.classList.add('disabled');
        tipOption = parseInt(el.innerText);
        localStorage.setItem(tipAmountKey, el.innerText);
        tipPercentage.innerText = `Tip Percentage: ${el.innerText}`;
        tipAmount.innerText = `You are tipping ${el.innerText}`;
        optionList.forEach(element => {
            if (el !== element) {
                element.classList.remove('disabled');
            }
        });
        calculateTip();
        split();
    }
}

function customTip() {
    let inputTag = tipOption4.children[0] as HTMLInputElement;
    tipOption = inputTag.valueAsNumber;
    localStorage.setItem(tipAmountKey, inputTag.value);
    if (inputTag.valueAsNumber) {
        handleTipLabels(inputTag.valueAsNumber.toString() + '%')
    } else {
        handleTipLabels('');
    }
    optionList.forEach(element => {
        element.classList.remove('disabled');
    });
    calculateTip();
    split();
}

function calculateTip() {
    if (tipInput.valueAsNumber > 0 && tipOption) {
        let tip: number = (billTotalAmount * tipOption / 100);
        amountToTip.innerText = `Amount to Tip: $${tip.toFixed(2)}`;
        totalToBePaid.innerText = `Total to be Paid: $${(billTotalAmount + tip).toFixed(2)}`;
    } else if (tipInput.valueAsNumber < 0 && tipOption) {
        tipInput.classList.add('border-danger');
        billAmount.innerText = `Bill Amount:`;
        amountToTip.innerText = `Amount to Tip:`;
        totalToBePaid.innerText = `Total to be Paid:`;
    } else {
        billAmount.innerText = `Bill Amount: ${tipInput.valueAsNumber && tipInput.valueAsNumber > 0 ? "$" + tipInput.valueAsNumber.toFixed(2) : ""}`;
        amountToTip.innerText = `Amount to Tip:`;
        totalToBePaid.innerText = `Total to be Paid:`;
    }
}

function split() {
    let numberOfWaysToSplit = Math.floor((splitOption.children[0] as HTMLInputElement).valueAsNumber);
    let tip: number = (billTotalAmount * tipOption / 100);
    let totalForSplitCalc = billTotalAmount + tip;
    while (splitList.firstChild) {
        splitList.removeChild(splitList.firstChild);
    }
    for (let index = 0; index < numberOfWaysToSplit; index++) {
        let node = document.createElement('li');
        let textNode: Text;
        if (billTotalAmount && tipOption) {
            textNode = document.createTextNode(`Person ${index + 1}: $${(totalForSplitCalc / numberOfWaysToSplit).toFixed(2)}`);
        } else {
            textNode = document.createTextNode(`Person ${index + 1}:`);
        }
        node.appendChild(textNode);
        node.classList.add('list-group-item')
        splitList.appendChild(node);

    }
}


function handleTipLabels(value: string) {
    tipPercentage.innerText = `Tip Percentage: ${value}`;
    tipAmount.innerText = `You are tipping ${value}`;
}






