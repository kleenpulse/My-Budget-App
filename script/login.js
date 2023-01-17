let yearEl = document.getElementById('year')
// Say Hello=============
const sayHello = () => {
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

sayHello()
// get full year
let year = new Date().getFullYear()
yearEl.textContent = year

let login = document.getElementById('login')
// Say Hello=============
login.textContent = ` ✧${sayHello()}✧`
setTimeout(() => {

    login.textContent = ` Budget App`
}, 3000);

login.addEventListener('mouseenter', () => {

    login.textContent = ` ✧${sayHello()}✧`
})
login.addEventListener('mouseout', () => {

    login.textContent = ` Budget App`
})

var gamerData

let submitBtn = document.querySelector('.submit')
submitBtn.addEventListener('mouseenter', () => {

    submitBtn.innerHTML = 'Launch App..?'
    setTimeout(() => {
        submitBtn.innerHTML = 'Launch App'

    }, 2000);
})
let inputVal = document.getElementById('user')

let gamer = document.getElementById('startGame')
gamer.addEventListener('submit', (event) => {
    // stop form submission
    event.preventDefault();
    gamerData = gamer.elements['user']

    var gamerName = gamerData.value
    localStorage.setItem('gameName', gamerName)

    setTimeout(() => {

        gamer.submit()
    }, 1000)

});

let getName = localStorage.getItem('gameName')
if (getName !== null) {
    inputVal.value = getName.toUpperCase()
}
