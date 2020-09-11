const gameContainer = document.getElementById("game");
let cards =gameContainer.getElementsByTagName('*');
const resetBtn = document.getElementById("reset");
let scoretext = document.getElementById("score");
const bestscoreText = document.getElementById("bestscore");
let score = 0;
let noClicking = false;
let clickedCard = null;
let clickedCard2 = null;
let cardsPairs = 0;
let bestscore = JSON.parse(localStorage.getItem("bestscore.value"));

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];


function getBestScore () {
  bestscoreText.innerHTML = JSON.parse(localStorage.getItem("bestscore"));
}

getBestScore ();

resetBtn.addEventListener("click", function (){
  gameContainer.innerHTML="";
  score = 0;
 } );



// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");
     
    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    newDiv.classList.add("hide");

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}
/////////////////////////////////////
// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  if (noClicking) return;
     let target = event.target;
     
     if(!clickedCard){
      console.log("you just clicked", event.target);
      clickedCard = target;
      target.classList.remove("hide");
      target.style.backgroundColor = target.className;
     
   } else if (clickedCard) {
     clickedCard2 = target === clickedCard ? null :target;
      target.classList.remove("hide");
     target.style.backgroundColor = target.className;
     console.log("you just clicked", event.target);
      if (clickedCard.className === clickedCard2.className){
           clickedCard.removeEventListener("click", handleCardClick);
           clickedCard2.removeEventListener("click", handleCardClick);
          clickedCard = null;
          clickedCard2 = null; 
          cardsPairs++
        } else {

          noClicking = true;
           setTimeout(function(){
               clickedCard.classList.add("hide");
               target.classList.add("hide");
               clickedCard = null;
               clickedCard2 = null; 
               noClicking = false;
               score++;
               scoretext.innerHTML = score; 
              
             },1000); 
        } 
   }
   if(cardsPairs === cards.length/2 && cardsPairs>0) {
    alert('winner');
    if(bestscore>score || JSON.parse(localStorage.getItem("bestscore.value"))==null ){
      localStorage.setItem("bestscore", score);
     bestscoreText.innerHTML = score; 
   } 
  }
}



