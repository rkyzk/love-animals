let cardImgs = [];
let firstClick = true;
let seconds = 29;
let timer;
let k = 0;

document.addEventListener("DOMContentLoaded", function() {
  cardImgs = assignImgToCards();
  //change the color of the card at mouseover
  let cards = document.getElementsByClassName("cards");   
  for (let card of cards) {
    card.addEventListener("mouseover", changeColor);
    card.addEventListener("mouseout", changeColorBack); 
  }
  addFlipCardsEventListener();
});

/**
 * assign images to the cards
 */
function assignImgToCards() {
  let images = ["elephant.png", "flamingo.png", "giraffe.png", "lion.png", "savanna-tree.jpg", "zebra.png",
    "elephant.png", "flamingo.png", "giraffe.png", "lion.png", "savanna-tree.jpg", "zebra.png"];
  shuffle(images);
  for (i = 0; i < images.length; i++) {
    cardImgs.push(images[i]);
  }
  return cardImgs;
}
  
function shuffle(images) {
  for (let i = 0; i < images.length; i++) {
    let j = Math.floor(Math.random() * images.length);
    [images[i], images[j]] = [images[j], images[i]];
  }
}

/**
 * flip cards on click  
 * */  
function flipCards(event) {
   // if not flipped yet and a card has been clicked (not the gaps), 
   // append an image to the target card 
  if (event.target.getAttribute('src') === null && event.target.tagName === 'DIV') { 
     // start running the timer on first click
    if (firstClick === true) {
      firstClick = false;
      timer = setInterval(updateCountdown, 1000);
    }
    let num = event.target.getAttribute('id').substr(4);
    let image = document.createElement('img');
    image.src = 'assets/images/' + cardImgs[num - 1];
    image.alt = cardImgs[num - 1].substr(0, cardImgs[num -1].lastIndexOf('.'));
    console.log[image];
    image.style.backgroundColor = "beige";
    image.style.width = '100%';
    image.style.height = '100%';
    event.target.appendChild(image);
    event.target.classList.add('flipped');
  }  

  // remove mouseover and mouseout events from the flipped card
  event.target.removeEventListener('mouseover', changeColor); 
  event.target.removeEventListener('mouseout', changeColorBack);  

  // disable eventListener (flipCards) from all cards after two cards have been flipped
  let flipped = document.getElementsByClassName('flipped');   
  if (flipped.length === 2) {
    removeEListener();
    // check if the two cards are the same
    check(flipped[0], flipped[1]);
  }
}

/**
 * check if two flipped cards are the same
 * and handle them accordingly.
 */
function check(flipped0, flipped1) {
  let cards = document.getElementsByClassName("cards");  
  // if the two cards are the same, let them disappear after 1 second
  if (flipped0.firstElementChild.getAttribute('src') === 
    flipped1.firstElementChild.getAttribute('src')) {
      setTimeout (function () {
        flipped0.style.visibility = "hidden";
        flipped1.style.visibility = "hidden";
        getStar();
      // if all 12 cards have disappeared, execute function reward()
      let count = 0;
      for (let card of cards) {
        if (card.style.visibility === "hidden") {
          count++;
        }
      }
      if (count === 12) {
        reward();
      } else {
        // put back the eventListener (flipCards) to the rest of the cards
        addFlipCardsEventListener();
      }
    }, 500);
  } else {
    // if the cards are different, flip them back after 2 seconds.
    setTimeout (function () {
      flipped0.removeChild(flipped0.firstElementChild);
      flipped1.removeChild(flipped1.firstElementChild);
      flipped0.style.backgroundColor = "lightsteelblue";
      flipped1.style.backgroundColor = "lightsteelblue";
      flipped0.addEventListener("mouseover", changeColor);
      flipped0.addEventListener("mouseout", changeColorBack); 
      flipped1.addEventListener("mouseover", changeColor);
      flipped1.addEventListener("mouseout", changeColorBack); 
      // let flip card function resume
      addFlipCardsEventListener();
    }, 2000);
  }
  flipped0.classList.remove('flipped');
  flipped1.classList.remove('flipped');
}

function addFlipCardsEventListener() {
  let allCards = document.querySelector('#cards-wrapper'); 
  allCards.addEventListener("click", flipCards);
}

function changeColor(event) {
  event.target.style.backgroundColor = "lightslategray";
}
  
function changeColorBack(event) {
  event.target.style.backgroundColor = "lightsteelblue";
}
  
function getStar() {
  let stars = document.getElementsByClassName('stars');
  stars[k].setAttribute("src", "assets/images/yellow-star.jpg");
  k++;
}
  
function reward() {    
  clearInterval(timer);
  let countdown = document.getElementById('countdown');
  countdown.remove();
  let myNode = document.getElementById('cards-wrapper');
  myNode.innerHTML = '';
  let message = document.createElement('h2');
  message.innerHTML = `<em>Well Done!</em>`;
  let graphics = document.createElement('img');
  graphics.src = 'assets/images/savanna-forest.jpg';
  graphics.alt = 'savanna forest';
  myNode.append(message);   
  myNode.append(graphics);   
  displayResetButton(); 
} 

function displayResetButton() {
  if (document.getElementsByTagName('input').innerHTML === undefined) {
    let myNode = document.getElementById('cards-wrapper');
    let button = document.createElement('input');
    button.value = "Play again";
    button.id = "reset";
    button.type = "button";
    button.setAttribute("onclick", "window.location.reload();");
    myNode.append(button);
  }
}

/** 
 * countdown timer and display reset button
 */
function updateCountdown() {
  let countdownEl = document.getElementById('countdown');
  countdownEl.innerHTML = `0:${seconds}`;
  seconds--;
  if (seconds === 0) {
    setTimeout(function() { 
      clearInterval(timer);
      removeEListener();
      countdownEl.style.width = "160px";
      countdownEl.innerHTML = "Time's up!";
      countdownEl.style.color = "red";
      removeColorChange(); 
      if (document.getElementsByTagName('input').innerHTML === undefined) {
        displayResetButton();
      }
    }, 2000);
  }
}

function removeColorChange() {
  let cards = document.getElementsByClassName("cards");   
  for (let card of cards) {
    card.removeEventListener("mouseover", changeColor);
    card.removeEventListener("mouseout", changeColorBack); 
  }
}

function addFlipCardsEventListener() {
  let allCards = document.querySelector('#cards-wrapper'); 
  allCards.addEventListener("click", flipCards);
}

function removeEListener() {
  let allCards = document.querySelector('#cards-wrapper'); 
  allCards.removeEventListener("click", flipCards);
}