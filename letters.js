const words = require("./word.js");

//creating new constructors for each word so they can then be seperatly
//adding into array with their own unique values
const february = new words.WordObj("february");
february.addToList();

const fireplace = new words.WordObj("fireplace");
fireplace.addToList();

const blizzard = new words.WordObj("blizzard");
blizzard.addToList();

const balaclava = new words.WordObj("balaclava");
balaclava.addToList();

const hailstone = new words.WordObj("hailstone");
hailstone.addToList();

const earmuffs = new words.WordObj("earmuffs");
earmuffs.addToList();

const glacier = new words.WordObj("glacier");
glacier.addToList();

const quilt = new words.WordObj("quilt");
quilt.addToList();

const nippy = new words.WordObj("nippy");
nippy.addToList();

const longjohns = new words.WordObj("longjohns");
longjohns.addToList();


//takes the word and splits it into letters then creates the amount
//of blanks for each letter in that word
function LetterObj(word){
	this.word = word;
	this.letters = word.split("");
	this.blanks = this.letters.length;
	this.blanksAndSuccesses = [];
	this.createBlanks = function(){
		for (let i = 0; i < this.blanks; i++) {
			this.blanksAndSuccesses.push("-");
		}
	};

}

module.exports = {wordsList: words.wordsList,
	LetterObj: LetterObj}