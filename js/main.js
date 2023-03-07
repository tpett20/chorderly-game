console.log('JS Running')

/*----- constants -----*/
// The 4 Chord Sounds
// Chord Display/ Sound Duration
// Message Duration

/*----- State (Variables) -----*/
let computerSequence
let playerSequence
let inputIdx
let gameMode = 'normal'
let playerScore
let highScore

/*----- Cached DOM Elements -----*/
const squareEls = document.querySelector('#gameboard')
const buttonEls = document.querySelectorAll('button')
const yourScoreEl = document.querySelector('#your-score')
const highScoreEl = document.querySelector('#high-score')
const promptEl = document.querySelector('#prompt')