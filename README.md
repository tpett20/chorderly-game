# chorderly-game
Chorderly is a Simon-style memory game that helps players learn to recognize musical chords and chord progressions by ear. 

"Chordely" is a play on words that reflects the four game buttons each representing a chord in the key of C. One of the most common chord progressions in popular music is the I-V-vi-IV (1-5-6-4), along with other variations of the sequence. In the key of C, these chords would be C Major, G Major, A minor, and F Major, and each one is represented by a game button in Chorderly. 

The game will randomly play a chord and then the player has to repeat it. With each correct answer, the game will add another random chord to the sequence that the player has to repeat.  

When a player is ready to fully test their musical ear, they can select the "Play by Ear" option. This removes the color from the buttons when the game plays chords. The player will have to repeat the sequence using only the sounds of the chords. 

![](https://imgur.com/4QzDQVX)

# Pseudocode
The following outline will be used to create the game. 

<ins>Constants</ins>
The 4 Chord Sounds
Chord Sound Duration

<ins>Variables</ins>
Random Computer Sequence of Chords
Player Input Sequence
Game Mode (Normal or Play by Ear)
Your Score
High Score

<ins>Cached DOM Elements</ins>
Squares within Board
Buttons (Start Game and Game Modes)
Your Score Element
High Score Element

<ins>Event Response</ins>
Event Listeners
    Add Event Listeners to Start Game and Game Mode Buttons

Handle Game Mode Button Click

Handle Start Game Button Click
    Get Computer Sequence
    Play Computer Sequence
    Add Event Listeners to Game Squares

Handle Game Square Click
    Use Button ID to: 
        Play corresponding sound for specified duration
        Change CSS classes to depict appropriate colors for specified duration
        Add corresponding value to Player Input Sequence
        Stop play if incorrect input


<ins>Functions</ins>
Initialize
    Your Score = 0
    High Score = 0
    Game Mode = Normal
    Computer Sequence = []
    Render

Render
    Squares
    Results

Render Squares
    Remove + Add CSS Classes to Set Square Colors

Render Results
    
    Add to Your Score if Player Inputs Correct Sequence
    Replace High Score if Player Inputs Wrong Sequence After a New High Score

Get Computer Sequence
    Add Random Chord to Computer Sequence

Play Computer Sequence
    Use Random Chord Sequence to Determine Sound to Play for Specified Duration
    If Game Mode = Normal
        For Specified Duration, Remove + Add CSS Classes to Corresponding Game Square to Depict Square is Being Played
    (Finish with some type of prompt to indicate player's turn to repeat sequence)







