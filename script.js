const cards = document.querySelectorAll(" .card "),
    TimeTag = document.querySelector(" .time b"),
    FlipsTag = document.querySelector(" .flips b"),
    ResetBtn = document.querySelector(".details button");

let MaxTime = 20;
let TimeLeft = MaxTime;
let flips = 0;
let MatchedCards = 0;
let DisableDeck = false;
let IsPlaying = false;
let CardOne, CardTwo, timer;

function initTimer() {

    if (TimeLeft <= 0){
        // let YouLost = document.getElementsByClassName(".cards").style.display = "none";
        return clearInterval(timer);
    }
    TimeLeft--;
    TimeTag.innerHTML = TimeLeft;

}

function FlipCard({ target: ClickedCard }) {

    if (!IsPlaying) {
        IsPlaying = true;
        timer = setInterval(initTimer, 1000)
    }

    if (ClickedCard !== CardOne && !DisableDeck && TimeLeft > 0) {
        flips++;
        FlipsTag.innerHTML = flips;
        ClickedCard.classList.add("flip");
        if (!CardOne){
            return CardOne = ClickedCard;
        }
        CardTwo = ClickedCard;
        DisableDeck = true;
        let cardOneIcon = CardOne.querySelector(".back_view i").classList.value;
        let cardTwoIcon = CardTwo.querySelector(".back_view i").classList.value;
        MatchCards(cardOneIcon, cardTwoIcon);
    }

}

function MatchCards(icon1, icon2) {
    if (icon1 === icon2) {
        MatchedCards++;
        if (MatchedCards == 6 && TimeLeft > 0)
        {
            return clearInterval(timer);
        }
        CardOne.removeEventListener("click", FlipCard);
        CardTwo.removeEventListener("click", FlipCard);
        CardOne = CardTwo = "";
        return DisableDeck = false;
    }

    setTimeout(() => {
        CardOne.classList.add("shake");
        CardTwo.classList.add("shake");
    }, 100);

    setTimeout(() => {
        CardOne.classList.remove("shake", "flip");
        CardTwo.classList.remove("shake", "flip");
        CardOne = CardTwo = "";
        DisableDeck = false;
    }, 400);
}

function shuffleCard() {
    TimeLeft = MaxTime;
    flips = MatchedCards = 0;
    CardOne = CardTwo = "";
    clearInterval(timer);
    TimeTag.innerHTML = TimeLeft;
    FlipsTag.innerHTML = flips;
    DisableDeck = IsPlaying = false;

    let arr = ["bxl-meta", "bxl-github", "bxl-instagram", "bxl-visual-studio", "bxl-telegram", "bxl-python"];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);

    cards.forEach((card, index) => {
        card.classList.remove("flip");
        let iconTag = card.querySelector(".backview i");
        setTimeout(() => {
            iconTag.classList.value = 'bx ${arr[index]}';
        }, 500);
        card.addEventListener("click", FlipCard);
    });
}

shuffleCard();

ResetBtn.addEventListener("click", shuffleCard);

cards.forEach(card => {
    card.addEventListener("click", FlipCard)
})

document.addEventListener('contextmenu' , function (event){
    event.preventDefault();
}, false);