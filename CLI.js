const inquirer = require("inquirer");
const letters = require("./letters.js");

console.log("\n==============================================");
console.log(`Welcome to Hangman!`);
console.log("The Theme is Winter Words")
console.log("==============================================\n");

let guessesLeft = 10;
let letterinWord = false;
let win = false;
let lose = false;
let wrongGuesses = [];
let chosenWord;
let chosenLettersObj;
let chosenWordBlanked;
let currentNumBlanks;
let currentWordSplit;
let letterList = letters.wordsList;


function chooseWord(){
	//Choosing a random word from the list
	chosenWord = letterList[Math.floor(Math.random() * letterList.length)];
	//creating a new constructor splitting the random word into letters
	chosenLettersObj = new letters.LetterObj(chosenWord);
	//creating the amount of blanks there are letters
	chosenLettersObj.createBlanks();
	//displaying those blanks
	chosenWordBlanked = chosenLettersObj.blanksAndSuccesses;
	currentNumBlanks = chosenLettersObj.blanks;
	//grabbing the current word split up
	currentWordSplit = chosenLettersObj.letters;
}

chooseWord();



function guess(){

	console.log(`\nYou have ${guessesLeft} guesses left.`);
	//removing commas and displaying the blanks
	console.log(`Your word: ${chosenWordBlanked.join("")}\n`);
	inquirer.prompt([

  {
    type: "input",
    name: "guess",
    message: "Guess a letter!"
  }

	]).then(function(user) {
		//checking weather the used guessed correctly or not
		//putting the next if else statement in motion
		for (let i = 0; i < currentWordSplit.length; i++) {
			if (user.guess === currentWordSplit[i]) {
			  	letterinWord = true;
			}

		}
		//replacing the blanks with the correct letter
		if (letterinWord){
			for (let i = 0; i < chosenWordBlanked.length; i++) {
				if(currentWordSplit[i] === user.guess){
					chosenWordBlanked[i] = user.guess
				}
			}
			//if letter guessed correctly it will display
			console.log(`\n${user.guess} is in the word!\n`)
			console.log(chosenWordBlanked.join(""));
			//removing that letter since it was guessed correctly
			letterinWord = false;
			//if the word matches you get a win and prompt
			//asking to play again
			if(chosenWordBlanked.join("") === chosenWord){
				win = true;
				inquirer.prompt([
				{
					type: "confirm",
					name: "winAgain",
					message: "You won! Would you like to play again?"

				}
				]).then(function(answer){
					//depending on the response it will reset the playground
					if(answer.winAgain){
						guessesLeft = 10;
						wrongGuesses = [];
						chooseWord();
						guess();
						win = false;
						lose = false;
						
					}
					else{
						//otherwise it will exit you out of the interface
						return console.log("\nThanks for playing!\n");
					}
				})
			}
			if (!win && !lose){
				guess();
			}
		}

		else {
			//if letter is not in word
			//guess incorrectly and you lose a guess and the letter is the pushed to
			//the wrongGuesses array so then you cannot guess the same letter again
		    if(wrongGuesses.indexOf(user.guess) < 0){
		    	console.log(`\nSorry, ${user.guess} is not in this word.\n`);
		    	wrongGuesses.push(user.guess);
		    	guessesLeft--;
		    }
		    else{
		    	console.log(`\nYou already guessed ${user.guess}!\n`);
		    }


		    if (guessesLeft > 0 && !win && !lose){
		    	guess();
			}
			else {
				lose = true;
				inquirer.prompt([
				{
					type: "confirm",
					name: "loseAgain",
					message: "You lost! Would you like to play again?"

				}
				]).then(function(answer){
					if(answer.loseAgain){
						guessesLeft = 10;
						wrongGuesses = [];
						chooseWord();
						guess();
						win = false;
						lose = false;
						
					}
					else{
						return console.log("\nThanks for playing!\n");
					}
				})

			}
			    


	  	}
	  
	});
}


guess();