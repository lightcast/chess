/**
* Created by jd on 2/23/15.
*/
"use strict";
/** To DO
*
* @type {{rank: string[], file: number[], img: {bKing: string, bQueen: string, bRook: string, bKnight: string, bBishop: string, bPawn: string, wRook: string, wKnight: string, wBishop: string, wQuen: string, wKing: string, wPawn: string}, selectedCellCss: null, selectedPieceLocation: null, selectedGamePiece: null, board: *}}
*
*
* en passant
*/

function Game(){
  this.rank = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  this.file = [1, 2, 3, 4, 5, 6, 7, 8];
  this.img = {
    bKing: "url(images/bKing.png)",
    bQueen: "url(images/bQueen.png)",
    bRook: "url(images/bRook.png)",
    bKnight: "url(images/bKnight.png)",
    bBishop: "url(images/bBishop.png)",
    bPawn: "url(images/bPawn.png)",
    wRook: "url(images/wRook.png)",
    wKnight: "url(images/wKnight.png)",
    wBishop: "url(images/wBishop.png)",
    wQueen: "url(images/wQueen.png)",
    wKing: "url(images/wKing.png)",
    wPawn: "url(images/wPawn.png)"

  };
  this.selectedCellCss = null;
  this.selectedPieceLocation = null;
  this.selectedGamePiece = null;
  this.board = createArray(8, 8); //used to record the moves of both the user and computer
  this.lastColorMove = null;
  this.pauseGamePlay = null;
  this.pawnPromotion = {
    cell: null,
    gamePiece: null
  };

}

/**********************************************************************
* These prototypes are used to set the images on the screen
* Include the position and the image
* For example: ('H1', game.img.wRook) H
* H1 is the position and we get the image by calling the game object
* and using either the black or white rook
**********************************************************************/

Game.prototype.rookImg = function(position, img) {
  var rook = document.getElementById(position);
  rook.style.backgroundRepeat = "no-repeat";
  rook.style.backgroundImage = img;
};


Game.prototype.pawnImg = function(position, img) {
  var pawn = document.getElementById(position);
  pawn.style.backgroundRepeat = "no-repeat";
  pawn.style.backgroundImage = img;
};

Game.prototype.knightImg = function(position, img) {
  var knight = document.getElementById(position);
  knight.style.backgroundRepeat = "no-repeat";
  knight.style.backgroundImage = img;
};

Game.prototype.bishopImg = function(position, img) {
  var bishop = document.getElementById(position);
  bishop.style.backgroundRepeat = "no-repeat";
  bishop.style.backgroundImage = img;
};

Game.prototype.kingImg = function(position, img) {
  var king = document.getElementById(position);
  king.style.backgroundRepeat = "no-repeat";
  king.style.backgroundImage = img;
};

Game.prototype.queenImg = function(position, img) {
  var queen = document.getElementById(position);
  queen.style.backgroundRepeat = "no-repeat";
  queen.style.backgroundImage = img;
};
/**********************************************************************/


// we make a new object
var game = new Game();

// this is the main function that will start the game play
(function () {
  var cellID;
  for (var i = 0; i < game.rank.length; i++) {
    for (var j = 0; j < game.file.length; j++) {
      cellID = game.rank[i] + game.file[j];
      (function (cell) {
        document.getElementById(cell).addEventListener('click', function () {
          // we pass in the ID of the cell and the piece
          gamePlay(document.getElementById(cell).id, getPieceName(document.getElementById(cell).style.backgroundImage));
        });
      }(cellID));
    }
  }

}());

// load chess board
loadChessBoard();


function queen(cell, piece, newCell) {
  if (rook(cell, piece, newCell)) {
    return true;
  } else if (bishop(cell, piece, newCell)) {
    return true;
  }
  return false;
}

/***************************************************************************
* King Functions used throughout the game and associated with the game
*
*
***************************************************************************/

function king(cell, piece, newCell) {

  var pos, oldPos, oldPosRank, oldPosFile, newRank, newFile, i;
  oldPos = translateCell(cell);
  pos = translateCell(newCell);

console.log(cell);
console.log(piece);
console.log(newCell);
  oldPosRank = parseInt(oldPos[0], 10);
  oldPosFile = parseInt(oldPos[2], 10);

  newRank = parseInt(pos[0], 10);
  newFile = parseInt(pos[2], 10);

  // make sure we don't hit our own piece
  if ((game.board[newRank][newFile])[0] !== piece[0]) {
    // movement
    if (((oldPosFile + 1) === newFile) && (oldPosRank === newRank)) {
      //right
      if (!kingMoveInCheck(cell, piece, newCell)) {
        return true;
      }
    } else if (((oldPosFile - 1 ) === newFile) && (oldPosRank === newRank)) {
      //left
      if (!kingMoveInCheck(cell, piece, newCell)) {
        return true;
      }
    } else if (((oldPosRank + 1) === newRank) && (oldPosFile === newFile)) {
      // up
      if (!kingMoveInCheck(cell, piece, newCell)) {
        return true;
      }
    } else if (((oldPosRank - 1) === newRank) && (oldPosFile === newFile)) {
      //down
      if (!kingMoveInCheck(cell, piece, newCell)) {
        return true;
      }
    } else if (((oldPosFile + 1) === newFile) && (oldPosRank + 1 === newRank)) {
      // up right
      if (!kingMoveInCheck(cell, piece, newCell)) {
        return true;
      }
    } else if (((oldPosFile - 1 ) === newFile) && (oldPosRank + 1 === newRank)) {
      //up left
      if (!kingMoveInCheck(cell, piece, newCell)) {
        return true;
      }
    } else if (((oldPosFile - 1 ) === newFile) && (oldPosRank - 1 === newRank)) {
      //down left
      if (!kingMoveInCheck(cell, piece, newCell)) {
        return true;
      }
    } else if (((oldPosFile + 1 ) === newFile) && (oldPosRank - 1 === newRank)) {
      //down right
      if (!kingMoveInCheck(cell, piece, newCell)) {
        return true;
      }
    }
  }
  return false;

}
function kingMoveInCheck(cell, piece, newCell){
  var pos, oldPos, oldPosRank, oldPosFile, newRank, newFile, i;
  oldPos = translateCell(cell);
  pos = translateCell(newCell);
console.log(pos);
  oldPosRank = parseInt(oldPos[0], 10);
  oldPosFile = parseInt(oldPos[2], 10);

  newRank = parseInt(pos[0], 10);
  newFile = parseInt(pos[2], 10);
  console.log(oldPosFile);
  console.log(newFile);
  console.log(oldPosRank);
  console.log(newRank);
  if(oldPosFile === newFile && newRank > oldPosRank){
    var newPos = (newRank + 1) + '-' + (newFile - 1),
        opposingPiece = getPieceFromBoard(newPos);
        console.log('kjkj');
        console.log(opposingPiece);
        console.log(newPos);
        console.log(isSameColor(piece, opposingPiece));
        console.log(isSpaceEmpty(newPos));
    if(!isSpaceEmpty(newPos) && !isSameColor(piece, opposingPiece)){
      console.log('ja');
      if(opposingPiece[1] === 'P'){
        console.log('why');
        return true;
      }
    }
  }else if(newRank > oldPosRank && newRank > oldPosRank){
    var newPos = (newRank + 1) + '-' + (newFile - 1),
        opposingPiece = getPieceFromBoard(newPos);
    if(!isSpaceEmpty(newPos) && !isSameColor(piece, opposingPiece)){
      if(opposingPiece[1] === 'P'){
        return true;
      }
    }
  }
  return false;
}

function kingInCheck(){
  return false;
}

/***************************************************************************
* Pawn Functions used throughout the game and associated with the game
* Necessary for game play
*
***************************************************************************/

function pawn(cell, piece, newCell) {

  var pos, oldPos, rightJumpRank, leftJumpRank, rightJumpFile, leftJumpFile,
  forwardFileStart, forwardRankStart, forwardFile, forwardRank;

  pos = translateCell(newCell);
  oldPos = translateCell(cell);

  switch (piece[0]) {
    case 'b':
    forwardFileStart = (parseInt(oldPos[0], 10) - 2);
    forwardRankStart = (parseInt(oldPos[2], 10));
    forwardFile = (parseInt(oldPos[0], 10) - 1);
    forwardRank = (parseInt(oldPos[2], 10));
    leftJumpFile = (parseInt(oldPos[0], 10) - 1);
    leftJumpRank = (parseInt(oldPos[2], 10) - 1);
    rightJumpFile = (parseInt(oldPos[0], 10) - 1);
    rightJumpRank = (parseInt(oldPos[2], 10) + 1);
    break;
    case 'w':
    forwardFileStart = (parseInt(oldPos[0], 10) + 2);
    forwardRankStart = (parseInt(oldPos[2], 10));
    forwardFile = (parseInt(oldPos[0], 10) + 1);
    forwardRank = (parseInt(oldPos[2], 10));
    leftJumpFile = (parseInt(oldPos[0], 10) + 1);
    leftJumpRank = (parseInt(oldPos[2], 10) - 1);
    rightJumpFile = (parseInt(oldPos[0], 10) + 1);
    rightJumpRank = (parseInt(oldPos[2], 10) + 1);
    break;
  }


  if(piece[0] === 'w'){
    // we do not capture kings. so if that's the new position
    // you can't capture it
    if(getPieceFromBoard(pos) === 'bK') return;
    // if we start at rank 1 (acutally rank 2 but since the array is zero based we go with 1)
    if (parseInt(oldPos[0], 10) === 1) {
      //if we go up two rows from where we are and stay in the same file it's a legal move
      // row two up two
      if ((forwardFileStart === parseInt(pos[0], 10)) && (forwardRankStart === parseInt(pos[2], 10))) {
        if (isSpaceEmpty(pos)) {
          return true;
        }
      }
    }
    /*************************************
    * Pawn Promotion
    * if piece is white and the row is the 7th row and it's empty we promote
    **************************************/
    //
    if(parseInt(pos[0], 10) === 7 && isSpaceEmpty(pos)){
      return true;
    }else if(parseInt(pos[0], 10) === 7 && !isSpaceEmpty(pos) && !isSameColor(piece, getPieceFromBoard(pos))){
      // this allows for capturing another piece
      return true;
    }

  }else if(piece[0] === 'b'){

    if(getPieceFromBoard(pos) === 'wK') return;
    // first we check to see if the next row is equal to the selected row
    // pawn can move forward so we add - 2 to the row and leave actual pawn position the same
    if (parseInt(oldPos[0], 10) === 6) {
      if ((forwardFileStart === parseInt(pos[0], 10)) && (forwardRankStart === parseInt(pos[2], 10))) {
        if (isSpaceEmpty(pos)) {
          return true;
        }
      }
    }
    /*************************************
    * Pawn Promotion
    * if piece is black and the row is the 0th row and it's empty we promote
    **************************************/
    if(parseInt(pos[0], 10) === 0 && isSpaceEmpty(pos)){
      return true;
    }else if(parseInt(pos[0], 10) === 0 && !isSpaceEmpty(pos) && !isSameColor(piece, getPieceFromBoard(pos))){
      // this allows for capturing another piece
      return true;
    }
  }

  if ((forwardFile === parseInt(pos[0], 10)) && (forwardRank === parseInt(pos[2], 10))) {
    // once again we check to see if the next row is equal to the selected row
    // pawn can move forward so we add +1 to the row and leave actual pawn position the same
    if (isSpaceEmpty(pos)) {
      return true;
    }
  }

  /**********************
  * JUMPING RULES ARE HIGHLIGHTED IN THE SWITCH STATEMENT
  * I didn't want a ton of else if so we determine what color is the piece and
  * we can perform the JUMP
  ***********************/
  if ((leftJumpFile === parseInt(pos[0], 10)) && (leftJumpRank === parseInt(pos[2], 10))) {
    if (!isSpaceEmpty(pos) && !isSameColor(piece, getPieceFromBoard(pos))) {
      return true;
    }
  } else if ((rightJumpFile === parseInt(pos[0], 10)) && (rightJumpRank === parseInt(pos[2], 10))) {
    if (!isSpaceEmpty(pos) && !isSameColor(piece, getPieceFromBoard(pos))) {
      return true;
    }
  }

  return false;

}

/***************************************************************************
* Knight Functions used throughout the game and associated with the game
*
*
***************************************************************************/

function knight(cell, piece, newCell) {
  var pos, oldPos, oldPosRank, oldPosFile, newRank, newFile, i;
  oldPos = translateCell(cell);
  pos = translateCell(newCell);

  oldPosRank = oldPos[0];
  oldPosFile = oldPos[2];

  newRank = pos[0];
  newFile = pos[2];
  if((getPieceFromBoard(pos) === 'bK') || (getPieceFromBoard(pos) === 'wK')){
    return false;
  }
  /* Movement...
  * in order to go up on the chess board we determine the possible movements and see if they are
  * compatiable with what the user chose
  */

  // going up

  // we check to see if the movement is 2 up 1 left
  if ((parseInt(oldPosRank, 10) + 2 === parseInt(newRank, 10)) && (parseInt(oldPosFile) - 1 === parseInt(newFile, 10))) {
    return (game.board[newRank][newFile] === 0) || (game.board[newRank][newFile][0] !== piece[0]);
  } else if ((parseInt(oldPosRank, 10) + 2 === parseInt(newRank, 10)) && (parseInt(oldPosFile) + 1 === parseInt(newFile, 10))) {
    // or we can do 2 up 1 right
    return (game.board[newRank][newFile] === 0) || (game.board[newRank][newFile][0] !== piece[0]);
  } else if ((parseInt(oldPosRank, 10) + 1 === parseInt(newRank, 10)) && (parseInt(oldPosFile) + 2 === parseInt(newFile, 10))) {
    // or we can do 1 up  2 right
    return (game.board[newRank][newFile] === 0) || (game.board[newRank][newFile][0] !== piece[0]);
  } else if ((parseInt(oldPosRank, 10) + 1 === parseInt(newRank, 10)) && (parseInt(oldPosFile) - 2 === parseInt(newFile, 10))) {
    // or we can do 1 up 2 left
    return (game.board[newRank][newFile] === 0) || (game.board[newRank][newFile][0] !== piece[0]);
  }


  // continue of movements going down

  // 2 down 1 left
  if ((parseInt(oldPosRank, 10) - 2 === parseInt(newRank, 10)) && (parseInt(oldPosFile) - 1 === parseInt(newFile, 10))) {
    return (game.board[newRank][newFile] === 0) || (game.board[newRank][newFile][0] !== piece[0]);
  } else if ((parseInt(oldPosRank, 10) - 2 === parseInt(newRank, 10)) && (parseInt(oldPosFile) + 1 === parseInt(newFile, 10))) {
    // 2 down 1 right
    return (game.board[newRank][newFile] === 0) || (game.board[newRank][newFile][0] !== piece[0]);
  } else if ((parseInt(oldPosRank, 10) - 1 === parseInt(newRank, 10)) && (parseInt(oldPosFile) + 2 === parseInt(newFile, 10))) {
    // 1 down  2 right
    return (game.board[newRank][newFile] === 0) || (game.board[newRank][newFile][0] !== piece[0]);
  } else if ((parseInt(oldPosRank, 10) - 1 === parseInt(newRank, 10)) && (parseInt(oldPosFile) - 2 === parseInt(newFile, 10))) {
    // 1 down 2 left
    return (game.board[newRank][newFile] === 0) || (game.board[newRank][newFile][0] !== piece[0]);
  }
}
/***************************************************************************
* Rook Functions used throughout the game and associated with the game
*
*
***************************************************************************/

function rook(cell, piece, newCell) {
  var pos, oldPos, oldPosRank, oldPosFile, newRank, newFile, i;
  oldPos = translateCell(cell);
  pos = translateCell(newCell);

  oldPosRank = parseInt(oldPos[0], 10);
  oldPosFile = parseInt(oldPos[2], 10);

  newRank = parseInt(pos[0], 10);
  newFile = parseInt(pos[2], 10);

  if((getPieceFromBoard(pos) === 'bK') || (getPieceFromBoard(pos) === 'wK')){
    return false;
  }

  if (oldPosRank === newRank) {
    // check to see if the the new rank is zero or
    // we get the color of the piece and make sure that the piece we are trying to capture is not of
    // the same color
    if ((game.board[oldPosRank][newFile] === 0) || ((game.board[oldPosRank][newFile])[0] !== piece[0])) {
      // increment ++  if it's less else decrement --
      if (oldPosFile < newFile) {
        for (i = oldPosFile + 1; i < newFile; i++) {
          // since the rook can only go along the rank or file we check to see
          // if the rank is empty. if not we return false
          if (game.board[oldPosRank][i] !== 0) {
            return false;
          }
        }
        // we can now return true because this is true
        return true;
      } else if (oldPosFile > newFile) {
        for (i = oldPosFile - 1; i > newFile; i--) {
          // since the rook can only go along the rank or file we check to see
          // if the rank is empty. if not we return false
          if (game.board[oldPosRank][i] !== 0) {
            return false;
          }
        }
        return true;
      }
    }
  } else if (oldPosRank !== newRank && oldPosFile === newFile) {

    if ((game.board[newRank][oldPosFile] === 0 ) || (game.board[newRank][oldPosFile][0]) !== piece[0]) {
      if (oldPosRank < newRank) {
        for (i = parseInt(oldPosRank, 10) + 1; i < parseInt(newRank, 10); i++) {
          if (game.board[i][oldPosFile] !== 0) {
            return false;
          }
        }
        return true;
      } else if (oldPosRank > newRank) {
        for (i = parseInt(oldPosRank, 10) - 1; i > parseInt(newRank, 10); i--) {
          if (game.board[i][oldPosFile] !== 0) {
            return false;
          }
        }
        return true;
      }
    }
  }
  // default is false
  return false;
}
/***************************************************************************
* Bishop Functions used throughout the game and associated with the game
*
*
***************************************************************************/
function bishop(cell, piece, newCell) {
  var pos, oldPos, oldPosRank, oldPosFile, newRank, newFile, i, j, temp;
  oldPos = translateCell(cell);
  pos = translateCell(newCell);

  oldPosRank = parseInt(oldPos[0], 10);
  oldPosFile = parseInt(oldPos[2], 10);

  newRank = parseInt(pos[0], 10);
  newFile = parseInt(pos[2], 10);
  if((getPieceFromBoard(pos) === 'bK') || (getPieceFromBoard(pos) === 'wK')){
    return false;
  }

  if ((game.board[newRank][newFile])[0] !== piece[0]) {
    // going up right
    if (newRank > oldPosRank && newFile > oldPosFile) {
      // we take the new rank - the old rank which will give us the temp value so if we go up one the value will
      // be 1 we than make sure that the new file is +1 which should be temp
      temp = newRank - oldPosRank;
      if ((newFile - oldPosFile) !== temp) {
        return false;
      }
      j = oldPosFile + 1;
      for (i = oldPosRank + 1; i < newRank; i++) {
        if (game.board[i][j] !== 0) {
          return false;
        }
        j++;
      }
      return true;
    } else if (newRank > oldPosRank && newFile < oldPosFile) {
      // going up left
      // we take the new rank and subtract the old rank so if we go up one space then it would be 1
      // we take the old file and subtract temp so if we go up one space it should be one space left
      // this will apply for both black square bishop and white square bishop
      temp = newRank - oldPosRank;
      if ((oldPosFile - temp) !== parseInt(newFile, 10)) {
        return false;
      }

      j = oldPosFile - 1;
      for (i = oldPosRank + 1; i < newRank; i++) {
        if (game.board[i][j] !== 0) {
          return false;
        }
        j--;
      }
      return true;
    } else if (newRank < oldPosRank && newFile > oldPosFile) {
      // going down right
      // we take the new rank - the old rank that should give us the temp
      // so if we go down two from 8 that would be 8 - 6
      // the old file should equal oldfile + temp (which is 2) so 3 + 2 equal 5
      // which will be our new file
      temp = oldPosRank - newRank;
      if ((temp + oldPosFile) !== newFile) {
        return false;
      }
      j = oldPosFile + 1;
      for (i = oldPosRank - 1; i > newRank; i--) {
        if (game.board[i][j] !== 0) {
          return false;
        }
        j++;
      }
      return true;
    } else if (newRank < oldPosRank && newFile < oldPosFile) {
      // going down left
      // we take the old rank - the new rank
      temp = oldPosRank - newRank;
      if ((oldPosFile - temp) !== newFile) {
        return false;
      }
      j = oldPosFile - 1;
      for (i = oldPosRank - 1; i > newRank; i--) {
        if (game.board[i][j] !== 0) {
          return false;
        }
        j--;
      }
      return true;
    }
    return false;
  }
}

/***************************************************************************
* loadChessBoard is used at the start of the game
* once the game begins it is never called again unless you reset the chess board
* Necessary for game to play
*
***************************************************************************/
function loadChessBoard() {
  // this is a very important piece. we load all of he empty cells with zeros
  for (var a = 0; a < game.board.length; a++) {
    for (var b = 0; b < 8; b++) {
      game.board[a][b] = 0;
    }
  }

  //LOAD ALL OF THE PIECES ON THE BOARD

  // Black pieces

  //Queen side Black Rook
  game.rookImg('A8', game.img.bRook);
  game.board[7][0] = 'bR';


  //Queen side Black Knight
  game.knightImg('B8', game.img.bKnight);
  game.board[7][1] = 'bN';

  //Queen side Black Bishop
  game.bishopImg('C8', game.img.bBishop);
  game.board[7][2] = 'bB';

  //Black Queen
  game.queenImg('D8', game.img.bQueen);
  game.board[7][3] = 'bQ';

  //Black King
  game.kingImg('E8', game.img.bKing);
  game.board[7][4] = 'bK';

  //King side Black Bishop
  game.bishopImg('F8', game.img.bBishop);
  game.board[7][5] = 'bB';

  //King side Black Knight
  game.knightImg('G8', game.img.bKnight);
  game.board[7][6] = 'bN';
  //King side Black Rook
  game.rookImg('H8', game.img.bRook);
  game.board[7][7] = 'bR';

  //Pawns
  for (var i = 0; i < game.rank.length; i++) {
    game.pawnImg(game.rank[i] + '7', game.img.bPawn);
    game.board[6][i] = 'bP';
  }


  //White pieces

  //Queen side White Rook
  game.rookImg('A1', game.img.wRook);
  game.board[0][0] = 'wR';

  //Queen side White Knight
  game.knightImg('B1', game.img.wKnight);
  game.board[0][1] = 'wN';

  //Queen side White Bishop
  game.bishopImg('C1', game.img.wBishop);
  game.board[0][2] = 'wB';

  //White Queen
  game.queenImg('D1', game.img.wQueen);
  game.board[0][3] = 'wQ';

  //White King
  game.kingImg('E1', game.img.wKing);
  game.board[0][4] = 'wK';

  //King side White Bishop
  game.bishopImg('F1', game.img.wBishop);
  game.board[0][5] = 'wB';

  //King side White Knight
  game.knightImg('G1', game.img.wKnight);
  game.board[0][6] = 'wN';

  //King side White Rook
  game.rookImg('H1', game.img.wRook);
  game.board[0][7] = 'wR';

  //Pawns
  for (var j = 0; j < game.rank.length; j++) {
    game.pawnImg(game.rank[j] + '2', game.img.wPawn);
    game.board[1][j] = 'wP';
  }
}


/***************************************************************************
* Functions used for the game and associated with the game.
* Necessary for game to play
*
***************************************************************************/
function isSameColor(piece, newPiece) {
  return piece[0] === newPiece[0];
}
function isSpaceEmpty(newCell) {
  return game.board[newCell[0]][newCell[2]] === 0;
}
function getPieceName(img) {
  // we strip out the image url name and return the piece name
  return (img === '') || (img === undefined) || (img === null) ? '' : img.match(/wPawn|bPawn|wRook|bRook|wBishop|bBishop|wKnight|bKnight|wKing|bKing|wQueen|bQueen/)[0];
}
function translatePiece(piece) {
  var name = getPieceName(piece);
  switch (piece) {
    case 'bPawn':
    name = 'bP';
    break;
    case 'bKnight':
    name = 'bN';
    break;
    case 'bKing':
    name = 'bK';
    break;
    case 'bQueen':
    name = 'bQ';
    break;
    case 'bBishop':
    name = 'bB';
    break;
    case 'bRook':
    name = 'bR';
    break;
    case 'wPawn':
    name = 'wP';
    break;
    case 'wRook':
    name = 'wR';
    break;
    case 'wKnight':
    name = 'wN';
    break;
    case 'wBishop':
    name = 'wB';
    break;
    case 'wKing':
    name = 'wK';
    break;
    case 'wQueen':
    name = 'wQ';
    break;
    default:
    name = '';
  }
  return name;
}
function pawnPromotion(newPiece){
  switch(newPiece){
    case 'queen':
      if(game.pawnPromotion.gamePiece[0] === 'w'){
        movePieces(game.pawnPromotion.cell, game.pawnPromotion.gamePiece, 'wQueen');
      }else if(game.pawnPromotion.gamePiece[0] === 'b'){
        movePieces(game.pawnPromotion.cell, game.pawnPromotion.gamePiece, 'bQueen');
      }
      break;
    case 'rook':
      if(game.pawnPromotion.gamePiece[0] === 'w'){
        movePieces(game.pawnPromotion.cell, game.pawnPromotion.gamePiece, 'wRook');
      }else if(game.pawnPromotion.gamePiece[0] === 'b'){
        movePieces(game.pawnPromotion.cell, game.pawnPromotion.gamePiece, 'bRook');
      }
      break;
    case 'bishop':
      if(game.pawnPromotion.gamePiece[0] === 'w'){
        movePieces(game.pawnPromotion.cell, game.pawnPromotion.gamePiece, 'wBishop');
      }else if(game.pawnPromotion.gamePiece[0] === 'b'){
        movePieces(game.pawnPromotion.cell, game.pawnPromotion.gamePiece, 'bBishop');
      }
      break;
    case 'knight':
      if(game.pawnPromotion.gamePiece[0] === 'w'){
        movePieces(game.pawnPromotion.cell, game.pawnPromotion.gamePiece, 'wKnight');
      }else if(game.pawnPromotion.gamePiece[0] === 'b'){
        movePieces(game.pawnPromotion.cell, game.pawnPromotion.gamePiece, 'bKnight');
      }
      break;
    default:
      console.log('There is a problem with the game');
      break;
  }
  hidePawnPromotion();
}
function showPawnPromotion(){
  document.getElementById('pawnPromotion').style.display = 'inline';
}
function hidePawnPromotion(){
  document.getElementById('pawnPromotion').style.display = 'none';
}
function getPieceFromBoard(newCell) {
  return game.board[newCell[0]][newCell[2]];
}
function translateCell(cell) {
  var rank = game.rank.indexOf(cell[0]);
  return (cell[1] - 1) + '-' + rank;
}
/***************************************************************************
* Function gamePlay is used throughout the game to determine if the move
* is valid, whose turn, is king in check
* Necessary for game to play
*
***************************************************************************/

function gamePlay(cell, piece) {
  if(game.pauseGamePlay) return;
  var position, gamePiece, p;
  //we highlight the cell
  if (!game.selectedPieceLocation) {
    // the cell location i.e. A7 or A8
    game.selectedPieceLocation = cell;
    // we need to set the piece
    game.selectedGamePiece = piece;
    //we need to remember the color of the selected cell
    game.selectedCellCss = document.getElementById(cell).className;
    // we set the selected cell to yellow
    document.getElementById(cell).className = 'selected';
  } else if (game.selectedPieceLocation === cell) {
    // we remove the highlighted yellow if it's the same color

    //change the old position to the old color
    position = document.getElementById(game.selectedPieceLocation);
    position.className = '';
    position.className = game.selectedCellCss;

    game.selectedPieceLocation = null;
    game.selectedGamePiece = null;
    game.selectedCellCss = null;

  } else {
    gamePiece = translatePiece(game.selectedGamePiece);

    if ((gamePiece !== null) || (gamePiece !== undefined)) {
      // if the last color move is null than the game is new
      // or if the last piece color is the same as the selected piece than we don't move
      if((!game.lastColorMove) || (game.lastColorMove !== gamePiece[0])){
        switch (gamePiece !== null) {
          case gamePiece[1] === 'P':
            if(pawn(game.selectedPieceLocation, gamePiece, cell)){
              var pos = translateCell(cell);
              // determine if we need to promote a pawn
              // if so we show the screen to the user to
              // allow for a promotion
              if(gamePiece[0] === 'w' && parseInt(pos[0], 10) === 7){
                showPawnPromotion();
                game.pauseGamePlay = true;
                game.pawnPromotion = {
                  cell: cell,
                  gamePiece: gamePiece
                };
              }else if(gamePiece[0] === 'b' && parseInt(pos[0], 10) === 0){
                showPawnPromotion();
                game.pauseGamePlay = true;
                game.pawnPromotion = {
                  cell: cell,
                  gamePiece: gamePiece
                };
              }else{
                movePieces(cell, gamePiece);
              }
            }
            break;
          case gamePiece[1] === 'N':
            if (knight(game.selectedPieceLocation, gamePiece, cell)) {
              movePieces(cell, gamePiece);
            }else{
              console.log('Invalid move');
            }
            break;
          case gamePiece[1] === 'R':
            if (rook(game.selectedPieceLocation, gamePiece, cell)) {
              movePieces(cell, gamePiece);
            }else{
              console.log('Invalid move');
            }
            break;
          case gamePiece[1] === 'B':
            if (bishop(game.selectedPieceLocation, gamePiece, cell)) {
              movePieces(cell, gamePiece);
            }else{
              console.log('Invalid move');
            }
            break;
          case gamePiece[1] === 'Q':
            if (queen(game.selectedPieceLocation, gamePiece, cell)) {
              movePieces(cell, gamePiece);
            }else{
              console.log('Invalid move');
            }
            break;
          case gamePiece[1] === 'K':
          if (king(game.selectedPieceLocation, gamePiece, cell)) {
            movePieces(cell, gamePiece);
          }else{
            console.log('Invalid move');
          }
          break;
          default:

        }
      }else{
        var color = game.lastColorMove === 'w' ? 'White': 'Black';
        console.log(color + " just moved...it's not your turn.")
      }
    }

  }

}

/***************************************************************************
* Functions used for the game but not associated with the game
* not  for game to play
*
***************************************************************************/

function clearChessBoard() {
  loadChessBoard();
}

/***************************************************************************
* Basic JS Functions used throughout the game associated with the game
*
*
***************************************************************************/
function createArray(length) {
  var arr = new Array(length || 0),
  i = length;
  if (arguments.length > 1) {
    var args = Array.prototype.slice.call(arguments, 1);
    while (i--) arr[length - 1 - i] = createArray.apply(this, args);
  }
  return arr;
}
function logArrayElements(element, index, array) {
  console.log('a[' + index + '] = ' + element);
}

/***************************************************************************
* Function movePieces is used throughout the game to move the piece to the new
* square. All logic as to if the move is valid or if the king is in Check
* occurs before this method.
* If the piece is a pawn and it reaches the 8th rank this will handle pawn
* promotion. The param promotion looks for the value of the new promotion
* For example: wQueen, bQueen, wBishop, bBishop, etc.
* This function does just assumes that the promotion is correct
* movePieces also tracks the movement of all pieces in a 2D array
* Necessary for game to play
*
***************************************************************************/
function movePieces(cell, piece, promotion) {
  var position = document.getElementById(cell), selectedPiece = getPieceName(game.selectedGamePiece);
  position.style.backgroundRepeat = "no-repeat";
  // if we have a promotion enter the new value in the promotion
  if(promotion){
    position.style.backgroundImage = game.img[promotion];
  }else{
    position.style.backgroundImage = game.img[selectedPiece];
  }

  // we set the array to the value of the new piece to the selected piece
  var rank1 = game.rank.indexOf(position.id[0]);
  // if we have a promotion we need to set the new piece in the array
  if(promotion){
    game.board[position.id[1] - 1][rank1] = translatePiece(promotion);
  }else{
    game.board[position.id[1] - 1][rank1] = piece;
  }


  //change the old position to the old color
  position = document.getElementById(game.selectedPieceLocation);
  position.style.backgroundImage = '';
  position.className = game.selectedCellCss;


  // we need to set the old position in the array to 0
  rank1 = game.rank.indexOf(game.selectedPieceLocation[0]);
  game.board[game.selectedPieceLocation[1] - 1][rank1] = 0;
  // clear out all of the selected values to null
  game.selectedPieceLocation = null;
  game.selectedGamePiece = null;
  game.selectedCellCss = null;
  game.lastColorMove = selectedPiece[0];

  console.log(game.board.forEach(logArrayElements));
}