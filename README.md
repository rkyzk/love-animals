# Love Animals!

## Description: 
"Love Animals" is a memory game with 12 cards with animal and tree images.  
Users have 20 seconds to complete the game. Each time the page loads 
the cards will be shuffled in a new order. Users can train their memory while having fun. 

![responsiveness](assets/images/readme/responsiveness.png)

## Technologies used: 
* HTML/CSS and JavaScript

## Features
* Existing Features
- Header 
At the top of the page, the header shows a heart icon and the game title "Love Animals!"
This offers a friendly invitation for users to play the game.

- Timer
Below the header a timer is set to 20 seconds and counts down.  
When it hits zero, a message saying "Time's up" appears in red letters.
The timer urges users to proceed with the game as fast as possible.    

- Cards
12 cards are placed in the section, and initially the back sides are faced up.
When users bring the mouse over a card, the color turns darker so that it's clear
which card the mouse is hovering over.
When users click on a card, it flips the side and shows an animal or tree image. 
When two cards have been flipped, the function to flip the rest of the cards is disabled
temporarily until the two flipped cards have been checked. 
If the two cards match, they disappear after half a second.
If the two cards don't match, they are flipped back after a second.
I used a light blue color for the back sides of the cards and a beige color for the background 
of the images.  
I selected these colors because the contrast can differentiate the two sides clearly and also because the images will stand out against the light colors.  

- Stars
Each time users identify a matching pair, a star turns from grey to yellow below the cards.

- At the end of the game
If users complete the game within 20 seconds, the screen will dispaly a reward message, 
graphics of the savanna forest and a reset button, saying "Play again."
Clicking on the reset button will reload the page to display a new game.
If 20 seconds are over before users finish the game, a message saying "Time's up" and
a reset button will be displayed. In addition the function to flip the cards will be disabled from the remaining cards.
  
## Accessibility and Performance 

I tested playing this game in different browsers: Chrome, Safari and Firefox.
I tested that the game runs fine.
I confirmed that all items are displayed clearly, and there's no confusion for readers to play the game.  
I confirmed that the colors and fonts chosen are easy to read and accessible by running it through lighthouse in devtools. 

![Lighthouse](assets/images/readme/responsiveness.png)

## Bugs 

### Solved bugs
Earlier, if I complete the game right before the time is up, the message "Time's up" would appear 
for a short while before the correct message "well done" appeared.
I changed line 210-215 in the javascript file and delayed the appearance of "Time's up" message 
so as to avoid such instances as mentioned above.  

### Validator Testing 
* HTML
No errors were returned when passing through the official W3C validator

* CSS
No errors were found when passing through the official (Jigsaw) validator

### Unfixed Bugs 
No unfixed bugs

## Deployment
The site was deployed to GitHub pages.  
The steps to deploy: 
* In the Github repository, click on the Settings tab.
* Click on “Pages” in the left column.
* Under “Build and deployment,” select “deploy from a branch,” “main” and “/root” as in the photo below.
* Then the link to the website will appear on the top of the page. 
* the live link to the website: [Love Animals!](https://rkyzk.github.io/love-animals/)

## Credits
### Media
* Font Montserrat was imported from Google Fonts.
* The images were downloaded from the links below:


* The heart icon was imported from fontawesome.