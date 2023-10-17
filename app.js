// Two Initial Arrays for GAME and USER sequences
let gameSeq = [];
let userSeq = [];

// Start Game
let started = false; 
let level = 0; 

//Accessing Elements
let h3 = document.querySelector('h3')
let buttons = ['red','yellow','blue','green']
// let score = document.querySelector('h4')
// -----------

//Add Event listener on Document to record the keypress
document.addEventListener('keypress',function (event) {
    if (started == false) {
        console.log(`Game Started, Level ${level}`);
        started = true;
        document.querySelector('body').style.backgroundColor = '#fff';
        document.querySelector('body').style.color = '#000'
        levelUp();
    }
});

function btnFlash(btn) {
    /*
    This function will be used to flash the button which is randomly passed as the argument
    How this works is, it will add a *flash* class to the btn and we will set a timeout for it.
    Once the timeout is done it will remove the flash class, hence giving the blink.
    */
    btn.classList.add('flash')
    setTimeout(() => {
        btn.classList.remove('flash')
    }, 100) 
}

function levelUp() {    
    userSeq = [];
    // This will start the game and level up each time it is called, and flash the button
    level ++; 
    h3.innerText = `Level ${level}`;
    
    //random btn choose by choosing a random index from the buttons array and using it to get the class
    let idx = Math.floor(Math.random() * 3)
    let randColor = buttons[idx]
    let randBtn = document.querySelector(`.${randColor}`)
    console.log(randBtn)
    gameSeq.push(randColor)
    btnFlash(randBtn);
}

function btnPress() {
    //Flash
    console.log(this)
    //
    let btn = this;
    btnFlash(btn);

    // fetch the id of the button and push it into the user sequence 
    let userColor = btn.getAttribute('id');
    console.log(userColor)
    userSeq.push(userColor) 
    checkBtn(userSeq.length-1);
}
// Next up is Matching the game and user sequence
 
let allBtns = document.querySelectorAll('.btn')
for (btn of allBtns) {
    btn.addEventListener('click', btnPress)
}

// Now onto the game sequence and user sequence

function checkBtn(idx) {
    console.log(`Current Level, ${level}`)

    if (gameSeq[idx] == userSeq[idx]) {
        if (gameSeq.length == userSeq.length) {
            setTimeout(levelUp,1000);
        }
        console.log('WIN WIN WIN')
    }
    else {
        console.log(`Game over, Try Again! ${level}`)
        h3.innerHTML = `Game over <br> Your score was <b>${level}</b> <br> Press any key to continue `
        document.querySelector('body').style.backgroundColor = '#ff3030';
        document.querySelector('body').style.color = '#fff'
        // setTimeout(()=> {
        //     document.querySelector('body').style.backgroundColor = '#fff';
        //     document.querySelector('body').style.color = '#000'
        // },500)
        reset();
    }
}

function reset() {
// When the function is called it will reset all the variables to it's initial values 
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
