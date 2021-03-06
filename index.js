var inquirer = require('inquirer');
var alphabet = require('alphabet');
var wordBank = require('./modules/wordBank');
var GameWord = require('./modules/word');

// current game stats
var gameState = {
	wins: 0,
	losses: 0,
	"guesses left": 10,
	round: 0,
	lettersGuessed: [],
	currentWord: undefined
}
console.log(`

  888                                                           
  888                                                           
  888                                                           
  88888b.  8888b. 88888b.  .d88b. 88888b.d88b.  8888b. 88888b.  
  888 "88b    "88b888 "88bd88P"88b888 "888 "88b    "88b888 "88b 
  888  888.d888888888  888888  888888  888  888.d888888888  888 
  888  888888  888888  888Y88b 888888  888  888888  888888  888 
  888  888"Y888888888  888 "Y88888888  888  888"Y888888888  888 
                               888                              
                          Y8b d88P                              
                           "Y88P"                               
\n`)
/* set new round, display game stats, trigger guess letter prompt */
function newRound(){
	gameState.round++;
	console.log("\n");
	console.log("-----------------------");
	if(gameState.wins > 0){
		console.log("Wins: ", gameState.wins);
	}
	if(gameState.loses > 0){
		console.log("Losses: ", gameState.losses);
	}
	console.log("Round: ", gameState.round);
	console.log("-----------------------");
	console.log("\n");
	var words = wordBank();
	var newWord = words.join("");
	gameState.currentWord = new GameWord(newWord);
	console.log("\n");
	
	guessLetter();
}

// clear game stats, excluding game round 
function gameReset(){
	for (var key in gameState) {
		if(gameState[key] > 0 && key != "guesses left"){
			console.log("\n");
			console.log(key, ": ", gameState[key]);
			gameState[key] = 0;
		}else {
			if(key === "guesses left"){
				gameState[key] = 10;
			}else if(gameState.lettersGuessed.length > 0){
				gameState[lettersGuessed] = "";
			}else{
				gameState[key] = 0;
			}
		}
  }

  console.log("\n");
  console.log(
				'(|(|'
			)
	console.log(
			 '( -.-)'
			)
	console.log(
				'O_(")(")'
			)
 	console.log("see you next time!");
 	console.log("\n");
}

// display letter or underscore for current word. get user letter guess input and validate
function guessLetter(){

	console.log("#################################");
	console.log("\nguesses: ", gameState["guesses left"]);
	console.log("\n");
	if(gameState.lettersGuessed.length > 0){
		console.log("\nletters guessed", gameState.lettersGuessed);
		console.log("\n");
	}
	
	gameState.currentWord.displayCharacters();
	console.log("\n#################################");
	console.log("\n");

	(gameState["guesses left"] > 0) ? 
		inquirer.prompt([
			{
				type: 'list',
				message: "select a letter: ",
				name: "letterChoice",
				choices: alphabet.lower
			} //use input and validate
		]).then(function(userGuess){

			if(!gameState.lettersGuessed.includes(userGuess.letterChoice) && gameState["guesses left"] > 0){
				gameState.lettersGuessed.push(userGuess.letterChoice);
				//console.log("letters Guessed: ", gameState.lettersGuessed);
				gameState["guesses left"]--;

				// send to 
				gameState.currentWord.guessedLetter(userGuess.letterChoice, guessLetter, playGame, gameState);
			 // 
			}else if(gameState.lettersGuessed.includes(userGuess.letterChoice) && gameState["guesses left"] > 0){
				//console.log("letters Guessed: ", gameState.lettersGuessed);
				console.log("\nguess a letter you haven't already selected");
				console.log("\n");
				guessLetter();
			}

		})
	:
		// game over 
		outOfGuesses()
}

// increment losses and trigger new game 
function outOfGuesses(){
	var word = gameState.currentWord.newWord
	console.log("\n---------------------------------")
	console.log("\n ╮(╯▽╰)╭");
	console.log("\n Out of Guesses.", word.toUpperCase(), "was the word. You lose");
	console.log("\n---------------------------------")
	console.log("\n");

	gameState.losses++;

	playGame();
}

// initiate hangman game
function playGame(){
	//var words = wordBank();
	gameState.lettersGuessed = [];
	gameState["guesses left"] = 10;

	if(gameState.round < 21){
		inquirer.prompt([
			{
				type: 'confirm',
				message: "would you like a new word?",
				name: "newWord",
				default: true
			}
		]).then(function(userResponse){
			(userResponse.newWord) ?
			// if true
			  newRound()
			:
			// if false
				gameReset()
		})

	} else {
	  console.log("thanks for playing!");
		console.log("╮(╯▽╰)╭");
		gameReset();
	}	 
}

playGame();
