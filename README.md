# Chorderly
Chorderly is a Simon-style memory game that helps players learn to recognize musical chords and chord progressions by ear. 

"Chordely" is a play on words that reflects the four game buttons each representing a chord in the key of C. One of the most common chord progressions in popular music is the I-V-vi-IV (1-5-6-4), along with other variations of the sequence. In the key of C, these chords would be C Major, G Major, A minor, and F Major, and each one is represented by a game button in Chorderly. 

The game will randomly play a chord and then the player has to repeat it. With each correct answer, the game will add another random chord to the sequence that the player has to repeat.  

When a player is ready to fully test their musical ear, they can select the "Play by Ear" option. This removes the color from the buttons when the game plays chords. The player will have to repeat the sequence using only the sounds of the chords. 

![](https://imgur.com/4QzDQVX)

# Pseudocode
The following outline will be used to create the game. 

<ins>Constants</ins><br/>
The 4 Chord Sounds<br/>
Chord Sound Duration<br/>
Message Duration<br/>

<ins>Variables</ins>
Computer Sequence of Random Chords
Player Input Sequence
Input Index
Game Mode = Normal
(setting default Game Mode to Normal in Variables, rather than in the Render Function so that it doesn't reset during gameplay)
Player Score
High Score

<ins>Cached DOM Elements</ins>
Game Squares
Buttons (Start Game and Game Modes)
Your Score Element
High Score Element
Prompt Element

<ins>Event Response</ins>
Event Listeners
    Add Event Listeners to Start Game and Game Mode Buttons

Handle Game Mode Button Click
    Set Game Mode Based on Button ID

Handle "Start Game" Button Click
    Get Computer Sequence
    Play Computer Sequence
    Add Event Listeners to Game Squares

Handle Game Square Click
    Use Button ID to Add Corresponding Value to Player Input Sequence
    Check If Input is Correct (function below)
    Play Corresponding Sound for Specified Duration
    Remove + Add CSS Classes to Appropriate Game Square to Depict Appropriate Colors for Specified Duration
    Input Index + 1

<ins>Functions</ins>
Initialize
    Your Score = 0
    Computer Sequence = []
    Player Input Sequence = []
    Input Index = 0
    Render

Render
    Game Mode
    Prompt Element
    Squares
    Results

Render Game Mode
    If Game Mode = Normal, Normal Button is Displayed with a Check Mark
    else, Play by Ear Button is Displayed with a Check Mark

Render Prompt Element
    Remove Text

Render Squares
    Remove + Add CSS Classes to Set Square Colors

Render Results
    
    Add to Your Score if Player Inputs Correct Sequence
    Replace High Score if Player Inputs Wrong Sequence After a New High Score

Get Computer Sequence
    Add Random Chord Value to Computer Sequence

Play Computer Sequence
    Use For Loop to Iterate Over Computer Sequence Array Length:
        Use Computer Sequence Chord Value at Index to Play Appropriate Sound for Specified Duration
        If Game Mode = Normal
            Remove + Add CSS Classes to Corresponding Game Square to Depict Square Being Played for Specified Duration (Synchronous with Sound)
    Display Player's Turn Prompt

Display Player Turn Prompt
    Replace Empty Prompt Elements' Text with "YOUR TURN" for Specified Message Duration

Check If Input is Correct
    If Value of Player Sequence at Input Index in NOT Equal to Value of Computer Sequence at Input Index, Stop Play

Stop Play 
    Remove Event Listeners from Game Squares
    Display Game Over Message for Specified Message Duration
    Render

Display Game Over Message
    Replace Empty Prompt Block Text with "GAME OVER"
    Remove + Add CSS Classes to Set Square Colors to Grey






