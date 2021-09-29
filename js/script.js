let colors = ['yellow', 'red', 'green', 'blue', 'voilet'];
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let body = document.body;
let scores = document.querySelectorAll('.score');
let num = 0;
let total = 100;
let currentBalloon = 0;
let gameOver = false;
let totalShadow = document.querySelector('.total-shadow');
let startBtn = document.querySelector('.start-game-button');

/* For poping balloon randomly */
function createBalloon() {
    let div = document.createElement('div');
    let rand = Math.floor(Math.random() * colors.length); // For selecting random balloon from colors array
    div.className = 'balloon balloon-' + colors[rand];

    /* For randomly selecting position where balloon will appear */
    rand = Math.floor(Math.random() * (windowWidth - 100));
    div.style.left = rand + 'px';
    div.dataset.number = currentBalloon;
    currentBalloon++;

    body.appendChild(div);
    animateBalloon(div);
}

/* For animating balloon float upside */
function animateBalloon(elem){
    let pos = 0; // Initailising position of ballon
    let random = Math.floor(Math.random() * 6 - 3); // For making different floating speed of balloon 
    let interval = setInterval(frame, 12 - Math.floor(num / 10) + random); // setting time interval so by taking a variable from function frame and changing it every 10 milisecond

    function frame(){
        if(pos >= (windowHeight + 200) && (document.querySelector('[data-number="'+elem.dataset.number+'"]'))){
            clearInterval(interval); // stopping animation if position reached top height of window
            gameOver = true;
        }else{
            pos++; // increase pos value
            elem.style.top = windowHeight - pos + 'px'; // change the style of balloon from top
        }
    }
}

/* For deleting extra div made by createBalloon function */
function deleteBalloon(elem){
    elem.remove();
    num++;
    updateScore();
    playBallSound();
}

/* For generating sound through audio */
function playBallSound(){
    let audio = document.createElement('audio');
    audio.src = 'Sounds/pop.mp3';
    audio.play();
}

function updateScore(){
    for(let i = 0; i<scores.length; i++){
        scores[i].textContent = num;
    }
}

function startGame(){
    restartGame();
    let timeout = 0;
    let loop = setInterval(function(){
        timeout = Math.floor(Math.random() * 600 - 100);
        if(!gameOver && num !== total){
            createBalloon();
        }else if(num !== total){
            clearInterval(loop);
            totalShadow.style.display = 'flex';
            totalShadow.querySelector('.loss').style.display = 'block';
        }else{
            clearInterval(loop);
            totalShadow.style.display = 'flex';
            totalShadow.querySelector('.win').style.display = 'block';
        }
    }, 800 + timeout);
}

function restartGame(){
    let forRemoving = document.querySelectorAll('.balloon');
    for(let i = 0; i<forRemoving.length; i++){
        forRemoving[i].remove();
    }
    gameOver = false;
    num = 0;
    updateScore();
}

/* For deleting balloon on click */
document.addEventListener('click', function(event){
    if(event.target.classList.contains('balloon')){
        deleteBalloon(event.target);
    }
})

document.querySelector('.restart').addEventListener('click', function(){
    totalShadow.style.display = 'none';
    totalShadow.querySelector('.win').style.display = 'none';
    totalShadow.querySelector('.loss').style.display = 'none';
    startGame();
})

document.querySelector('.cancel').addEventListener('click', function(){
    totalShadow.style.display = 'none';
})

startBtn.addEventListener('click', function(){
    startGame();
    document.querySelector('.bg-music').play();
    document.querySelector('.start-game-window').style.display = 'none';
})