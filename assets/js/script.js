document.addEventListener("DOMContentLoaded", function() {
  assignImgToCards();
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
function flipCard() {

}

/**
 * check if two flipped cards are the same.
 */
function check() {

}

