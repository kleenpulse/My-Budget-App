

// localStorage.clear()
const body = document.body
const numRegex = /[^\d.-]/g
let totalAmount = document.querySelector('#total-amount')
let userAmount = document.querySelector('#user-amount')
const checkAmountBtn = document.querySelector('#check-amount')
const totalAmountBtn = document.querySelector('#total-amount-btn')
const productTitle = document.querySelector('#product-title')
const errorMessage = document.querySelector('#budget-error')
const inputEl = document.querySelectorAll('.input')
const productTitleError = document.querySelector('#product-title-error')

// const productCostError = document.querySelector('#product-cost-error')
let amount = document.querySelector('#amount')
const expenditureValue = document.querySelector('#expenditure-value')
const balanceValue = document.querySelector('#balance-amount')
const increaseBudget = document.querySelector('#add-budget')
const list = document.querySelector('#list')
const listDisplay = document.querySelector('.list')

/********Variables******* */
const savedTheme = localStorage.getItem('saveTheme')
let tempAmount = 0
let tempBalance
let tempIncrease
let savedExpenseListArr = []
let calBalance
let calExpense
let currencySym = '$'

const sayHelloId = document.getElementById('say-hello')
const themeSwitch = document.querySelector('#switch')
const switchContainer = document.querySelector('.switch')
let themeText = document.querySelector('#theme-text')
let pill = document.querySelector('.pill.pill-it')
/********Variables******* */

//=======================
/********Local storage******* */
let savedName = localStorage.getItem('gameName')
var savedExpenses = getSavedItem('savedExpense')
let checkSavedAmount = getSavedItem('savedAmount')
var savedExpenseList = getSavedItem('myarr')
/********Local storage******* */

// ====== Theme Switcher ======
if (savedName && savedName !== undefined){
    sayHelloId.textContent = `Welcome ${savedName}`
    setTimeout(() => {
        
        sayHelloId.textContent = `${sayHello()} ${savedName}`
    }, 10000);
}else{
    sayHelloId.textContent = `${sayHello()}`
}
if (savedTheme && savedTheme !== undefined) {
    body.removeAttribute('class')
    body.classList.add(savedTheme)
    // themeText.textContent = savedTheme
    if (body.getAttribute('class') === 'dark') {
        themeSwitch.classList.add('right')
        // themeSwitch.innerHTML = '<i class="fa-solid fa-moon"></i>'
    } else if (body.getAttribute('class') === 'light') {
        // themeSwitch.innerHTML = '<i class="fa-solid fa-sun"></i>'
        themeSwitch.classList.remove('right')

    }
}

addSwitchIcon()


themeSwitch.addEventListener('click', function () {
    
        let winWidth = window.innerWidth;
        if (winWidth < 637) {
    
            sayHelloId.style.display = 'none'
        }
    
    let theme

    if (!(this.disabled) === true) {
        if (body.getAttribute('class') === 'light') {
            theme = 'dark'
            addSwitchIcon()
            
            this.classList.add('right')
            body.classList.remove('light')
        } else if (body.getAttribute('class') === 'dark') {
            theme = 'light'
            addSwitchIcon()
            this.classList.remove('right')
            body.classList.remove('dark')

        }
        pill.style.display = 'block'
        localStorage.setItem('saveTheme', theme)
        disableBtn(themeSwitch, true)
        themeText.textContent = theme
        body.classList.toggle(theme)
        setTimeout(() => {
            pill.style.display = 'none'
            disableBtn(this, false)
            sayHelloId.style.display = 'block'

        }, 3050);
    } else {
        // this.classList.remove('right')
        customMsg('Switch disabled', 1300)

    }

});
function addSwitchIcon() {
    switchContainer.classList.add('switch-border')
    setTimeout(() => {
        switchContainer.classList.remove('switch-border')
        if (body.getAttribute('class') === 'light') {
            themeSwitch.innerHTML = '<i class="fa-solid fa-sun"></i>'
    
        } else {
            themeSwitch.innerHTML = '<i class="fa-solid fa-moon"></i>'
    
        }
    }, 1500);
}

// Say Hello
function sayHello() {
    let welcome;
    let date = new Date();
    let helloHour = date.getHours();
    let helloMin = date.getMinutes();
    let helloSec = date.getSeconds();
    if (helloMin < 10) {
        helloMin = "0" + helloMin;
    }
    if (helloSec < 10) {
        helloSec = "0" + helloSec;
    }
    if (helloHour < 12) {
        welcome = "Good Morning";
    } else if (helloHour < 16) {
        welcome = "Good Afternoon";
    } else {
        welcome = "Good Evening";
    }

    return welcome
}

// ====== Theme Switcher [END]======

disableBtn(checkAmountBtn, true)
disableBtn(productTitle, true)
disableBtn(userAmount, true)
// console.log(savedExpenseList)
// console.log(checkSavedAmount)

if (checkSavedAmount !== undefined && checkSavedAmount !== null) {
    updateValues()

}
function updateValues() {
    if (checkSavedAmount !== 0) {
        disableBtn(checkAmountBtn, false)
        disableBtn(productTitle, false)
        disableBtn(userAmount, false)
        // Total Budget
        totalAmountBtn.textContent = 'New Budget'
        increaseBudget.classList.remove('hide')
        tempAmount = checkSavedAmount
        amount.textContent = currencySym + addComma(tempAmount)
        // Calculate total expensesCost
        if (savedExpenseList) {

            expenditureValue.textContent = currencySym + addComma(savedExpenses)
        } else {
            expenditureValue.textContent = 0
        }
        // Calculate Balance
        calBalance = tempAmount - parseInt(expenditureValue.textContent.replace(numRegex, ''))
        balanceValue.textContent = currencySym + addComma(calBalance)

        return
    } else {
        amount.textContent = 0

    }
}
// console.log(checkSavedAmount)

// Set Budget Part
totalAmountBtn.addEventListener('click', () => {
    tempAmount = totalAmount.value
    if (tempAmount === '' || tempAmount < 1) {
        if (tempAmount < 1 && tempAmount !== '') {
            errorMessage.textContent = `Budget can't be "${tempAmount}"`
        } else {
            errorMessage.textContent = `Budget cannot be empty`
        }
        errorMessage.classList.remove('hide')
    } else {
        errorMessage.classList.add('hide')

        totalAmountBtn.textContent = 'New Budget'
        // Set budget
        amount.textContent = currencySym + addComma(tempAmount)

        saveArrOnly('savedAmount', tempAmount)
        // Enable Expense Container
        disableBtn(checkAmountBtn, false)
        disableBtn(productTitle, false)
        disableBtn(userAmount, false)
        // Set Balance
        tempBalance = tempAmount - parseInt(expenditureValue.textContent.replace(numRegex, ''))
        balanceValue.textContent = currencySym + addComma(tempBalance)
        // Clear Input Box
        totalAmount.value = ''

        let isAmount = amount.textContent.replace(/[^0-9]/g, '')
        // console.log(isAmount)
        if (isAmount > 0) {
            increaseBudget.classList.remove('hide')

        }
    }
})
// console.log(tempAmount)
increaseBudget.onclick = () => {
    addToBudget()
}
// Increase the Budget
function addToBudget() {
    tempIncrease = totalAmount.value
    if (tempIncrease === '' || tempIncrease < 0) {
        errorMessage.classList.remove('hide')
    } else {
        errorMessage.classList.add('hide')

        customMsg(`Budget Increased by ${currencySym}${addComma(tempIncrease)}`, 2000)
        // get Amount Value
        let getAmount = parseInt(amount.textContent.replace(/[^0-9]/g, ''))
        // Convert str to Numeric val and add
        getAmount = getAmount + Number(tempIncrease)
        saveArrOnly('savedAmount', getAmount)
        amount.textContent = currencySym + addComma(getAmount)
        // Set Balance
        setTimeout(() => {

            calBalance = Number(getAmount) - savedExpenses
            balanceValue.textContent = currencySym + addComma(calBalance)
        }, 1000)

        // Clear Input Box
        totalAmount.value = ''

    }
}
inputEl.forEach((el) => {
    el.onfocus = () => {
        errorMessage.classList.add('hide')
        productTitleError.classList.add('hide')

    }
    if (el.value) {

        productTitleError.classList.add('hide')
    }
})
// Add Comma(s)
function addComma(n) {
    var parts = n.toString().split(".");
    const numberPart = parts[0];
    const decimalPart = parts[1];
    const thousands = /\B(?=(\d{3})+(?!\d))/g;
    return numberPart.replace(thousands, ",") + (decimalPart ? "." + decimalPart : "");

}
// Function to Disable Edit and Delete Btn

const disableBtns = (bool) => {
    let editBtns = document.querySelectorAll('.edit')
    Array.from(editBtns).forEach(el => {
        el.disabled = bool
        if (bool) {
            el.classList.add('edit-true')
        } else {
            el.classList.remove('edit-true')

        }
    })
}
function customMsg(msg, time) {
    var styler = document.createElement("div")
    styler.className = 'custom-msg'
    styler.innerHTML = `<h1 id="copied"> ${msg} </h1>`
    setTimeout(function () {
        styler.parentNode.removeChild(styler)
    }, time)
    document.body.appendChild(styler)
}

var parentDiv
const modifyElement = (element, edit = false) => {
    parentDiv = element.parentElement
    let currentBalance = balanceValue.textContent.replace(numRegex, '')
    let currentExpense = expenditureValue.textContent.replace(numRegex, '')
    let parentAmount = parentDiv.querySelector('.amount').textContent.replace(numRegex, '')

    if (edit) {
        let parentText = parentDiv.querySelector('.product').textContent
        productTitle.value = parentText
        userAmount.value = parentAmount
        setTimeout(disableBtns(true), 500)
    }
    let calEditBal = parseInt(currentBalance) + parseInt(parentAmount)
    balanceValue.textContent = currencySym + addComma(calEditBal)
    // console.log(calEditBal)
    calExpense = parseInt(currentExpense) - parseInt(parentAmount)
    expenditureValue.textContent = currencySym + addComma(calExpense)
    saveArrOnly('savedExpense', calExpense)
    // console.log(parentDiv)
    parentDiv.remove()
}

// Create List

let listCreator = function (expenseName, expenseValue, expenseId) {
    let sublistContent = document.createElement('div')
    sublistContent.id = expenseId
    sublistContent.classList.add('sublist-content', 'flex-space')

    list.appendChild(sublistContent)

    let cost = expenseValue
    sublistContent.innerHTML = `
    <p class="product">${expenseName}</p>
    <p class="amount"><b>${currencySym}</b>${addComma(cost)}</p>
    `
    let editBtns = document.createElement('button')
    editBtns.title = 'Edit List'
    editBtns.classList.add('fa-solid', 'fa-pen-to-square', 'edit')
    editBtns.style.fontSize = '24px'


    let deleteBtn = document.createElement('a')
    deleteBtn.title = 'Delete List'
    deleteBtn.classList.add('fa-solid', 'fa-trash-can', 'delete')
    deleteBtn.style.fontSize = '24px'
    sublistContent.appendChild(editBtns)
    sublistContent.appendChild(deleteBtn)
    list.appendChild(sublistContent)

    deleteBtn.addEventListener('click', function (el) {
        
        modifyElement(deleteBtn)

        let currentElementId = el.target.parentElement.id
        savedExpenseListArr = savedExpenseListArr.filter(function (arr) {
            
            return arr.id !== currentElementId
        })
        // console.log(savedExpenseListArr)
        saveArrOnly('myarr', savedExpenseListArr)

    })
    editBtns.addEventListener('click', function (el) {
        
        productTitleError.classList.add('hide')

        let editElement = el.target.parentElement.id
        savedExpenseListArr = savedExpenseListArr.filter(function (arr) {
           
            return arr.id !== editElement
        })
        // console.log(savedExpenseListArr)
        saveArrOnly('myarr', savedExpenseListArr)
        modifyElement(editBtns, true)

    })
}
// Add Expenses
var loadList = true
function disableBtn(el, boolean = false) {
    if (boolean) {
        if (el === themeSwitch) {
            el.title = ''
        } else {

            el.title = 'Add Budget Amount first'
        }
        el.disabled = true
        el.classList.add('edit-true')
        return
    }
    if (!boolean) {
        el.title = ''
        el.disabled = false
        el.classList.remove('edit-true')
        return
    }
}
checkAmountBtn.addEventListener('click', () => {
    // Empty checks
    if (!userAmount.value ||
        !productTitle.value) {
        productTitleError.classList.remove('hide')
        return false
    }

    // Check for Duplicates
    let productCheck = document.querySelectorAll('.product')
    Array.from(productCheck).forEach(title => {
        // console.log(title.textContent)
        if (productTitle.value.toLowerCase() === title.textContent.toLowerCase()) {
            customMsg('Item Already Exist', 1000)
            loadList = false

        }
    })
    setTimeout(productTitle.focus(), 1000)
    if (loadList) {
        // Expense
        let productCost = parseInt(userAmount.value)
        // Total expense (existing + new)
        let sum = parseInt(expenditureValue.textContent.replace(numRegex, '')) + productCost
        expenditureValue.textContent = currencySym + addComma(sum)
        // Total balance (budget - total expense)
        calBalance = tempAmount - sum
        // console.log(calBalance)
        balanceValue.textContent = currencySym + addComma(calBalance)
        // sum total expenses saved as sum
        saveArrOnly('savedExpense', sum)
        saveArrOnly('savedBalance', calBalance)
        // Enable buttons
        disableBtns(false)
        listDisplay.classList.remove('hide')

        listCreator(productTitle.value.toUpperCase(), userAmount.value)
        savedExpenseListArr.push({
            title: productTitle.value.toUpperCase(),
            cost: parseInt(userAmount.value)
        })
        saveArrOnly('myarr', filterArr(savedExpenseListArr))
        productTitle.value = ''
        userAmount.value = ''
        createIds()
    }
    // console.log(savedExpenseListArr)
    // Empty input
})


createIds()

function loadFilteredArr() {
    if (savedExpenseList) {

        if (savedExpenseList.length > 0) {
            savedExpenseListArr = savedExpenseList

            filterArr(savedExpenseListArr).forEach((el, index) => {
                el.id = (Number(index) + 1).toString()
                listCreator(el.title, el.cost, el.id)
                // console.log(el)
            })
            listDisplay.classList.remove('hide')
        }
    }
}
loadFilteredArr()
// Creat dynamic Id
function createIds() {

    let listChild = document.querySelectorAll('.sublist-content a')
    listChild.forEach((child, index) => {
        child.id = Number(index) + 1
        
    })
}
createIds()

// FilterArr r
function filterArr(arr) {
    const ids = arr.map(o => o.title)
    const filtered = arr.filter(({ title }, index) => !ids.includes(title, index + 1))
    
    return filtered
}
// Save to LocalStorage

function saveArrOnly(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}
function getSavedItem(key) {
    return JSON.parse(localStorage.getItem(key))
}