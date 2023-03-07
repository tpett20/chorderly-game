console.log('JS Running')

/*----- constants -----*/
// The 4 Chord Sounds
// Chord Display/ Sound Duration
// Message Duration

/*----- State (Variables) -----*/
let computerSequence
let playerSequence
let inputIdx
let gameMode = 'Normal Mode'
let playerScore
let highScore = 0

/*----- Cached DOM Elements -----*/
const squareEls = document.querySelector('#game-squares')
const normalModeEl = document.querySelector('#normal')
const playByEarEl = document.querySelector('#play-by-ear')
const startGameEl = document.querySelector('#start-game')
const yourScoreEl = document.querySelector('#your-score')
const highScoreEl = document.querySelector('#high-score')
const promptEl = document.querySelector('#prompt')

/*----- Event Listeners -----*/
// buttonEls.addEventListener('click', handleBtn)
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
    renderResults()
}

function renderGameMode() {
    console.log('Render Game Mode Running')
    if (gameMode === 'Normal Mode') {
        normalModeEl.textContent = `☑︎ ${gameMode}`
        playByEarEl.textContent = `☐ Play By Ear`
    } else {
        normalModeEl.textContent = `☐ Normal Mode`
        playByEarEl.textContent = `☑︎ ${gameMode}`
    }
}

function renderPrompt() {
    console.log('Render Prompt Running')
    promptEl.innerHTML = `<p>Prompt Section</p>`
    promptEl.style.visibility = 'visible' // hidden
}

function renderSquares() {
    const squares = squareEls.querySelectorAll('div')
    squares.forEach(square => {
        square.classList.remove('active')
        square.classList.add('available')
    })
}

function renderResults() {
    yourScoreEl.innerHTML = `<p>Your Score: ${playerScore}</p>`
    highScoreEl.innerHTML = `<p>High Score: ${highScore}</p>`
}

// Handle Game Mode Button Click
// - Set Game Mode Based on Button ID

// Handle "Start Game" Button Click
// - Start Computer Turn (see functions below)

// Handle Game Square Click
// - (Game Square Click Event Listeners are Added by the Start Computer Turn Function)
// - Use Button ID to Add Corresponding Value to Player Input Sequence
// - Check If Input is Correct (see functions below)
// - Play Corresponding Sound for Specified Duration
// - Remove + Add CSS Classes to Appropriate Game Square to Depict Appropriate Color for Specified Duration
// - Compare Player and Computer Sequence Length

// Start Computer Turn
// - Get Computer Sequence
// - Play Computer Sequence
// - Add Event Listeners to Game Squares

// Get Computer Sequence
// - Add Random Chord Value to Computer Sequence

// Play Computer Sequence
// - Iterate Over Computer Sequence Array Length:
// - Use Each Computer Sequence Chord Value to Play Appropriate Sound for Specified Duration
// - If Game Mode = Normal
// Remove + Add CSS Classes to Corresponding Game Square to Depict Square Being Played for Specified Duration (Synchronous with Sound)
// - Display Player's Turn Prompt

// Display Player Turn Prompt
// - Replace Empty Prompt Elements' Text with "YOUR TURN" for Specified Message Duration

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
