Game: Simon (with a musical focus in which each game square is a chord in the key of C Major)

Wireframe: ![Wireframe 1](https://i.imgur.com/4QzDQVX.png)

Basic Pseudocode: 

<ins>Constants</ins><br/>
- The 4 Chord Sounds<br/>
- Duration of Chord Display/ Sound<br/>
- Message Duration<br/>

<ins>State (Variables)</ins><br/>
- Computer Sequence of Chords<br/>
- Player Input Sequence<br/>
- Input Index<br/>
- Game Mode<br/>
- Player Score<br/>
- High Score<br/>

<ins>Cached DOM Elements</ins><br/>
- Game Squares<br/>
- Buttons (Start Game and Game Modes)<br/>
- Your Score Element<br/>
- High Score Element<br/>
- Prompt Element<br/>

<ins>Basic MVP Game Loop</ins><br/>
After "Start Game" is clicked, a random chord will be added to the computer's sequence of chords. Then function calls will initiate an appropriate sound and color the corresponding square. In later rounds of gameplay, function calls will run for each value in the computer's sequence array. 

During the player's turn, the correct game squares must be clicked in the same order as the computer's sequence. After each click, function calls will play the appropriate sound and display the appropriate color. A corresponding value will also be added to the player's sequence array, and a function will check whether the click was correct. This will stop once the lengths of the computer and player's arrays match or the player makes an incorrect guess. An incorrect guess would lead to the game being over. A correct sequence, will call a function to start the computer's turn. 

Synchronous and asynchronous function timing will also be part of the gameplay to determine how long the sounds play and square colors display.