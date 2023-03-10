/*----- constants -----*/

const cMajor = document.createElement('audio')
cMajor.src = 'sounds/C-Maj-GP-0.8s.m4a'
cMajor.volume = 0.5
cMajor.preload = 'auto'

const gMajor = document.createElement('audio')
gMajor.src = 'sounds/G-Maj-GP-0.8s.m4a'
gMajor.volume = 0.5
gMajor.preload = 'auto'

const aMinor = document.createElement('audio')
aMinor.src = 'sounds/A-Min-GP-0.8s.m4a'
aMinor.volume = 0.5
aMinor.preload = 'auto'

const fMajor = document.createElement('audio')
fMajor.src = 'sounds/F-Maj-GP-0.8s.m4a'
fMajor.volume = 0.5
fMajor.preload = 'auto'

const uglyChord = document.createElement('audio')
uglyChord.src = 'sounds/Ugly-Chord-GP-1.6s.m4a'
uglyChord.volume = 0.75
uglyChord.preload = 'auto'

const chords = [
    {direction: 'ArrowUp', sound: cMajor},
    {direction: 'ArrowRight', sound: gMajor},
    {direction: 'ArrowLeft', sound: fMajor}, 
    {direction: 'ArrowDown', sound: aMinor}
]

const displayDuration = 900
const bufferDuration = 50
const promptDuration = 1250
const messageDuration = 2000

/*----- State (Variables) -----*/
let computerSequence
let playerSequence
let inputIdx
let gameMode = 'normal'
let playerScore
let highScore = 0

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
    renderScores()
}

function renderGameMode() {
    const normalBtn = gameModeEls.querySelector('#normal')
    const playByEarBtn = gameModeEls.querySelector('#play-by-ear')
    if (gameMode === 'play-by-ear') {
        normalBtn.textContent = `Normal Mode`
        normalBtn.classList.remove('selected')
        playByEarBtn.textContent = `🙈 Play By Ear`
        playByEarBtn.classList.add('selected')
    } else {
        normalBtn.textContent = `🐵 Normal Mode`
        normalBtn.classList.add('selected')
        playByEarBtn.textContent = `Play By Ear`
        playByEarBtn.classList.remove('selected')
    }
}

function renderPrompt() {
    promptEl.innerHTML = `<p>Prompt Section</p>`
    promptEl.style.visibility = 'hidden'
}

function renderScores() {
    yourScoreEl.innerHTML = `<p>Your Score: ${playerScore}</p>`
    highScoreEl.innerHTML = `<p>High Score: ${highScore}</p>`
}

function handleGameMode(evt) {
    if (evt.target.id === 'play-by-ear') {
        gameMode = 'play-by-ear'
    } else if (evt.target.id === 'normal') {
        gameMode = 'normal'
    }
    render()
}

function handleStartGame() {
    removeButtons()
    startGamePrompt()
}

function removeButtons() {
    startGameEl.style.visibility = 'hidden'
    gameModeEls.style.visibility = 'hidden'
}

function startGamePrompt() {
    promptEl.innerHTML = `<p>Get Ready to Repeat Some Chords!</p>`
    promptEl.style.visibility = 'visible'
    setTimeout(() => {
        render()
        runComputerTurn()
    }, messageDuration)
}

function runComputerTurn() {
    removeSquareDisplayListener()
    addToCompSequence()
    playComputerSequence()
    playerTurnPrompt()
    addSquareListeners()
}

function removeSquareDisplayListener() {
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
        if (gameMode === 'normal') {
            setTimeout(() => {
                chords[chordIdx].sound.play()
                highlightSquare(playingSquareEl)
                setTimeout(() => {
                    unhighlightSquare(playingSquareEl)
                }, displayDuration)
            }, (displayDuration + bufferDuration) * sequenceIdx)
        } else {
            setTimeout(() => {
                chords[chordIdx].sound.play()
            }, (displayDuration + bufferDuration) * sequenceIdx)
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
    }, (displayDuration + bufferDuration) * computerSequence.length)
    setTimeout(() => {
        render()
    }, (displayDuration + bufferDuration) * computerSequence.length + messageDuration)
}

function addSquareListeners() {
    setTimeout(() => {
        squareEls.addEventListener('click', handleSquareEffect)
        squareEls.addEventListener('click', handleSquareDisplay)
    }, (displayDuration + bufferDuration) * computerSequence.length + messageDuration)
}

function handleSquareDisplay(evt) {
    let playingSquareDirection
    if (evt.target.tagName === 'SECTION') {
        return
    } else if (evt.target.tagName === 'P') {
        playingSquareDirection = evt.target.parentNode.id
    } else {
        playingSquareDirection = evt.target.id
    }
    const playingSquareEl = squareEls.querySelector(`#${playingSquareDirection}`)
    chords.forEach(chord => {
        if (chord.direction === playingSquareDirection) {
            chord.sound.play()
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
    }, displayDuration)
    setTimeout(() => {
        render()
        runComputerTurn()
    }, displayDuration + messageDuration)
}

function gameOver() {
    checkHighScore()
    playUglyChord()
    removeSquareEffectListener()
    gameOverMessage()
}

function checkHighScore() {
    if (playerScore > highScore) highScore = playerScore
}

function playUglyChord() {
    uglyChord.play()
}

function gameOverMessage() {
    promptEl.innerHTML = `<p>😬 GAME OVER!</p>`
    promptEl.style.visibility = 'visible'
    renderScores()
    setTimeout(() => {
        init()
        addButtons()
    }, messageDuration)
}

function addButtons() {
    startGameEl.style.visibility = 'visible'
    gameModeEls.style.visibility = 'visible'
}