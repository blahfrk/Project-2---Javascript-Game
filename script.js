let userScore = 0;
let lives = 2;

const submitGuessButton = document.querySelector("#submitGuess");

function updateLives(){
    document.querySelector("#livesRemaining").textContent = lives;
}

// updates the user's score
function updateScore() {
    document.querySelector("#userPlayerScore").innerHTML = userScore;
}

// function to generate a random number between 1 and 5
function generateRandomNumber() {
    return Math.floor(Math.random() * 5) + 1; // 1 to 5
}

// initialize the first random number
let generatedRandomNumber = generateRandomNumber();
console.log("Initial random number:", generatedRandomNumber);

// To display the generated number (for testing purposes of the if else logic.)
// function displayGenNum() {
//    const displayGeneratedNumber = document.querySelector("#generatedNumber");
//    displayGeneratedNumber.innerHTML = `
//        <div>
//            <h2 class="fw-bold text-warning text-center">${generatedRandomNumber}</h2>
//        </div>
//    `;
// } 

// Display the initial generated random number
 //displayGenNum();

// Audio objects for victory and Lose answers
const victoryAudio = new Audio("Victory-SoundEffect.mp3");
const LostAudio = new Audio("Lost-SoundEffect.mp3");

// Audio objects for correct and incorrect answers
const correctAnswerAudio = new Audio("Correct-SoundEffect.mp3");
const incorrectAnswerAudio = new Audio("Wrong-SoundEffect.mp3");

// click event for submit button
submitGuessButton.addEventListener("click", () => {
    const userInputValue = document.querySelector("#userInput").value;
    const userInput = Number(userInputValue);

    // Input validation and game logic
    if (userInputValue === "") {
        alert("Please type a number! 🤬");
    } else if (userInput == generatedRandomNumber) { 
        // Play correct answer sound
        correctAnswerAudio.play();

        alert("You guessed the right number! ok...🙄");
        userScore ++;

        // re-generate a new random number after correct guess
        generatedRandomNumber = generateRandomNumber ();
        console.log("New random number generated:", generatedRandomNumber);
        //displayGenNum();

    } else {
        // Play incorrect answer sound
        incorrectAnswerAudio.play();

        alert("You didn't guessed the right number! sad life 😆");
        lives--;

        // re-generate a new random number after wrong guess
        generatedRandomNumber = generateRandomNumber ();
        console.log("New random number generated:", generatedRandomNumber);
        //displayGenNum();

    } 

    // Update score display
    updateScore();
    updateLives();
    
    // Check for victory condition
    if(userScore === 2) {
        // Play correct answer sound
        victoryAudio.play();
        
        const victoryModal = new bootstrap.Modal(document.querySelector('#outComeModal'));
        document.querySelector("#outComeGreet").innerHTML = "Congratulation!";
        document.querySelector("#outComeEmoji").innerHTML = "🤡";
        document.querySelector("#outComeMessage").innerHTML = "Lucky you are! You won the game."
        victoryModal.show();

        // Reset the user score after game over
        resetGame();

    } else if (lives === 0) {
        // Play correct answer sound
        LostAudio.play();

        const loseModal = new bootstrap.Modal(document.querySelector('#outComeModal'));
        document.querySelector("#outComeGreet").innerHTML = "Game Over!";
        document.querySelector("#outComeEmoji").innerHTML = "🤮";
        document.querySelector("#outComeMessage").innerHTML = "GGWP! You lost the game!"
        loseModal.show();

        // Reset the user score after game over
        resetGame();

    }

    // Function to reset the game
    function resetGame() {
        lives = 2;
        userScore = 0;
        updateLives();
        updateScore();
        generatedRandomNumber = generateRandomNumber();
        //displayGenNum();
    }

    // Clear input field and refocus
    document.querySelector("#userInput").value = "";

});





