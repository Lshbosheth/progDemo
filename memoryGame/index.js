const selectors = {
    boardContainer: document.querySelector(".board-container"),
    board: document.querySelector('.board'),
    moves: document.querySelector('.moves'),
    timer: document.querySelector('.timer'),
    start: document.querySelector('button'),
    win: document.querySelector('.win')
}

const state = {
    gameStarted: false,
    flippedCards: 0,
    totalFlips: 0,
    totalTime: 0,
    loop: null
}

const shuffle = array => {
    const cloneArray = [...array];
    for(let i = cloneArray.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        const original = cloneArray[i];
        cloneArray[i] = cloneArray[randomIndex];
        cloneArray[randomIndex] = original;
    }
    return cloneArray
}

const pickRandom = (array, items) => {
    const cloneArray = [...array];
    const randomPicks = [];

    for(let i = 0; i < items; i++) {
        const randomIndex = Math.floor(Math.random() * cloneArray.length)
        randomPicks.push(cloneArray[randomIndex]);
        cloneArray.splice(randomIndex, 1);
    }
    return randomPicks;
}

const generateGame = () => {
    const dimensions = selectors.board.getAttribute("data-dimension");
    if(dimensions % 2 !== 0) {
        throw new Error("必须是偶数")
    }
    const emojis = ['🍎', '🍒', '🍕', '🍔', '🍧', '🍭', '🥤', '🥝', '🍓', '🌻'];
    const picks = pickRandom(emojis, (dimensions * dimensions) / 2);
    const items = shuffle([...picks, ...picks])
    const cards = `
        <div class="board" style="grid-template-columns: repeat(${dimensions}, auto)">
        ${items.map(item =>`
            <div class="card">
                <div class="card-front"></div>
                <div class="card-back">${item}</div>
            </div>
        `).join('')}
        </div>
    `

    const parser = new DOMParser().parseFromString(cards, 'text/html')
    selectors.board.replaceWith(parser.querySelector('.board'))
}

const startGame = () => {
    state.gameStarted = true;
    selectors.start.classList.add('disabled');
    state.loop = setInterval(() => {
        state.totalTime++;
        selectors.moves.innerText = `${state.totalFlips} Moves`;
        selectors.timer.innerText = `Time: ${state.totalTime} sec`
    }, 1000)
}

const flipBackCards = () => {
    console.log(document.querySelectorAll('.card:not(.matched)'))
    document.querySelectorAll('.card:not(.matched)').forEach(card => {
        card.classList.remove('flipped')
    })
    state.flippedCards = 0;
}

const flipCard = card => {
    state.flippedCards++;
    state.totalFlips++;
    if(!state.gameStarted) {
        startGame()
    }
    if(state.flippedCards <= 2) {
        card.classList.add('flipped')
    }
    console.log(state.flippedCards)
    if(state.flippedCards === 2) {
        const flippedCards = document.querySelectorAll('.flipped:not(.matched)');
        console.log(flippedCards)
        if(flippedCards[0].innerText === flippedCards[1].innerText) {
            flippedCards[0].classList.add('matched');
            flippedCards[1].classList.add('matched');
        }

        setTimeout(() => {
            flipBackCards()
        }, 1000)
    }
    if(!document.querySelectorAll('.card:not(.flipped)').length) {
        setTimeout(() => {
            selectors.boardContainer.classList.add('flipped')
            selectors.win.innerHTML = `
                <span class="win-text">
                    you won!<br/>
                    with <span class="highlight">${state.totalFlips}</span>
                    moves<br/>
                    under <span class="highlight">${state.totalTime}</span>
                    seconds
                </span>
            `
            clearInterval(state.loop)
        }, 1000);
    }
}

const attachEventListeners = () => {
    document.addEventListener('click', event => {
        const eventTarget = event.target;
        const eventParent = eventTarget.parentElement;
        console.log(eventTarget)
        if(eventTarget.className.includes('card') && !eventParent.className.includes('flipped')) {
            flipCard(eventParent)
        }else if(eventTarget.nodeName === 'BUTTON' && !eventTarget.className.includes('disabled')) {
            startGame()
        }
    })
}

generateGame();
attachEventListeners()