let cardImgs = [];

document.addEventListener("DOMContentLoaded", function() {
  cardImgs = assignImgToCards();
  console.log(cardImgs);
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
  }  
}

/**
 * check if two flipped cards are the same.
 */
function check() {

}

