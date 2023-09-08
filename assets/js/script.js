/** Array of animal images */
let cardImgs = [];

/** 
 * The variable is set true if the card has been clicked 
 * for the first time and is set false after that
 */
let firstClick = true;

/** The time left */
let seconds = 20;

/** Countdown function */
let timer;

/** The index of the star images */
let k = 0;

document.addEventListener("DOMContentLoaded", function () {
  // Assign an animal image to each card
  cardImgs = assignImgToCards();
  // Change the color of the card at mouseover/out
  let cards = document.getElementsByClassName("cards");
  for (let card of cards) {
    card.addEventListener("mouseover", changeColor);
    card.addEventListener("mouseout", changeColorBack);
  }
  addFlipCardsEventListener();
});

/**
 * Assign images to the cards
 * @return Array of animal images in a randomized order
 */
function assignImgToCards() {
  let images = ["elephant.png", "flamingo.png", "giraffe.png", "lion.png",
    "savanna-tree.jpg", "zebra.png", "elephant.png", "flamingo.png",
    "giraffe.png", "lion.png", "savanna-tree.jpg", "zebra.png"
  ];
  images = shuffle(images);
  for (i = 0; i < images.length; i++) {
    cardImgs.push(images[i]);
  }
  return cardImgs;
}

function shuffle(images) {
  let currentIndex = images.length,
    randomIndex;

  // While there are elements left to shuffle 
  while (currentIndex != 0) {
    // Pick a remaining element 
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [images[currentIndex], images[randomIndex]] = [images[randomIndex], images[currentIndex]];
  }
  return images;
}

/**
 * Flip cards on click  
 */
function flipCards(event) {
  /** Condition: the card shows the blue side (not the image side), 
    and a card has been clicked (not the gaps) */
  if (event.target.getAttribute('src') === null && event.target.tagName === 'DIV') {
    // start running the timer on first click and disable the function after the first click
    if (firstClick === true) {
      firstClick = false;
      timer = setInterval(updateCountdown, 1000);
    }
    // append an image to the target card 
    let num = event.target.getAttribute('id').substr(4);
    let image = document.createElement('img');
    image.src = 'assets/images/' + cardImgs[num - 1];
    image.alt = cardImgs[num - 1].substr(0, cardImgs[num - 1].lastIndexOf('.'));
    image.style.backgroundColor = "beige";
    image.style.width = '100%';
    image.style.height = '100%';
    event.target.appendChild(image);
    event.target.classList.add('flipped');
  }

  // remove the functions to change colors at mouseover/mouseout from the flipped card
  event.target.removeEventListener('mouseover', changeColor);
  event.target.removeEventListener('mouseout', changeColorBack);

  // disable eventListener (flipCards) from all the cards after two cards have been flipped
  let flipped = document.getElementsByClassName('flipped');
  if (flipped.length === 2) {
    removeFlipCardsEListener();
    // check if the two cards are the same
    check(flipped[0], flipped[1]);
  }
}

/**
 * check if the two flipped cards are the same
 * and handle them accordingly.
 */
function check(flipped0, flipped1) {
  let cards = document.getElementsByClassName("cards");
  // if the two cards are the same, let them disappear after half a second
  if (flipped0.firstElementChild.getAttribute('src') ===
    flipped1.firstElementChild.getAttribute('src') &&
    seconds !== 0) {
    setTimeout(function () {
      flipped0.style.visibility = "hidden";
      flipped1.style.visibility = "hidden";
      getStar();
      // if all 12 cards have disappeared, display a reward message by calling reward()
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
    // if the two cards don't match, flip them back after 1 second.
    setTimeout(function () {
      flipped0.removeChild(flipped0.firstElementChild);
      flipped1.removeChild(flipped1.firstElementChild);
      flipped0.style.backgroundColor = "lightsteelblue";
      flipped1.style.backgroundColor = "lightsteelblue";
      flipped0.addEventListener("mouseover", changeColor);
      flipped0.addEventListener("mouseout", changeColorBack);
      flipped1.addEventListener("mouseover", changeColor);
      flipped1.addEventListener("mouseout", changeColorBack);
      // let the flip-card function resume
      addFlipCardsEventListener();
    }, 1000);
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

/**
 * Change the color of a star from gray to yellow 
 * each time a matching pair has been flipped. 
 */
function getStar() {
  let stars = document.getElementsByClassName('stars');
  stars[k].setAttribute("src", "assets/images/yellow-star.jpg");
  k++;
}

/**
 * Display a reward message when the user completes the game.
 */
function reward() {
  clearInterval(timer);
  let countdown = document.getElementById('countdown');
  countdown.remove();
  let myNode = document.getElementById('cards-wrapper');
  myNode.innerHTML = '';
  let message = document.createElement('h2');
  message.innerHTML = `<em>Well Done!</em>`;

  // Display forest image
  let graphics = document.createElement('img');
  graphics.src = 'assets/images/savanna-forest.jpg';
  graphics.alt = 'savanna forest';
  myNode.append(message);
  myNode.append(graphics);
  displayResetButton();
}

/**
 * display a reset button for refreshing the page
 */
function displayResetButton() {
  if (!document.getElementById('reset')) {
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
 * Update the countdown timer and display a reset button.
 */
function updateCountdown() {
  let countdownEl = document.getElementById('countdown');
  if (seconds > 0) {
    seconds--;
  }
  countdownEl.innerHTML = `0:${seconds}`;
  if (seconds === 0) {
    clearInterval(timer);
    removeFlipCardsEListener();
    removeColorChange();
    // display a comment saying "Time's up" after 0.4 seconds
    setTimeout(function () {
      countdownEl.style.width = "160px";
      countdownEl.innerHTML = "Time's up!";
      countdownEl.style.color = "red";
      displayResetButton();
    }, 400);
  }
}

/** 
 * Disable the function to change color at mouseover/out  
 */
function removeColorChange() {
  let cards = document.getElementsByClassName("cards");
  for (let card of cards) {
    card.removeEventListener("mouseover", changeColor);
    card.removeEventListener("mouseout", changeColorBack);
  }
}

/**
 * Add flip-card function to all the cards
 */
function addFlipCardsEventListener() {
  let allCards = document.querySelector('#cards-wrapper');
  allCards.addEventListener("click", flipCards);
}

/**
 * Remove flip-card function from all the cards
 */
function removeFlipCardsEListener() {
  let allCards = document.querySelector('#cards-wrapper');
  allCards.removeEventListener("click", flipCards);
}