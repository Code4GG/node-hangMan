const wordsList = [];

//Constructor for word later used to break each word into letters
function WordObj(word){
	this.word = word;
	this.length = word.length;
	//puts the word into wordlist array
	this.addToList = function(){
		wordsList.push(this.word);
	};
}

//exporting key of the required syntax with a value of the required syntax
module.exports = {WordObj: WordObj,
	wordsList: wordsList}

