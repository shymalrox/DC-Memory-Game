let cardArray = [
    { name: "batman", img: "Media/batman.png", },
    { name: "batman", img: "Media/batman.png", },
    { name: "aquaman", img: "Media/aquaman.jpg", },
    { name: "aquaman", img: "Media/aquaman.jpg", },
    { name: "green-lantern", img: "Media/green-lantern.jpg", },
    { name: "green-lantern", img: "Media/green-lantern.jpg", },
    { name: "superman", img: "Media/superman.png", },
    { name: "superman", img: "Media/superman.png", },
    { name: "flash", img: "Media/flash.jpg", },
    { name: "flash", img: "Media/flash.jpg", },
    { name: "wonder-woman", img: "Media/wonder-woman.png", },
    { name: "wonder-woman", img: "Media/wonder-woman.png", },
];

let grid = document.querySelector(".grid");
let scoreBoard = document.querySelector(".scoreBoard");
let popup = document.querySelector(".popup");
let playAgain = document.querySelector(".playAgain");
let clickBoard = document.querySelector(".clickBoard");
let imgs;
let cardsId = [];
let cardsSelected = [];
let cardsWon = 0;
let clicks = 0;

document.addEventListener("DOMContentLoaded", function () {
    createBoard(grid, cardArray);
    arrangeCard();
    playAgain.addEventListener("click", replay);

    imgs = document.querySelectorAll("img");
    Array.from(imgs).forEach(img => 
    img.addEventListener("click", flipCard)
    )
});

function createBoard(grid, array) {
    popup.style.display = "none";
    array.forEach((arr, index) => {
        let img = document.createElement("img");
        img.setAttribute('src', 'Media/dc-comics.jpg');
        img.setAttribute('data-id', index);
        grid.appendChild(img);
    })
}

function arrangeCard() {
    cardArray.sort(() => 0.5 - Math.random())
}

function flipCard() {
    let selected = this.dataset.id;
    cardsSelected.push(cardArray[selected].name);
    cardsId.push(selected);
    this.classList.add("flip");
    this.setAttribute("src", cardArray[selected].img);
    if (cardsId.length === 2) {
        setTimeout(checkForMatch, 500)
    }
}

function checkForMatch() {
    let imgs = document.querySelectorAll('img');
    let firstCard = cardsId[0];
    let secondCard = cardsId[1]; 
    if (cardsSelected[0] === cardsSelected[1] && firstCard !== secondCard) {
        cardsWon += 1;
        scoreBoard.innerHTML = cardsWon;
        setTimeout(checkWon,500)
    } else {
        imgs[firstCard].setAttribute('src', 'Media/dc-comics.jpg')
        imgs[secondCard].setAttribute('src', 'Media/dc-comics.jpg')
    }
    cardsSelected = [];
    cardsId = [];
    clicks += 1;
    clickBoard.innerHTML = clicks;
}

function checkWon() {
    if (cardsWon == cardArray.length / 2) {
        alert("Congratulations! You win!")
        setTimeout(()=> popup.style.display = "flex", 300);
    }
}

function replay() {
    arrangeCard();
    grid.innerHTML = "";
    createBoard(grid, cardArray);
    cardsWon = 0;
    clicks = 0;
    clickBoard.innerHTML = 0;
    scoreBoard.innerHTMl = 0;
    popup.style.display = "none";
}
