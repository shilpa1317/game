const emojis = ['🍕','🍕','🐱','🐱','🎉','🎉','⚽','⚽','🚗','🚗','🎲','🎲','❤','❤','☀','☀'];
let shuffled = emojis.sort(() => 0.5 - Math.random());

const board = document.getElementById('gameBoard');
let firstCard, secondCard;
let lockBoard = false;
let matchedPairs = 0;

shuffled.forEach((emoji, index) => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.emoji = emoji;
  card.innerText = '';
  card.addEventListener('click', flipCard);
  board.appendChild(card);
});

function flipCard() {
  if (lockBoard || this === firstCard) return;

  this.classList.add('flipped');
  this.innerText = this.dataset.emoji;

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  lockBoard = true;
  if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
    matchedPairs++;
    resetCards();
    if (matchedPairs === 8) {
      document.getElementById('status').innerText = 'You Win!';
    }
  } else {
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      firstCard.innerText = '';
      secondCard.innerText = '';
      resetCards();
    }, 1000);
  }
}

function resetCards() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}