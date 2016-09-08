# Chess


<a href="https://lightcast.github.io/chess/"><b>TO PLAY THE GAME CLICK HERE</b></a>

 I made SimplyChess for a few reasons. <br /><br />
 1) I love chess and by making my own chess game in JS I would become a better player. <br />
 2) I wanted to demystify the complexity of chess. Don't get me wrong. Chess is very complicated
    however, all Chess AI's can be broken down into if/then/else statements and loops. <br />
3) I love robots. SimplyChess is used to control a real robot to play against an actual player.<br />
4) Chess is just awesome!<br />
<br />
Below you will find a detail explanation on my design decisions. Free free to send me a pull request on things you felt I should have done better.

<b>Chess Board: </b><br />
Our chess board will be an 2 dimensional (8x8) array containing all of the pieces on the board. <br />
Chess pieces:<br />
wP = white pawn <br />
wN = white knight <br />
wB = white bishop <br />
wR = white rook <br />
wQ = white queen <br />
wK = white king <br />
<br />
bP = black pawn <br />
bN = black knight <br />
bB = black bishop <br />
bQ = black queen <br />
bK = black king <br />

In case you are wondering why I'm not using chess notation for our pieces, let me will explain. It is easier to calculate moves and keep track of moves in an array. I created a library which will take our array and translate it to chess notation for our human players. However, our computer will use a simple array to keep track of moves. <br />
Here is a console log of our chess board: <br />
<br />
Please note: A zero means the space is empty <br /> <br />
a[0] = wR,wN,wB,wQ,wK,wB,wN,wR <br />
a[1] = wP,wP,wP,wP,wP,wP,wP,wP <br />
a[2] = 0,0,0,0,0,0,0,0 <br />
a[3] = 0,0,0,0,0,0,0,0 <br />
a[4] = 0,0,0,0,0,0,0,0 <br />
a[5] = 0,0,0,0,0,0,0,0 <br />
a[6] = bP,bP,bP,bP,bP,bP,bP,bP <br />
a[7] = bR,bN,bB,bQ,bK,bB,bN,bR <br />
<br />
<b>Moving pieces </b><br />
When we move a piece we update the array with the new and old values. To make it appear that the piece is "actually moving", we remove the piece from the board and add it back in the new space. The code is well commented so see the function movePieces()

<b> Pawns </b><br />
Pawns can only advance forward unless they are capturing. When pawns capture they move diagonal. Knowing this we can move pawns by adding 1 (2 if we are moving the pawn for the first time) from where the pawn is currently is in the array.
So for example, if we look at the board below:

a[0] = wR,wN,wB,wQ,wK,wB,wN,wR <br />
a[1] = wP,wP,wP,wP,wP,wP,wP,wP <br />
a[2] = 0,0,0,0,0,0,0,0 <br />
a[3] = 0,0,0,0,0,0,0,0 <br />
a[4] = 0,0,0,0,0,0,0,0 <br />
a[5] = 0,0,0,0,0,0,0,0 <br />
a[6] = bP,bP,bP,bP,bP,bP,bP,bP <br />
a[7] = bR,bN,bB,bQ,bK,bB,bN,bR <br />

We can tell the computer what are valid moves and only move the pawn if the user
chooses a valid move. Looking at the board above if we want to move the white pawn 1 space forward,
we would be moving toward black's area and up in the array. Adding 1 to the current position for the pawn on the far right would look like this:
 <br /> <br />

a[0] = wR,wN,wB,wQ,wK,wB,wN,wR <br />
a[1] = wP,wP,wP,wP,wP,wP,wP,0 <br />
a[2] = 0,0,0,0,0,0,0,wP <br />
a[3] = 0,0,0,0,0,0,0,0 <br />
a[4] = 0,0,0,0,0,0,0,0 <br />
a[5] = 0,0,0,0,0,0,0,0 <br />
a[6] = bP,bP,bP,bP,bP,bP,bP,bP <br />
a[7] = bR,bN,bB,bQ,bK,bB,bN,bR <br />

Again we only look for valid moves and not for all possible moves. Here are the some of the things we check for: <br />
1) Is the pawn trying to capture the king? If so this is not allowed. <br />
2) Is the pawn trying to move backwards? Don't allow it. <br />
3) Is the pawn trying to move more than 1 space (2 spaces when the pawn first moves)? <br />
4) Is the white pawn on the 8th rank? Allow for pawn promotion.<br />
5) Is the black pawn on the 1st rank? Allow for pawn promotion.<br />
6) Is the pawn trying to capture? Is the capture diagonal?<br />
7) Is the new space empty?<br />
8) Are we trying to capture our own piece?<br />

Our code becomes a lot easier if we check only for the things above.<br />
Every time the pawn moves we update the UI and the array to keep track of all pieces on the board.<br />
<br />
<b> Knight </b><br />
At first glance the Knight may seem pretty complicated. However, everything in chess can be broken into simple steps.
Let's see if we can draw this out using simple arrows. <br />
<b>Please note: We will only deal with a few of the knights moves here.</b><br />
<br />

From our knowledge of chess a Knight can move two spaces right and one down:<br />
-- -- > <br />
&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;|<br />
&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;V<br />
OR two spaces right and one up. <br />
&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;^ <br />
&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;|<br />
-- -- > <br />
<br />
OR two spaces left and one down <br />
< -- -- <br />
|<br />
V<br />
<br />
OR two spaces left and one up <br />
^<br />
|<br />
< -- --  <br />
<br />
With this knowledge let's take a look at our chess array. <br />
<br />
a[0] = wR,0,wB,wQ,wK,wB,wN,wR <br />
a[1] = wP,wP,wP,wP,wP,wP,wP,wP <br />
a[2] = 0,0,wN,0,0,0,0,0 <br />
a[3] = 0,0,0,0,0,0,0,0 <br />
a[4] = 0,0,0,0,0,0,0,0 <br />
a[5] = 0,0,bN,0,0,0,0,0 <br />
a[6] = bP,bP,bP,bP,bP,bP,bP,bP <br />
a[7] = bR,0,bB,bQ,bK,bB,bN,bR <br />

Here are the questions we can ask to tell if we are making a valid move.<br />
1) Am I moving two spaces left and one up or one down? <br />
2) Am I moving two spaces right and one up or down? <br />
3) Am I moving two spaces down and one right or left? <br />
4) Am I moving two spaces up and one right or left? <br />
5) Am I trying to capture the king? <br />
6) Is the space empty?<br />
7) Am I trying to capture our ally?<br />

<b> Bishop </b><br />

<b> Rook </b><br />
Our Rook is just as easy as our pawn. We know that Rooks can move either move vertically or horizontally
along our ranks and files. Knowing this fact we can ask ourself the following questions: <br />
1) Is the rook trying to capture the king? Don't allow it.
2) Is the space empty?
3) Is the space occupied with our ally?
4) Are we only trying to move horizontally or vertically? If we try to move diagonal don't allow it.

With our rules set for our Rook we are set. Now for our array.
We check where the user clicks on the board and we loop through the array. If all of the spaces are empty we can move our
rook. See below: <br />

a[0] = wR,wN,wB,wQ,wK,wB,wN,0 <br />
a[1] = wP,wP,wP,wP,wP,wP,wP,0 <br />
a[2] = wR,0,0,0,0,0,0,0 <br />
a[3] = 0,0,0,0,0,0,0,wP <br />
a[4] = 0,0,0,0,0,0,0,bP <br />
a[5] = 0,0,0,0,0,0,bP,0 <br />
a[6] = bP,bP,bP,bP,bP,bP,0,0 <br />
a[7] = bR,bN,bB,bQ,bK,bB,bN,bR <br />

In the above example we can see we were able to move our white Rook all the way across the rank. Since those spaces were
empty we are allowed to move our Rook. However, if the space is occupied we simply check to see if it's not our ally and
it's not the King(because you can't capture the King).

<b> Queen </b> <br />
The queen is just the Bishop and Rook put together. So I didn't do anything special for her.
I literally added the Bishop and Rook functions within her. Lazy? No. That's why we have functions.
Refer to the Bishop and Rook sections and add them together and you will understand how our queen works.

<b> King </b>

<b> Two players </b><br />
Right now you can only play with another player in the same room using the same computer.

<b> Chess AI </b>
Upcoming......