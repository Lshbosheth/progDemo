var playerTurn, moves, isGameOver, span, restartButton;
playerTurn = 'x';
moves = 0;
isGameOver = false;
span = document.getElementsByTagName("span")
restartButton = '<button onclick="playAgain()"><?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1675826835048" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2430" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" height="30"><path d="M790.912 834.858667A425.002667 425.002667 0 0 1 512 938.666667C276.352 938.666667 85.333333 747.648 85.333333 512S276.352 85.333333 512 85.333333s426.666667 191.018667 426.666667 426.666667c0 91.136-28.586667 175.616-77.226667 244.906667L725.333333 512h128a341.333333 341.333333 0 1 0-104.96 246.272l42.538667 76.586667z" p-id="2431" fill="#ffffff"></path></svg></buutton>'

function play(y) {
    console.log(y.dataset.player)
    if(y.dataset.player == 'none' && window.isGameOver == false) {
        y.innerHTML = playerTurn;
        y.dataset.player = playerTurn;
        moves++;
        if(playerTurn == 'x') {
            playerTurn = 'o';
        }else if(playerTurn == 'o') {
            playerTurn = 'x';
        }
    }
    checkWinner(1, 2, 3)
    checkWinner(4, 5, 6)
    checkWinner(7, 8, 9)
    checkWinner(1, 4, 7)
    checkWinner(2, 5, 8)
    checkWinner(3, 6, 9)
    checkWinner(1, 5, 9)
    checkWinner(3, 5, 7)
    if(moves == 9 && isGameOver == false) {
        draw();
    }
}

function checkWinner(a, b, c) {
    a--;
    b--;
    c--;
    if((span[a].dataset.player === span[b].dataset.player) &&
     (span[b].dataset.player === span[c].dataset.player) &&
      (span[a].dataset.player === span[c].dataset.player) && 
      (span[a].dataset.player === "x" || span[a].dataset.player === 'o') && isGameOver == false) {
        span[a].parentNode.className += " activeBox";
        span[b].parentNode.className += " activeBox";
        span[c].parentNode.className += " activeBox";
        gameOver(a)
    }
}

function playAgain() {
    document.getElementsByClassName("alert")[0].parentNode.removeChild(document.getElementsByClassName("alert")[0]);
    resetGame();
    window.isGameOver = false;
    for(let k = 0;k < span.length; k++) {
        span[k].parentNode.className = span[k].parentNode.className.replace("activeBox", '')
    }
}

function resetGame() {
    for(i = 0;i < span.length; i++) {
        span[i].dataset.player = "none";
        span[i].innerHTML = "&nbsp;"
    }
    playerTurn = "x";
}

function gameOver(a) {
    let gameOverAlertElement = "<b>GAME OVER</b><br><br> Player " + span[a].dataset.player.toUpperCase() + ' Win !!!!<br><br>' + restartButton;
    let div = document.createElement("div")
    div.className = "alert";
    div.innerHTML = gameOverAlertElement;
    document.getElementsByTagName("body")[0].appendChild(div);
    window.isGameOver = true;
    moves = 0;
}

function draw() {
    let drawAlertElement = "<b>DRAW!!</b><br><br> " + restartButton;
    let div = document.createElement("div");
    div.className = "alert";
    div.innerHTML = drawAlertElement;
    document.getElementsByTagName("body")[0].appendChild(div);
    window.isGameOver = true;
    moves = 0
}