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
let playerTurn

/*----- Cached DOM Elements -----*/
const gameBoardEl = document.querySelector('#game-board')
const gameModeEls = document.querySelector('#game-modes')
const startGameEl = document.querySelector('#start-game')
const yourScoreEl = document.querySelector('#your-score')
const highScoreEl = document.querySelector('#high-score')
const promptEl = document.querySelector('#prompt')

/*----- Event Listeners -----*/
document.body.addEventListener('keydown', buttonsKeyBehavior)
document.body.addEventListener('keydown', squareKeyBehavior)
gameModeEls.addEventListener('click', handleGameMode)
startGameEl.addEventListener('click', handleStartGame)
gameBoardEl.addEventListener('click', handleSquarePlay)

/*----- Functions -----*/
init()

function init() {
    playerScore = 0
    computerSequence = []
    playerSequence = []
    inputIdx = 0
    playerTurn = false
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

function buttonsKeyBehavior(evt) {
    if (evt.code === 'KeyN' || evt.code === 'KeyP') {
        handleGameMode(evt)
    }
    else if (evt.code === 'Space') {
        handleStartGame()
    }
}
    
function squareKeyBehavior(evt) {
    if (evt.code === 'ArrowUp' || evt.code === 'ArrowDown' ||
        evt.code === 'ArrowLeft' || evt.code === 'ArrowRight') {
        handleSquarePlay(evt)
    } 
}

function handleGameMode(evt) {
    if (evt.code) {
        if (evt.code === 'KeyN') {
            gameMode = 'normal'
        }
        else if (evt.code === 'KeyP') {
            gameMode = 'play-by-ear'
        }
    }
    else if (evt.target.id === 'normal') {
        gameMode = 'normal'
    }
    else if (evt.target.id === 'play-by-ear') {
        gameMode = 'play-by-ear'
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
    removeAllEventListeners()
    addToCompSequence()
    playComputerSequence()
    playerTurnPrompt()
}

function removeAllEventListeners() {
    document.body.removeEventListener('keydown', buttonsKeyBehavior)
    gameModeEls.removeEventListener('click', handleGameMode)
    startGameEl.removeEventListener('click', handleStartGame)
    document.body.removeEventListener('keydown', squareKeyBehavior)
    gameBoardEl.removeEventListener('click', handleSquarePlay)
}

function addToCompSequence() {
    let chordIdx = Math.floor(Math.random() * 4)
    computerSequence.push(chordIdx)
}

function playComputerSequence() {
    computerSequence.forEach((chordIdx, sequenceIdx) => {
        const playingSquareDirection = chords[chordIdx].direction
        const playingSquareEl = gameBoardEl.querySelector(`#${playingSquareDirection}`)
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
        playerTurn = true
        render()
        addSquareEventListeners()
    }, (displayDuration + bufferDuration) * computerSequence.length + messageDuration)
}

function addSquareEventListeners() {
    document.body.addEventListener('keydown', squareKeyBehavior)
    gameBoardEl.addEventListener('click', handleSquarePlay)
}

// function squareEffectKeyBehavior(evt) {
//     if (evt.code === 'ArrowUp' || evt.code === 'ArrowDown' ||
//         evt.code === 'ArrowLeft' || evt.code === 'ArrowRight') {
//         handleSquareEffect(evt)
//     }
// }

function handleSquarePlay(evt) {
    let playingSquareDirection
    if (evt.code) {
        playingSquareDirection = evt.code
    }
    else if (evt.target.tagName === 'SECTION') {
        return
    } else if (evt.target.tagName === 'P') {
        playingSquareDirection = evt.target.parentNode.id
    } else {
        playingSquareDirection = evt.target.id
    }
    const playingSquareEl = gameBoardEl.querySelector(`#${playingSquareDirection}`)
    chords.forEach(chord => {
        if (chord.direction === playingSquareDirection) {
            chord.sound.play()
        }
    })
    highlightSquare(playingSquareEl)
    if (playerTurn === true) {
        addToPlayerSequence(playingSquareDirection)
        checkPlayerInput()
    }
    setTimeout(() => {
        unhighlightSquare(playingSquareEl)
    }, displayDuration)
}

// function removeSquareDisplayEventListener() {
//     document.body.removeEventListener('keydown', squareDisplayKeyBehavior)
//     squareEls.removeEventListener('click', handleSquareDisplay)
// }

// function addSquareDisplayEventListener() {
//     document.body.addEventListener('keydown', squareDisplayKeyBehavior)
//     squareEls.addEventListener('click', handleSquareDisplay)
// }

// function handleSquareEffect(evt) {
//     addToPlayerSequence(evt)
//     checkPlayerInput()
// }

// function addSquareEffectEventListener() {
//     console.log('squareEffect added')
//     document.body.addEventListener('keydown', squareEffectKeyBehavior)
//     squareEls.addEventListener('click', handleSquareEffect)
// }

function addToPlayerSequence(playingSquareDirection) {
    // let playingSquareDirection
    // if (evt.code) {
    //     playingSquareDirection = evt.code
    // }
    // else if (evt.target.tagName === 'SECTION') {
    //     return
    // } else if (evt.target.tagName === 'P') {
    //     playingSquareDirection = evt.target.parentNode.id
    // } else {
    //     playingSquareDirection = evt.target.id
    // }
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
        playerTurn = false
        computerTurnPrompt()
    }
}

function computerTurnPrompt() {
    setTimeout(() => {
        promptEl.innerHTML = `<p>👏 Listen Up Again!</p>`
        promptEl.style.visibility = 'visible'
        renderScores()
        // removeSquareDisplayEventListener()
        // removeSquareEffectEventListener()
    }, displayDuration)
    setTimeout(() => {
        render()
        runComputerTurn()
    }, displayDuration + messageDuration)
}

function gameOver() {
    playerTurn = false
    checkHighScore()
    playUglyChord()
    // removeSquareEffectEventListener()
    gameOverMessage()
}

function checkHighScore() {
    if (playerScore > highScore) highScore = playerScore
}

function playUglyChord() {
    uglyChord.play()
}

// function removeSquareEffectEventListener() {
//     document.body.removeEventListener('keydown', squareEffectKeyBehavior)
//     squareEls.removeEventListener('click', handleSquareEffect)
// }

function gameOverMessage() {
    promptEl.innerHTML = `<p>😬 GAME OVER!</p>`
    promptEl.style.visibility = 'visible'
    renderScores()
    setTimeout(() => {
        init()
        addButtons()
        addButtonEventListeners()
    }, messageDuration)
}

function addButtons() {
    startGameEl.style.visibility = 'visible'
    gameModeEls.style.visibility = 'visible'
}

function addButtonEventListeners() {
    document.body.addEventListener('keydown', buttonsKeyBehavior)
    gameModeEls.addEventListener('click', handleGameMode)
    startGameEl.addEventListener('click', handleStartGame)
}