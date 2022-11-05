let cardImgs = [];

document.addEventListener("DOMContentLoaded", function() {
  cardImgs = assignImgToCards();
  console.log(cardImgs);
  //change the color of the card when mouseover
  let cards = document.getElementsByClassName("cards");   
  for (let card of cards) {
    card.addEventListener("mouseover", changeColor);
    card.addEventListener("mouseout", changeColorBack); 
  }
  let allCards = document.querySelector('#cards-wrapper'); 
  allCards.addEventListener("click", flipCards);
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
  // append an image to the target card 
  if (event.target.getAttribute('src') === null && event.target.tagName === 'DIV') { 
    let num = event.target.getAttribute('id').substr(4);
    let image = document.createElement('img');
    image.src = 'assets/images/' + cardImgs[num - 1];
    image.alt = cardImgs[num - 1].substr(0, cardImgs[num -1].length - 4);
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
    let allCards = document.querySelector('#cards-wrapper'); 
    allCards.removeEventListener("click", flipCards);
    check(flipped[0], flipped[1]);
  }
}

/**
 * check if two flipped cards are the same.
 */
function check(flipped0, flipped1) {
  let cards = document.getElementsByClassName("cards");  
  // if the two cards are the same, let them disappear after 1 second
  if (flipped0.firstElementChild.getAttribute('src') === 
    flipped1.firstElementChild.getAttribute('src')) {
    setTimeout (function () {
      flipped0.style.visibility = "hidden";
      flipped1.style.visibility = "hidden";
      // let flip card function resume
      addFlipCardsEventListener();
    }, 800);
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
  

