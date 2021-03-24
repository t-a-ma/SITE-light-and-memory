# Pre-work - *Memory Game*

**Memory Game** is a Light & Sound Memory game to apply for CodePath's SITE Program. 

Submitted by: Tina

Time spent: 9 hours spent in total

Link to project: (insert your link here, should start with https://glitch.com...)

## Required Functionality
**NOTE** Sometimes the sounds do not play on the first run of the program,
I think it relates to a chrome update that affects when the Audio Content 
is played? I tried to figure it out but I couldn't seem to fix it;
just refresh the web app once or twice and the sound whould start working.

The following **required** functionality is complete:

* [x] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
* [x] "Start" button toggles between "Start" and "Stop" when clicked. 
* [x] Game buttons each light up and play a sound when clicked. 
* [x] Computer plays back sequence of clues including sound and visual cue for each button
* [x] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess. 
* [x] User wins the game after guessing a complete pattern
* [x] User loses the game after an incorrect guess

The following **optional** features are implemented:

* [x] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
* [x] Buttons use a pitch (frequency) other than the ones in the tutorial
* [x] More than 4 functional game buttons
* [x] Playback speeds up on each turn
* [x] Computer picks a different pattern each time the game is played 
* [x] Player only loses after 3 mistakes (instead of on the first mistake)
* [ ] Game button appearance change goes beyond color (e.g. add an image)
* [ ] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
* [ ] User has a limited amount of time to enter their guess on each turn

The following **additional** features are implemented:

- [ ] List anything else that you can get done to improve the app!
- [x] added Easy vs Hard mode
    - Easy mode = preset familiar melody; Playback speeds up more slowly than hard mode
    - Hard mode = randomly generated melody of varying length
    - Added buttons to choose between these two modes
- [x] Added color to the start and stop buttons
- [x] Never gonna give you up 
- [x] Never gonna let you down 
- [x] Never gonna run around and desert you

## Video Walkthrough

Here's a walkthrough of implemented user stories:
Basic game functionality:

Basic mechanies + winning
![Basic game mechanics + winning the game](https://github.com/t-a-ma/SITE-light-and-memory-game-demo/blob/main/make_sound.gif)

Losing:
![Losing the game](https://github.com/t-a-ma/SITE-light-and-memory-game-demo/blob/main/mistake.gif)

Stopping halfway throug
![Stopping the game halfway through](https://github.com/t-a-ma/SITE-light-and-memory-game-demo/blob/main/stop_halfway.gif)


Updated version functionality
All notes:
![All Notes working] (https://github.com/t-a-ma/SITE-light-and-memory-game-demo/blob/main/all_notes.gif)

Mode buttons:
![Demonstrating mode buttons] (https://github.com/t-a-ma/SITE-light-and-memory-game-demo/blob/main/updated_mode_buttons.gif)

playback speeds up each turn
![Predetermined melody + playback speeds up each turn] (https://github.com/t-a-ma/SITE-light-and-memory-game-demo/blob/main/updated_playback_speed_increases.gif)

Random melody
![Random melody] (https://github.com/t-a-ma/SITE-light-and-memory-game-demo/blob/main/update_random_melodies.gif)

3 Mistakes before losing
![3 mistakes before losing] (https://github.com/t-a-ma/SITE-light-and-memory-game-demo/blob/main/updated_3_mistakes.gif)


## Reflection Questions
1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here. 
  I used a lot of stack overflow for help. This included looking up how to change the background color of 
  an element on a button click, and changing text to reflect changing of a variable value.
  I used https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/ for 
  help on how to assign a variable to an array. This is where I got the .splice function. I also 
  used the getRandomInt function that they detailed on the Math.random page of the site to help me generate random melodies. 
  I used https://html-color.codes/ to get the hexadecimal values of the colors. 

2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words) 
One challenge I encountered was when giving the pattern the ability to either be randomly generated or predetermined. Because I wanted to change as little code as possible, I wanted to keep using the existing pattern variable. I also wanted to give the user the ability to choose between getting a randomized melody or a predetermined melody through choosing either easy or hard mode. Therefore, the pattern would need to be set during runtime. I initiated the pattern variable to be equal to a new array to avoid an uninitialized variable warning. 
I knew that I wanted to store the predetermined patterns in an array of arrays called patterns, and that I wanted to randomly choose which predetermined pattern would be played., and used this function to get an index, which then allowed me to get the pattern. However, this is where the trouble started. I wanted the pattern variable to kind of act as a pointer to one of the elements in the patterns array. I thought this could be achieved by simply setting pattern = patterns[randIndex]. However, this didn’t work; pattern would sometimes have a value as undefined. It took a bit of time to figure out this problem because it only appeared when the game was in easy mode; I kept switching from easy to hard mode, thinking I had made a mistake in the declaration of the pattern variable in general. After I determined hard mode was working, I realized that the simple equality operator didn’t work the way I thought it would and I would have to find another way. So I turned to the internet to find a solution. I had some trouble with what keywords to use while searching since I keep using the phrase “variable pointing to an array”, so I decided to look at the documentation for an array instead, which I found on the developer.mozilla website. This is where I found the .splice() function, which created a copy of an array and solved my problem! Essentially,  debugging by looking at the code around the line throwing the error helped with determining what was wrong, and looking at the documentation taught me more than just looking up the specific problem on stack overflow.

3. What questions about web development do you have after completing your submission? (recommended 100 - 300 words) 
I'm pretty sure, from my knowledge, that this web app game only dealt with the front-end part of a web app. I'm really curious about what the back-end part of web development looks like from a developer’s point of view - I’m aware that it deals with storing and retrieving information from databases. I do have a little bit of experience with databases from the learn SQL course that I took on CodeAcademy. However, I’d really like to know how the front end and the backend connect - how the information gathered from the database is properly displayed on the screen, how the information input by the user is parsed and stored, etc. 
	Another thing I’m curious about is how web apps are tested and/or evaluated during their building phase.  For this project, the testing I did was mainly on the functionality - did the button change color and play the tone it's assigned to, did the start and stop buttons appear and disappear when needed and had the wanted effects, did the playback speed increase without becoming impossibly fast and breaking, etc. However, I’m aware there are many more factors that must be taken into account, such as color palette, usability, as well as some cybersecurity issues that have to be addressed. I’m curious to see what the testing phase of a web app going out to the public looks like.
  

4. If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words) 
One thing I'd like to do is figure out how to refactor the CSS styling needed for the buttons. I feel like there was a lot of repeated code with the difference just being which button and which color the button was,  and I'm really curious about if there's a more compact way to do this. I’m also wondering if there’s the ability to add javascript functions right into the HTML. Some functions, like the setEasyMode, setHardMode, etc, are only one line long. Perhaps putting the functions into the HTML may make the .JS file more readable? Or help with the division of code more. However, I’m not sure how wise this is from a security standpoint, and how well this would scale up to larger web applications with a lot more code!
I’d like to change this game to also include almost a “guess the song challenge?” This would include a couple of specific features. One would be that after the user correctly follows a predetermined pattern, instead of immediately winning, the full pattern is played in the correct rhythm of the song, and the user inputs their guess of what the song is into a text box. I’d probably add more pre-determined melodies for this as well. 
It would also be cool to make this into a “toy piano” - right now, the user can still play the tones even when there isn’t a game going on. I’d like to expand on this and add more notes so the user can have more fun with playing around with the buttons and tones! Perhaps even adding the ability to change the types of sounds playing - from pure tones to drum beats to maybe even dog barks! 



## License

    Copyright Tina Ma

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.