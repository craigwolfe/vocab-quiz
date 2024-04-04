const vocabulary = [{
    word: "economics",
    definition: "choice that you make with the money you spend or save"
  },
  {
    word: "land",
    definition: "all of the natural resources found on the planet; land, water, timber"
  },
  {
    word: "goods",
    definition: "something is made or produced"
  },
  {
    word: "surplus",
    definition: "you have more than you need"
  },
  {
    word: "resources",
    definition: "things I need to produce good and services"
  },
  {
    word: "profit",
    definition: "when you sell something for more money than it costs to make"
  },
  {
    word: "scarcity",
    definition: "limited resources, not enough for everyone"
  },
  {
    word: "factors of production",
    definition: "land, labor, capital, entrepreneurship"
  },
  {
    word: "services",
    definition: "something that someone else does for you"
  },
  {
    word: "labor",
    definition: "the physical effort we put into making goods or providing services"
  },
  {
    word: "capital",
    definition: "any human created resource that makes other goods and services"
  }
];

let currentWordIndex = -1;
let feedback = '';

//function to start game
function startGame() {
  //get random index for next word
  currentWordIndex = getRandomIndex();
  //display current definition for he word
  displayDefinition();
  //display all of the word buttons
  displayButtons();
  //clear out feedback
  document.getElementById("feedback").textContent = "";
}
//function to check user answer
function checkAnswer(event) {
  //get the selected word
  const selectedWord = event.target.textContent;
  //get the correct word for the current definition
  const currentWord = vocabulary[currentWordIndex].word;
  //check if selected word matches correct word
  if (selectedWord === currentWord) {
    feedback = "Correct!";
    //remove the button for the correct word
    event.target.remove();
    //load new definition after brief delay of 1 sec
    setTimeout(startGame, 1000);
  } else {
    feedback = "Incorrect! Try again!";
  }
  //display feedback message to user
  document.getElementById("feedback").textContent = feedback;
}

//display definitions for current word

function displayDefinition() {
  //
  const definition = vocabulary[currentWordIndex].definition;
  document.getElementById("definition").textContent = definition;
}
//function create buttons with words in div id "button"
function displayButtons() {
  const buttonsContainer = document.getElementById("buttons");
  //remove HTML inside the buttonsContainer element
  buttonsContainer.innerHTML = "";

  //get the current word and other words
  const currentWord = vocabulary[currentWordIndex].word;
  //checks the array to filter out all of the other words except the current word
  const otherWords = vocabulary.filter((wordObj, index) => index !== currentWordIndex);

  //to avoid the user getting the same word use shuffleArray on otherWords
  shuffleArray(otherWords);
	
	//combine current and other words
	const allWords =[currentWord, ...otherWords.map(wordObj => wordObj.word)];
	//shuffle AllWords array - this avoids giving the word as the first option along with definition
	shuffleArray(allWords);
	
  //loops through vocabulary array for words and create buttons
  allWords.forEach(word => {
    const button = document.createElement("button");
    //add word to button
    button.textContent = word;
    //listens for when user click word button and check answer
    button.addEventListener("click", checkAnswer);
    buttonsContainer.appendChild(button);
  });
}

//function to get a random index for the next word
function getRandomIndex(){
	//set the max on the vocabular length minus 1 which indexes at 0
	//max represents the highest index we can use when selecting a random word from array
	const max = vocabulary.length -1;
	//gets the random number from 0 to max
	return Math.floor(Math.random()* (max+1));
}
/*
function rearranges the elements in the array in a random order
starts at the end of the array and moves forward to beginning
for each element in the array it randomly picks another element and swaps the position
it continues this process for all of the elements in the array effectively shuffling them randomly
lke shuffling a deck of card
*/
function shuffleArray(array){
	for (let i =array.length -1; i>0; i--){
		const j = Math.floor(Math.random()* (i+1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

//start the game when the window loads
window.onload = startGame;