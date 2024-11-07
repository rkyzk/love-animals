/** 画像のアレイ */
let cardImgs = [];

/** 
 * 初回にカードがクリックされた時falseに設定される。
 */
let firstClick = true;

/** 残り時間（秒） */
let seconds = 20;

/** カウントダウンタイマー */
let timer;

/** 星マークのインデックス */
let k = 0;

document.addEventListener("DOMContentLoaded", function () {
  // 各カードに動物画像を設定
  cardImgs = assignImgToCards();
  // mouseover/outでカードの色を変更
  let cards = document.getElementsByClassName("cards");
  for (let card of cards) {
    card.addEventListener("mouseover", changeColor);
    card.addEventListener("mouseout", changeColorBack);
  }
  addFlipCardsEventListener();
});

/**
 * カードに画像を設定
 * @return 動物の画像をランダムな順に並べたアレイ
 */
const assignImgToCards = () => {
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

// カードを切る
const shuffle = (images) => {
  let currentIndex = images.length,
    randomIndex;
  // 並び替えしてないカードが残っている限り処理を続ける
  while (currentIndex != 0) {
    // 残りカードのインデックスを１つ選ぶ
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // currentIndexの位置にrandomIndexのカードを置く.
    [images[currentIndex], images[randomIndex]] = [images[randomIndex], images[currentIndex]];
  }
  return images;
}

/**
 * クリックされたらカードをめくる  
 */
const flipCards = (event) => {
  /** カードの青い面が表示されていて、かつ 
    カード自体（間のスペースでなく）がクリックされた時 */
  if (event.target.getAttribute('src') === null && event.target.tagName === 'DIV') {
    // 初回クリック時にカウントダウン開始
    if (firstClick === true) {
      firstClick = false;
      timer = setInterval(updateCountdown, 1000);
    }
    // めくられたカードに画像を設定
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

  // 捲られたカードからmouseover/mouseout時に色を変更するイベントリスナーを削除
  event.target.removeEventListener('mouseover', changeColor);
  event.target.removeEventListener('mouseout', changeColorBack);

  // ２枚カードが捲られたら全てのカードからカードをめくるイベントリスナーを削除
  let flipped = document.getElementsByClassName('flipped');
  if (flipped.length === 2) {
    removeFlipCardsEListener();
    // ２枚のカードが同じかチェック
    check(flipped[0], flipped[1]);
  }
}

/**
 * ２枚のカードが同じかチェック
 * 同じ場合画像を消す。
 * 異なる場合
 */
const check = (flipped0, flipped1) => {
  let cards = document.getElementsByClassName("cards");
  // ２枚のカードが同じ場合、0.5秒後に画像を消す。
  if (flipped0.firstElementChild.getAttribute('src') ===
    flipped1.firstElementChild.getAttribute('src') &&
    seconds !== 0) {
    setTimeout(function () {
      flipped0.style.visibility = "hidden";
      flipped1.style.visibility = "hidden";
      getStar();
      // 全12枚消えたらreward()を呼び出しよくできましたのメッセージを表示
      let count = 0;
      for (let card of cards) {
        if (card.style.visibility === "hidden") {
          count++;
        }
      }
      if (count === 12) {
        reward();
      } else {
        // カードをめくるイベントリスナー (flipCards) を残っているカードに追加
        addFlipCardsEventListener();
      }
    }, 500);
  } else {
    // ２枚のカードが異なる場合1秒後にひっくり返し青い面を表示する。
    setTimeout(function () {
      flipped0.removeChild(flipped0.firstElementChild);
      flipped1.removeChild(flipped1.firstElementChild);
      flipped0.style.backgroundColor = "lightsteelblue";
      flipped1.style.backgroundColor = "lightsteelblue";
      flipped0.addEventListener("mouseover", changeColor);
      flipped0.addEventListener("mouseout", changeColorBack);
      flipped1.addEventListener("mouseover", changeColor);
      flipped1.addEventListener("mouseout", changeColorBack);
      // カードをめくるイベントリスナーを追加
      addFlipCardsEventListener();
    }, 1000);
  }
  flipped0.classList.remove('flipped');
  flipped1.classList.remove('flipped');
}

const changeColor = (event) => {
  event.target.style.backgroundColor = "lightslategray";
}

const changeColorBack = (event) => {
  event.target.style.backgroundColor = "lightsteelblue";
}

/**
 * 対のカードが見つかった時星の色を灰色から黄色に変える
 */
const getStar = () => {
  let stars = document.getElementsByClassName('stars');
  stars[k].setAttribute("src", "assets/images/yellow-star.jpg");
  k++;
}

/**
 * よくできましたのメッセージを表示
 */
const reward = () => {
  clearInterval(timer);
  let countdown = document.getElementById('countdown');
  countdown.remove();
  let myNode = document.getElementById('cards-wrapper');
  myNode.innerHTML = '';
  let message = document.createElement('h2');
  message.innerHTML = `<em>Well Done!</em>`;

  // ジャングルのイメージを表示
  let graphics = document.createElement('img');
  graphics.src = 'assets/images/savanna-forest.jpg';
  graphics.alt = 'savanna forest';
  myNode.append(message);
  myNode.append(graphics);
  displayResetButton();
}

/**
 * ページをリロードするためのリセットボタンを表示
 */
const displayResetButton = () => {
  if (!document.getElementById('reset')) {
    let myNode = document.getElementById('cards-wrapper');
    let button = document.createElement('input');
    button.value = "Reset";
    button.id = "reset";
    button.type = "button";
    button.setAttribute("onclick", "window.location.reload();");
    myNode.append(button);
  }
}

/** 
 * カウントダウンタイマーを更新、時間切れメッセージを表示
 */
const updateCountdown = () => {
  let countdownEl = document.getElementById('countdown');
  if (seconds > 0) {
    seconds--;
  }
  countdownEl.innerHTML = `0:${seconds}`;
  if (seconds === 0) {
    clearInterval(timer);
    removeFlipCardsEListener();
    removeColorChange();
    // 時間切れ以後0.4秒後に時間切れメッセージを表示
    setTimeout(function () {
      countdownEl.style.width = "160px";
      countdownEl.innerHTML = "Time's up!";
      countdownEl.style.color = "orange";
      displayResetButton();
    }, 400);
  }
}

/** 
 * mouseover/outで色変更のイベントリスナーを削除する
 */
const removeColorChange = () => {
  let cards = document.getElementsByClassName("cards");
  for (let card of cards) {
    card.removeEventListener("mouseover", changeColor);
    card.removeEventListener("mouseout", changeColorBack);
  }
}

/**
 * カードをめくるイベントリスナーを全カードに追加する
 */
const addFlipCardsEventListener = () => {
  let allCards = document.querySelector('#cards-wrapper');
  allCards.addEventListener("click", flipCards);
}

/**
 * カードをめくるイベントリスナーを全カードから削除
 */
const removeFlipCardsEListener = () => {
  let allCards = document.querySelector('#cards-wrapper');
  allCards.removeEventListener("click", flipCards);
}