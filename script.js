const container = document.getElementById("gameContainer");
const moveCounter = document.getElementById("moveCounter");
const highScore = document.getElementById("highScore")
let cardNums = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9];
let moves = 0;
let best = localStorage.getItem("dtmfhighscore") || null;
let matches = 0;
let selectedCards = [];
let audio = new Audio();
for(let i = 0; i < 20; i++){
    container.innerHTML += "<div></div>";
};
highScore.innerHTML = best ? "Best: " + best : "";
let cards = container.querySelectorAll("div");
cards.forEach(card => {
    let num = Math.floor(Math.random() * (cardNums.length - 1));
    card.dataset.num = cardNums[num];
    cardNums.splice(num, 1);
    card.addEventListener("click", function(){
        if(card.classList.contains("selected") == false && card.classList.contains("matched") == false && selectedCards.length < 2){
            card.classList.add("selected");
            selectedCards[selectedCards.length] = card;
            audio.pause();
            audio = new Audio("Dtmf"+card.dataset.num+".mp3");
            audio.play();
            if(selectedCards.length >= 2){
                setTimeout(function(){
                    moves++;
                    moveCounter.innerHTML = "Moves: " + moves;
                    container.querySelectorAll(".selected").forEach(selectedCard => {
                        selectedCard.classList.remove("selected");
                    });
                    if(selectedCards[0].dataset.num == selectedCards[1].dataset.num){
                        selectedCards[0].classList.add("matched");
                        selectedCards[0].innerHTML = selectedCards[0].dataset.num;
                        selectedCards[1].classList.add("matched");
                        selectedCards[1].innerHTML = selectedCards[1].dataset.num;
                        matches++;
                        if(matches >= 10){
                            moveCounter.innerHTML = "You won in " + moves + " moves!";
                            if(best && moves < best){
                                best = moves;
                                localStorage.setItem("dtmfhighscore", best);
                                highScore.innerHTML = "Best: " + best;
                            }
                        }
                    }
                    selectedCards = [];
                }, 1000);
            }
        }
    });
});
function resetGame(){
    cardNums = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9];
    cards.forEach(card => {
        let num = Math.floor(Math.random() * (cardNums.length - 1));
        card.dataset.num = cardNums[num];
        cardNums.splice(num, 1);
        card.classList.remove("selected");
        card.classList.remove("matched");
        card.innerHTML = "";
        selectedCards = [];
        matches = 0;
        moves = 0;
        moveCounter.innerHTML = "Moves: 0";
    });
}
document.getElementById("reset").addEventListener("click", resetGame);