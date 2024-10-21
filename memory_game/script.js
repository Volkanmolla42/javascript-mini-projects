const cardArray = [{

        name: 'fries',
        img: 'images/fries.png'
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png'
    },
    {
        name: 'iceCream',
        img: 'images/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza.png'
    },
    {
        name: 'fries',
        img: 'images/fries.png'
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png'
    },
    {
        name: 'iceCream',
        img: 'images/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza.png'
    }
]

cardArray.sort(() => 0.5 - Math.random());

const gridDisplay = document.querySelector('#grid');
let cardChosen = [];
let cardChosenIds = [];
const cardsWon = [];
let displayResult = document.querySelector('#result');
let clickLocked = false; // Tıklamayı kilitleme değişkeni

function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img')
        card.setAttribute('src', 'images/blank.png')
        card.setAttribute('data-id', i)
        card.addEventListener('click', flipCard);
        gridDisplay.appendChild(card);
    }
}
createBoard();

function checkMatch() {
    const cards = document.querySelectorAll('#grid img')

    if (cardChosen[0] == cardChosen[1]) {
        cards[cardChosenIds[0]].setAttribute('src', 'images/white.png')
        cards[cardChosenIds[1]].setAttribute('src', 'images/white.png')
        cards[cardChosenIds[0]].removeEventListener('click', flipCard);
        cards[cardChosenIds[1]].removeEventListener('click', flipCard);
        cardsWon.push(cardChosen)
    } else {

        cards[cardChosenIds[0]].setAttribute('src', 'images/blank.png')
        cards[cardChosenIds[1]].setAttribute('src', 'images/blank.png')
    }
    displayResult.textContent = cardsWon.length;

    if (cardsWon.length == cardArray.length / 2) {
        displayResult.innerHTML = 'god job!';
    }
    cardChosen = [];
    cardChosenIds = [];
    clickLocked = false; // Eşleştirme kontrolünden sonra kilidi aç
}

function flipCard() {
    if (clickLocked || cardChosen.length === 2) {
        return; // Tıklamayı engelle
    }
    const cardId = this.getAttribute('data-id');
    cardChosen.push(cardArray[cardId].name);
    cardChosenIds.push(cardId);
    this.setAttribute('src', cardArray[cardId].img);

    if (cardChosen.length === 2) {
        clickLocked = true; // İki kart seçildiğinde tıklamayı kitle
        setTimeout(checkMatch, 1000);
    }
}