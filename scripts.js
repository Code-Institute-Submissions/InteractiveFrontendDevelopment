

//count down timer

const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let cardClicked = null;
//used to count each time a card clicked
var clickCount = 0;
var timeTaken;
var counter = 0;
var display;
var gameStarted = false;
let secsMins = 0;
let score = 0;

let myFunction = 0;

var gameTimer;

//start game function
function startGame() {
    if(gameStarted == false) {
        gameStarted = true;
        
    gameTimer = setInterval(timer, 1000);
    }
}


//flip card when clicked
function flipCard() {
    //lock board so second card cannot be clicked when the first card is turning over
    if(lockBoard) return;
    //if game has not started
    if(gameStarted == false) return;
    cardClickCount();
    
    if(this === firstCard) return;
        this.classList.add('flip');
    
    if(!hasFlippedCard) {
        //first card click
        hasFlippedCard = true;
        firstCard = this;
        cardClicked =+1;
    } else {
        //second card click
        hasFlippedCard = false;
        secondCard = this;
        
        checkForMatch();
    }
}

//time how long it takes the user to match all cards
function timer() {
    counter++;
    secsMins = ": " + parseInt(counter / 60) + " Minutes " + (counter % 60) + " Seconds"; 

    document.getElementById("timer").innerHTML = secsMins;
}

//count each time a card is clicked
function cardClickCount() {
    console.log(clickCount);
    clickCount++;
    document.getElementById("cardClickCount").innerHTML=clickCount;
}

//check if the cards match
function checkForMatch() {
        if(firstCard.dataset.framework === 
        secondCard.dataset.framework) {
           disableCards();
           //add 1 to the score total each time cards are matched correctly
           score++;
           console.log("score" + score);
        } else {
            unflipCards();
        }
        //When the score reached 6, all cards will be matched meaning the game is complete
        if(score == 6) {
            return gameWon();
        }
}

//function the game over, all cards are matched
function gameWon() {
    alert("You completed the game in " + secsMins + " and " + clickCount + " clicks!!");
    //1 reset timer
    //2 reset flag to indicate game has start,
    //3 reset the flag
    clearInterval(gameTimer);
    counter = 0;
    gameStarted = false;
}

//disable cards from flipping again if it is matched
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    
    resetBoard();
}
//if cards don't match, cards need to be unflipped
function unflipCards() {
    lockBoard = true;
        
        setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        
    resetBoard();
        }, 1500);
}
//reset the click counts to allow the user to make more clicks after their first two clicks
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

//shuffle cards
(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    })
})();

cards.forEach(card => card.addEventListener('click', flipCard));