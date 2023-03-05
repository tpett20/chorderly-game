# Chorderly
Chorderly is a Simon-style memory game that helps players learn to recognize musical chords and chord progressions by ear. 

"Chordely" is a play on words that reflects the four game buttons each representing a chord in the key of C. One of the most common chord progressions in popular music is the I-V-vi-IV (1-5-6-4), along with other variations on the order. In the key of C, these chords are C Major, G Major, A minor, and F Major, and each one is represented by a game button in Chorderly. 

The game randomly plays a chord and the corresponding game square lights up in color. Then, the player has to repeat it. With each correct answer, the game will add another random chord to the sequence that the player must repeat. 

When a player is ready to fully test their musical ear, they can select the "Play by Ear" option. This removes the color when the game is playing a chord. The player will have to repeat the sequence by relying only on sound. 

# Wireframe
![Wireframe 1](https://i.imgur.com/4QzDQVX.png)
![Wireframe 2](https://i.imgur.com/JwpZCHz.png)
![Wireframe 3](https://i.imgur.com/aFkT1ic.png)
![Wireframe 4](https://i.imgur.com/gN30SA2.png)
![Wireframe 5](https://i.imgur.com/AQjWyjB.png)
![Wireframe 6](https://i.imgur.com/hHxMvuY.png)

# Pseudocode
The following outline will be used to create the game. 

<ins>Constants</ins><br/>
The 4 Chord Sounds<br/>
Chord Display/ Sound Duration<br/>
Message Duration<br/>

<ins>Variables</ins><br/>
Computer Sequence of Chords<br/>
Player Input Sequence<br/>
Input Index<br/>
Game Mode = Normal<br/>
*(setting default Game Mode to Normal in Variables, rather than in the Render Function, so that it doesn't reset during gameplay)*<br/>
Player Score<br/>
High Score<br/>

<ins>Cached DOM Elements</ins><br/>
Game Squares<br/>
Buttons (Start Game and Game Modes)<br/>
Your Score Element<br/>
High Score Element<br/>
Prompt Element<br/>

<ins>Event Response</ins><br/>
Event Listeners<br/>
    - Add Event Listeners to Start Game and Game Mode Buttons<br/>

Handle Game Mode Button Click<br/>
    - Set Game Mode Based on Button ID<br/>

Handle "Start Game" Button Click<br/>
    - Start Computer Turn (see functions below)</br>

Handle Game Square Click<br/>
    - *(Game Square Click Event Listeners are Added by the Start Computer Turn Function)*</br>
    - Use Button ID to Add Corresponding Value to Player Input Sequence<br/>
    - Check If Input is Correct (see functions below)<br/>
    - Play Corresponding Sound for Specified Duration<br/>
    - Remove + Add CSS Classes to Appropriate Game Square to Depict Appropriate Color for Specified Duration<br/>
    - Compare Player and Computer Sequence Length<br/>

<ins>Functions</ins><br/>
Initialize<br/>
    - Your Score = 0<br/>
    - Computer Sequence = []<br/>
    - Player Input Sequence = []<br/>
    - Input Index = 0<br/>
    - Render<br/>

Render<br/>
    - Game Mode<br/>
    - Prompt Element<br/>
    - Squares<br/>
    - Results<br/>

Render Game Mode<br/>
    - If Game Mode = Normal, Normal Button is Displayed with a Check Mark</br>
    - Else, Play by Ear Button is Displayed with a Check Mark<br/>

Render Prompt Element<br/>
    - Remove Text<br/>

Render Squares<br/>
    - Remove + Add CSS Classes to Set Default Square Colors<br/>

Render Results<br/>
    - Add to Your Score if Player Inputs Correct Sequence<br/>
    - Replace High Score if Player Inputs Wrong Sequence After a New High Score<br/>

Start Computer Turn</br>
    - Get Computer Sequence<br/>
    - Play Computer Sequence<br/>
    - Add Event Listeners to Game Squares<br/>

Get Computer Sequence<br/>
    - Add Random Chord Value to Computer Sequence<br/>

Play Computer Sequence<br/>
    - Use For Loop to Iterate Over Computer Sequence Array Length:<br/>
        - Use Computer Sequence Chord Value at Index to Play Appropriate Sound for Specified Duration<br/>
        - If Game Mode = Normal<br/>
            Remove + Add CSS Classes to Corresponding Game Square to Depict Square Being Played for Specified Duration (Synchronous with Sound)<br/>
    - Display Player's Turn Prompt<br/>

Display Player Turn Prompt<br/>
    - Replace Empty Prompt Elements' Text with "YOUR TURN" for Specified Message Duration<br/>

Check If Input is Correct<br/>
    - If Value of Player Sequence at Input Index in NOT Equal to Value of Computer Sequence at Input Index, Game Over<br/>

Game Over<br/>
    - Remove Event Listeners from Game Squares<br/>
    - Display Game Over Message for Specified Message Duration<br/>
    - Render<br/>

Display Game Over Message<br/>
    - Replace Empty Prompt Block Text with "GAME OVER"<br/>
    - Remove + Add CSS Classes to Set Square Colors to Grey<br/>

Compare Player and Computer Sequence Length<br/>
    - If Player Input Sequence DOES NOT Equal Computer Sequence Length:</br>
    - Input Index + 1<br/>
    - If Player Input Sequence Length Equals Computer Sequence Length:<br/>
    - Player Score + 1<br/>
    - Player Input Sequence = []</br>
    - Render<br/>
    - Start Computer Turn<br/>