console.log('JS Running')

/*----- constants -----*/

const cMajor = document.createElement('audio')
cMajor.src = 'sounds/C-Maj-GP-0.8s.m4a'
cMajor.volume = 0.5

const gMajor = document.createElement('audio')
gMajor.src = 'sounds/G-Maj-GP-0.8s.m4a'
gMajor.volume = 0.5

const aMinor = document.createElement('audio')
aMinor.src = 'sounds/A-Min-GP-0.8s.m4a'
aMinor.volume = 0.5

const fMajor = document.createElement('audio')
fMajor.src = 'sounds/F-Maj-GP-0.8s.m4a'
fMajor.volume = 0.5

const uglyChord = document.createElement('audio')
uglyChord.src = 'sounds/Ugly-Chord-GP-1.6s.m4a'
uglyChord.volume = 0.75

const chords = [
    {direction: 'ArrowUp', sound: cMajor},
    {direction: 'ArrowRight', sound: gMajor},
    {direction: 'ArrowLeft', sound: fMajor}, 
    {direction: 'ArrowDown', sound: aMinor}
]

displayDuration = 900
messageDuration = 1500

/*----- State (Variables) -----*/
let computerSequence
let playerSequence
let inputIdx
let gameMode = 'Normal Mode'
let playerScore
let highScore = 0
let chordPlay

/*----- Cached DOM Elements -----*/
const squareEls = document.querySelector('#game-board')
const gameModeEls = document.querySelector('#game-modes')
const startGameEl = document.querySelector('#start-game')
const yourScoreEl = document.querySelector('#your-score')
const highScoreEl = document.querySelector('#high-score')
const promptEl = document.querySelector('#prompt')

/*----- Event Listeners -----*/
gameModeEls.addEventListener('click', handleGameMode)
startGameEl.addEventListener('click', handleStartGame)
squareEls.addEventListener('click', handleSquareDisplay)

/*----- Functions -----*/
init()

function init() {
    playerScore = 0
    computerSequence = []
    playerSequence = []
    inputIdx = 0
    render()
}

function render() {
    renderGameMode()
    renderPrompt()
    renderSquares()
    renderScores()
}

function renderGameMode() {
    const normalBtn = gameModeEls.querySelector('#normal')
    const playByEarBtn = gameModeEls.querySelector('#play-by-ear')
    if (gameMode === 'Play By Ear') {
        normalBtn.textContent = `☐ Normal Mode`
        playByEarBtn.textContent = `☑︎ ${gameMode}`
    } else {
        normalBtn.textContent = `☑︎ ${gameMode}`
        playByEarBtn.textContent = `☐ Play By Ear`
    }
}

function renderPrompt() {
    promptEl.innerHTML = `<p>Prompt Section</p>`
    promptEl.style.visibility = 'hidden'
}

function renderSquares() {
    const squares = squareEls.querySelectorAll('.square')
    squares.forEach(square => {
        square.classList.remove('playing')
        square.classList.add('available')
    })
}

function renderScores() {
    yourScoreEl.innerHTML = `<p>Your Score: ${playerScore}</p>`
    highScoreEl.innerHTML = `<p>High Score: ${highScore}</p>`
}

function handleGameMode(evt) {
    if (evt.target.id === 'play-by-ear') {
        gameMode = 'Play By Ear'
    } else if (evt.target.id === 'normal') {
        gameMode = 'Normal Mode'
    }
    render()
}

function handleStartGame() {
    init()
    runComputerTurn()
}

function runComputerTurn() {
    removeSquareListeners()
    addToCompSequence()
    playComputerSequence()
    playerTurnPrompt()
    addSquareListeners()
}

function removeSquareListeners() {
    squareEls.removeEventListener('click', handleSquareDisplay)
}

function addToCompSequence() {
    let chordIdx = Math.floor(Math.random() * 4)
    computerSequence.push(chordIdx)
}

function playComputerSequence() {
    computerSequence.forEach((chordIdx, sequenceIdx) => {
        const playingSquareDirection = chords[chordIdx].direction
        const playingSquareEl = squareEls.querySelector(`#${playingSquareDirection}`)
        if (gameMode === 'Normal Mode') {
            setTimeout(() => {
                chords[chordIdx].sound.play()
                highlightSquare(playingSquareEl)
                setTimeout(() => {
                    unhighlightSquare(playingSquareEl)
                }, displayDuration)
            }, 1000 * sequenceIdx)
        } else {
            setTimeout(() => {
                chords[chordIdx].sound.play()
            }, 1000 * sequenceIdx)
        }
    })
}

function highlightSquare(playingSquareEl) {
    playingSquareEl.classList.add('playing')
}

function unhighlightSquare(playingSquareEl) {
    playingSquareEl.classList.remove('playing')
}

function playerTurnPrompt() {
    setTimeout(() => {
        promptEl.innerHTML = `<p>Your Turn!</p>`
        promptEl.style.visibility = 'visible'
    }, 1000 * computerSequence.length)
    setTimeout(() => {
        render()
    }, 1000 * computerSequence.length + messageDuration)
}

function addSquareListeners() {
    setTimeout(() => {
        squareEls.addEventListener('click', handleSquareEffect)
        squareEls.addEventListener('click', handleSquareDisplay)
    }, 1000 * computerSequence.length + messageDuration)
}

function handleSquareDisplay(evt) {
    let playingSquareDirection
    console.dir(evt.target)
    if (evt.target.tagName === 'SECTION' || evt.target.id === 'prompt') {
        return
    } else if (evt.target.tagName === 'P') {
        playingSquareDirection = evt.target.parentNode.id
    } else {
        playingSquareDirection = evt.target.id
    }
    const playingSquareEl = squareEls.querySelector(`#${playingSquareDirection}`)
    chords.forEach(chord => {
        if (chord.direction === playingSquareDirection) {
            chordPlay = setTimeout(() => {chord.sound.play()}, 10)
        }
    })
    highlightSquare(playingSquareEl)
    setTimeout(() => {
        unhighlightSquare(playingSquareEl)
    }, displayDuration)
}

function handleSquareEffect(evt) {
    addToPlayerSequence(evt)
    checkPlayerInput()
}

function addToPlayerSequence(evt) {
    let playingSquareDirection
    if (evt.target.tagName === 'SECTION') {
        return
    } else if (evt.target.tagName === 'P') {
        playingSquareDirection = evt.target.parentNode.id
    } else {
        playingSquareDirection = evt.target.id
    }
    chords.forEach(chord => {
        if (chord.direction === playingSquareDirection) {
            const chordIdx = chords.indexOf(chord)
            playerSequence.push(chordIdx)
        }
    })
}

function checkPlayerInput() {
    if (playerSequence[inputIdx] === computerSequence[inputIdx]) {
        compareSequenceLengths()
    } else gameOver()
}

function compareSequenceLengths() {
    if (playerSequence.length !== computerSequence.length) {
        inputIdx += 1
    } else {
        playerScore ++
        playerSequence = []
        inputIdx = 0
        removeSquareEffectListener()
        computerTurnPrompt()
    }
}

function removeSquareEffectListener() {
    squareEls.removeEventListener('click', handleSquareEffect)
}

function computerTurnPrompt() {
    setTimeout(() => {
        promptEl.innerHTML = `<p>👏 Listen Up Again!</p>`
        promptEl.style.visibility = 'visible'
        renderScores()
    }, messageDuration / 2)
    setTimeout(() => {
        render()
        runComputerTurn()
    }, messageDuration * 2)
}

function gameOver() {
    if (playerScore > highScore) highScore = playerScore
    replaceChordSound()
    removeSquareEffectListener()
    gameOverMessage()
}

function replaceChordSound() {
    clearTimeout(chordPlay)
    uglyChord.play()
}

function gameOverMessage() {
    promptEl.innerHTML = `<p>😬 GAME OVER!</p>`
    promptEl.style.visibility = 'visible'
    renderScores()
    setTimeout(() => {
        init()
    }, messageDuration * 2)
}