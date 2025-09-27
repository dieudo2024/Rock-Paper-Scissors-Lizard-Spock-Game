// Dieudonne
// 24th September 2025
// Rock Paper Scissors Lizard Spock Game

// Select elements from the DOM

const resultText = document.getElementById("result");
const scoreText = document.getElementById("score");
const buttons = document.querySelectorAll(".choice");
const computerButton = document.getElementById("computer-choice");
const resetButton = document.getElementById("reset");

// Adding a sound for win and lose
const winSound = new Audio('media/win.mp3');
const loseSound = new Audio('media/lose.mp3');

// Initialize scores
let playerScore = 0;
let computerScore = 0;
let tieScore = 0;

// Initial text
resultText.textContent = "Make your choice to start the game!";
scoreText.textContent = `Player: ${playerScore} | Computer: ${computerScore} | Ties: ${tieScore}`;

// Add event listeners to buttons
buttons.forEach((button) => {
    button.addEventListener('click', () => playRound(button.dataset.choice));
});

// Add event listener to reset button
resetButton.addEventListener('click', () => resetScore());

// Function to get computer's choice
function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
    const randomIndex = Math.floor(Math.random() * choices.length); //Math.floor rounds down, Math.random gives a number between 0 and 1 * choices.length
    
    return choices[randomIndex];
}

// Function to update computer's choice display
function updateComputerChoiceDisplay(choice) {
    computerButton.style.background = `url('img/${choice.charAt(0).toUpperCase() + choice.slice(1)} RPSLS.jpg') no-repeat center center`;
    computerButton.textContent = choice.charAt(0).toUpperCase() + choice.slice(1); // Capitalize first letter, rest lowercase

    // Reset player's selected button borders
    buttons.forEach((btn) => {
        btn.style.border = "solid 1px rgb(231, 250, 92)"; // Reset all buttons
        btn.style.boxShadow = "none";
        btn.style.transform = "scale(1)";
        btn.style.font = "normal 18px";
        btn.style.color = "black";
    });
}

// Function to determine the winner of a round
function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return 'tie';
    }
    else if ((playerChoice === 'rock' && computerChoice === 'scissors') ||
             (playerChoice === 'paper' && computerChoice === 'rock') ||
             (playerChoice === 'scissors' && computerChoice === 'paper') ||
             (playerChoice === 'rock' && computerChoice === 'lizard') ||
             (playerChoice === 'lizard' && computerChoice === 'spock') ||
             (playerChoice === 'spock' && computerChoice === 'scissors') ||
             (playerChoice === 'scissors' && computerChoice === 'lizard') ||
             (playerChoice === 'lizard' && computerChoice === 'paper') ||
             (playerChoice === 'paper' && computerChoice === 'spock') ||
             (playerChoice === 'spock' && computerChoice === 'rock')) {
        return 'player';
    } else {
        return 'computer';
    }
}

// Function to hightlight the selected button
function highlightButton(button) {
    // Reset all buttons
    buttons.forEach((btn) => {
        if (btn.dataset.choice === button) {
            btn.style.border = "4px solid lightgreen"; // Highlight selected button
            btn.style.transition = "all 0.3s ease";
            btn.style.transform = "scale(1.1)";
            btn.style.font = "bold 20px Arial lihtgreen";
            btn.style.color = "blue";
        }
    })
}

// Function to play a round
function playRound(playerChoice) {
    const computerChoice = getComputerChoice();
    updateComputerChoiceDisplay(computerChoice);
    highlightButton(playerChoice);
    const outcome = determineWinner(playerChoice, computerChoice);

    let result = "";
    if (outcome === 'tie') {
        tieScore++;
        result = `Tie! You both chose ${playerChoice}.`;
    }
    else if (outcome === 'player') {
        playerScore++;
        result = `Win! ${playerChoice} beats ${computerChoice}.`;
    }
    else {
        computerScore++;
        result = `Lose! ${computerChoice} beats ${playerChoice}.`;
    }
    resultText.textContent = result;
    scoreText.textContent = `Player: ${playerScore} | Computer: ${computerScore} | Ties: ${tieScore}`;
    checkGameOver();
}

// Function to reset scores for a new game
function resetScore() {
        playerScore = 0;
        computerScore = 0;
        tieScore = 0;
        scoreText.textContent = `Player: ${playerScore} | Computer: ${computerScore} | Ties: ${tieScore}` ;
        resultText.textContent = "Make your choice to start a new game!";
}

// Function to check if the game is over
function checkGameOver() {   
    if (playerScore === 5 || computerScore === 5) {
        const finalResult = playerScore === 5 ? "You won the game! " : "The Computer won the game!";
        
        // Play sound based on win or lose
        if (playerScore === 5) {
            loseSound.pause();
            loseSound.currentTime = 0;
            winSound.play();}
        else {
            winSound.pause();
            winSound.currentTime = 0;
            loseSound.play();
        }
        // Display final result
        alert(finalResult);

        // Reset scores for a new game
        resetScore();
    }
}