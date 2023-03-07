# Pseudocode
The following outline will be used to create the game. 

<ins>Constants</ins><br/>
The 4 Chord Sounds<br/>
Chord Display/ Sound Duration<br/>
Message Duration<br/>

<ins>State (Variables)</ins><br/>
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
    - Player Score = 0<br/>
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
    - Set Your Score to Match Player Score Variable<br/>
    - Set High Score to Match High Score Variable<br/>

Start Computer Turn</br>
    - Get Computer Sequence<br/>
    - Play Computer Sequence<br/>
    - Add Event Listeners to Game Squares<br/>

Get Computer Sequence<br/>
    - Add Random Chord Value to Computer Sequence<br/>

Play Computer Sequence<br/>
    - Iterate Over Computer Sequence Array Length:<br/>
        - Use Each Computer Sequence Chord Value to Play Appropriate Sound for Specified Duration<br/>
        - If Game Mode = Normal<br/>
            Remove + Add CSS Classes to Corresponding Game Square to Depict Square Being Played for Specified Duration (Synchronous with Sound)<br/>
    - Display Player's Turn Prompt<br/>

Display Player Turn Prompt<br/>
    - Replace Empty Prompt Elements' Text with "YOUR TURN" for Specified Message Duration<br/>

Check If Input is Correct<br/>
    - If Value of Player Sequence at Input Index in NOT Equal to Value of Computer Sequence at Input Index, Game Over<br/>

Game Over<br/>
    - Replace High Score if Player Score is Higher
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