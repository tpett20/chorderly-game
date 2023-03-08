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

/*----- Cached DOM Elements -----*/
const squareEls = document.querySelector('#game-squares')
const gameModeEls = document.querySelector('#game-modes')
const startGameEl = document.querySelector('#start-game')
const yourScoreEl = document.querySelector('#your-score')
const highScoreEl = document.querySelector('#high-score')
const promptEl = document.querySelector('#prompt')

/*----- Event Listeners -----*/
gameModeEls.addEventListener('click', handleGameMode)
startGameEl.addEventListener('click', handleStartGame)
// squareEls.addEventListener('click', handleSquare)

/*----- Functions -----*/
init()

function init() {
    console.log('Initialize Function Running')
    playerScore = 0
    computerSequence = []
    playerSequence = []
    inputIdx = 0
    render()
}

function render() {
    console.log('Render Function Running')
    renderGameMode()
    renderPrompt()
    renderSquares()
    renderScores()
}

function renderGameMode() {
    console.log('Render Game Mode Running')
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
    console.log('Render Prompt Running')
    promptEl.innerHTML = `<p>Prompt Section</p>`
    promptEl.style.visibility = 'hidden'
}

function renderSquares() {
    const squares = squareEls.querySelectorAll('div')
    squares.forEach(square => {
        square.classList.remove('playing')
        // square.classList.remove('active')
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
    startComputerTurn()
}

function startComputerTurn() {
    removeSquareListeners()
    addToCompSequence()
    playComputerSequence()
    addSquareListeners()
    playerTurnPrompt()
}

function removeSquareListeners() {
    cMajor.play()
    console.dir(cMajor)
    // squareEls.removeEventListener('click', handleSquare)
}

function addToCompSequence() {
    let chordIdx = Math.floor(Math.random() * 4)
    computerSequence.push(chordIdx)
}

function playComputerSequence() {
    computerSequence.forEach((chordIdx, sequenceIdx) => {
        const playingSquareDirection = chords[chordIdx].direction
        const playingSquareEl = squareEls.querySelector(`#${playingSquareDirection}`)
        setTimeout(() => {
            highlightSquare(playingSquareEl)
            chords[chordIdx].sound.play()
            console.log(chordIdx, chords[chordIdx].sound.currentTime)
            setTimeout(() => {
                unhighlightSquare(playingSquareEl)
            }, displayDuration)
        }, 1000 * sequenceIdx)
    })
}

function highlightSquare(playingSquareEl) {
    playingSquareEl.classList.add('playing')
    console.log(playingSquareEl)

}

function unhighlightSquare(playingSquareEl) {
    playingSquareEl.classList.remove('playing')
    console.log(playingSquareEl)
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

// Play Computer Sequence
// - Iterate Over Computer Sequence Array Length:
// - Use Each Computer Sequence Chord Value to Play Appropriate Sound for Specified Duration
// - If Game Mode = Normal
// Remove + Add CSS Classes to Corresponding Game Square to Depict Square Being Played for Specified Duration (Synchronous with Sound)

function addSquareListeners() {
    // squareEls.addEventListener('click', handleSquare)
}

// Handle Game Square Click
// - (Game Square Click Event Listeners are Added by the Start Computer Turn Function)
// - Use Button ID to Add Corresponding Value to Player Input Sequence
// - Check If Input is Correct (see functions below)
// - Play Corresponding Sound for Specified Duration
// - Remove + Add CSS Classes to Appropriate Game Square to Depict Appropriate Color for Specified Duration
// - Compare Player and Computer Sequence Length



// Check If Input is Correct
// - If Value of Player Sequence at Input Index in NOT Equal to Value of Computer Sequence at Input Index, Game Over

// Game Over
// - Replace High Score if Player Score is Higher - Remove Event Listeners from Game Squares
// - Display Game Over Message for Specified Message Duration
// - Render

// Display Game Over Message
// - Replace Empty Prompt Block Text with "GAME OVER"
// - Remove + Add CSS Classes to Set Square Colors to Grey

// Compare Player and Computer Sequence Length
// - If Player Input Sequence DOES NOT Equal Computer Sequence Length:
// - Input Index + 1
// - If Player Input Sequence Length Equals Computer Sequence Length:
// - Player Score + 1
// - Player Input Sequence = []
// - Render
// - Start Computer Turn
