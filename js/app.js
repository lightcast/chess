/**

 * Created by jd on 2/23/15.

 */



"use strict";



/** To DO

 *

 * @type {{rank: string[], file: number[], img: {bKing: string, bQueen: string, bRook: string, bKnight: string, bBishop: string, bPawn: string, wRook: string, wKnight: string, wBishop: string, wQuen: string, wKing: string, wPawn: string}, selectedCellCss: null, selectedPieceLocation: null, selectedGamePiece: null, board: *}}

 *

 * pawn promotion

 * en passant

 */



var game = {

    rank: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],

    file: [1, 2, 3, 4, 5, 6, 7, 8],

    img: {

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



    },

    selectedCellCss: null,

    selectedPieceLocation: null,

    selectedGamePiece: null,

    board: createArray(8, 8)

};





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



function clearChessBoard() {

    loadChessBoard();

}



function pawnImg(position, img) {

    var pawn = document.getElementById(position);

    pawn.style.backgroundRepeat = "no-repeat";

    pawn.style.backgroundImage = img;

}



function knightImg(position, img) {

    var knight = document.getElementById(position);

    knight.style.backgroundRepeat = "no-repeat";

    knight.style.backgroundImage = img;

}



function bishopImg(position, img) {

    var bishop = document.getElementById(position);

    bishop.style.backgroundRepeat = "no-repeat";

    bishop.style.backgroundImage = img;

}



function rookImg(position, img) {

    var rook = document.getElementById(position);

    rook.style.backgroundRepeat = "no-repeat";

    rook.style.backgroundImage = img;

}



function kingImg(position, img) {

    var king = document.getElementById(position);

    king.style.backgroundRepeat = "no-repeat";

    king.style.backgroundImage = img;

}



function queenImg(position, img) {

    var queen = document.getElementById(position);

    queen.style.backgroundRepeat = "no-repeat";

    queen.style.backgroundImage = img;

}





function loadChessBoard() {

    // this is a very important piece. we load all of he empty cells with zeros

    for (var a = 0; a < game.board.length; a++) {

        for (var b = 0; b < 8; b++) {

            game.board[a][b] = 0;

        }

    }





// Black pieces



//Queen side Black Rook

    rookImg('A8', game.img.bRook);

    game.board[7][0] = 'bR';





//Queen side Black Knight

    knightImg('B8', game.img.bKnight);

    game.board[7][1] = 'bN';



//Queen side Black Bishop

    bishopImg('C8', game.img.bBishop);

    game.board[7][2] = 'bB';



//Black Queen

    queenImg('D8', game.img.bQueen);

    game.board[7][3] = 'bQ';



//Black King

    kingImg('E8', game.img.bKing);

    game.board[7][4] = 'bK';



//King side Black Bishop

    bishopImg('F8', game.img.bBishop);

    game.board[7][5] = 'bB';



//King side Black Knight

    knightImg('G8', game.img.bKnight);

    game.board[7][6] = 'bN';

//King side Black Rook

    rookImg('H8', game.img.bRook);

    game.board[7][7] = 'bR';





//Pawns

    for (var i = 0; i < game.rank.length; i++) {

        pawnImg(game.rank[i] + '7', game.img.bPawn);

        game.board[6][i] = 'bP';

    }



//White pieces



//Queen side White Rook

    rookImg('A1', game.img.wRook);

    game.board[0][0] = 'wR';



//Queen side White Knight

    knightImg('B1', game.img.wKnight);

    game.board[0][1] = 'wN';



//Queen side White Bishop

    bishopImg('C1', game.img.wBishop);

    game.board[0][2] = 'wB';



//White Queen

    queenImg('D1', game.img.wQueen);

    game.board[0][3] = 'wQ';



//White King

    kingImg('E1', game.img.wKing);

    game.board[0][4] = 'wK';



//King side White Bishop

    bishopImg('F1', game.img.wBishop);

    game.board[0][5] = 'wB';



//King side White Knight

    knightImg('G1', game.img.wKnight);

    game.board[0][6] = 'wN';



//King side White Rook

    rookImg('H1', game.img.wRook);

    game.board[0][7] = 'wR';



//Pawns

    for (var j = 0; j < game.rank.length; j++) {

        pawnImg(game.rank[j] + '2', game.img.wPawn);

        game.board[1][j] = 'wP';

    }

}



function movePieces(cell, piece, move) {

    var position = document.getElementById(cell);



    position.style.backgroundRepeat = "no-repeat";

    position.style.backgroundImage = game.img[game.selectedGamePiece];

    // we set the array to the value of the new piece to the selected piece

    var rank1 = game.rank.indexOf(position.id[0]);

    game.board[position.id[1] - 1][rank1] = piece;



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



    console.log(game.board.forEach(logArrayElements));



}





function gamePlay(cell, piece) {

    var position, p;



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

        p = translatePiece(game.selectedGamePiece);



        if (p[1] === 'P') {

            if (pawn(game.selectedPieceLocation, p, cell)) {

                movePieces(cell, p);

            }

        } else if (p[1] === 'N') {

            if (knight(game.selectedPieceLocation, p, cell)) {

                movePieces(cell, p);

            }

        } else if (p[1] === 'R') {

            if (rook(game.selectedPieceLocation, p, cell)) {

                movePieces(cell, p);

            }

        } else if (p[1] === 'B') {

            if (bishop(game.selectedPieceLocation, p, cell)) {

                movePieces(cell, p);

            }

        } else if (p[1] === 'Q') {

            if (queen(game.selectedPieceLocation, p, cell)) {

                movePieces(cell, p);

            }

        } else if (p[1] === 'K') {

            if (king(game.selectedPieceLocation, p, cell)) {

                movePieces(cell, p);

            }

        }



    }



}



function translatePiece(piece) {

    var name = null;

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



    }

    return name;

}



function queen(cell, piece, newCell) {

    if (rook(cell, piece, newCell)) {

        return true;

    } else if (bishop(cell, piece, newCell)) {

        return true;

    }

    return false;

}



function knight(cell, piece, newCell) {

    var pos, oldPos, oldPosRank, oldPosFile, newRank, newFile, i;

    oldPos = translateCell(cell);

    pos = translateCell(newCell);



    oldPosRank = oldPos[0];

    oldPosFile = oldPos[2];



    newRank = pos[0];

    newFile = pos[2];



    // movement



    // going up



    // 2 up 1 left

    if ((parseInt(oldPosRank, 10) + 2 === parseInt(newRank, 10)) && (parseInt(oldPosFile) - 1 === parseInt(newFile, 10))) {

        return (game.board[newRank][newFile] === 0) || (game.board[newRank][newFile][0] !== piece[0]);

    } else if ((parseInt(oldPosRank, 10) + 2 === parseInt(newRank, 10)) && (parseInt(oldPosFile) + 1 === parseInt(newFile, 10))) {

        // 2 up 1 right

        return (game.board[newRank][newFile] === 0) || (game.board[newRank][newFile][0] !== piece[0]);

    } else if ((parseInt(oldPosRank, 10) + 1 === parseInt(newRank, 10)) && (parseInt(oldPosFile) + 2 === parseInt(newFile, 10))) {

        // 1 up  2 right

        return (game.board[newRank][newFile] === 0) || (game.board[newRank][newFile][0] !== piece[0]);

    } else if ((parseInt(oldPosRank, 10) + 1 === parseInt(newRank, 10)) && (parseInt(oldPosFile) - 2 === parseInt(newFile, 10))) {

        // 1 up 2 left

        return (game.board[newRank][newFile] === 0) || (game.board[newRank][newFile][0] !== piece[0]);

    }





    // going down



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



function bishop(cell, piece, newCell) {

    var pos, oldPos, oldPosRank, oldPosFile, newRank, newFile, i, j, temp;

    oldPos = translateCell(cell);

    pos = translateCell(newCell);



    oldPosRank = parseInt(oldPos[0], 10);

    oldPosFile = parseInt(oldPos[2], 10);



    newRank = parseInt(pos[0], 10);

    newFile = parseInt(pos[2], 10);



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

            console.log(temp);

            console.log(oldPosFile - temp);

            console.log(newFile);

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



function logArrayElements(element, index, array) {

    console.log('a[' + index + '] = ' + element);

}



function rook(cell, piece, newCell) {

    var pos, oldPos, oldPosRank, oldPosFile, newRank, newFile, i;

    oldPos = translateCell(cell);

    pos = translateCell(newCell);



    oldPosRank = parseInt(oldPos[0], 10);

    oldPosFile = parseInt(oldPos[2], 10);



    newRank = parseInt(pos[0], 10);

    newFile = parseInt(pos[2], 10);



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



function king(cell, piece, newCell) {



    var pos, oldPos, oldPosRank, oldPosFile, newRank, newFile, i;
    oldPos = translateCell(cell);

    pos = translateCell(newCell);





    oldPosRank = parseInt(oldPos[0], 10);

    oldPosFile = parseInt(oldPos[2], 10);



    newRank = parseInt(pos[0], 10);

    newFile = parseInt(pos[2], 10);



    // make sure we don't hit our own piece

    if ((game.board[newRank][newFile])[0] !== piece[0]) {

        // movement

        if (((oldPosFile + 1) === newFile) && (oldPosRank === newRank)) {

            //right

            if (!kingInCheck(cell, piece, newCell)) {

                return true;

            }

        } else if (((oldPosFile - 1 ) === newFile) && (oldPosRank === newRank)) {

            //left

            if (!kingInCheck(cell, piece, newCell)) {

                return true;

            }

        } else if (((oldPosRank + 1) === newRank) && (oldPosFile === newFile)) {

            // up

            if (!kingInCheck(cell, piece, newCell)) {

                return true;

            }

        } else if (((oldPosRank - 1) === newRank) && (oldPosFile === newFile)) {

            //down

            if (!kingInCheck(cell, piece, newCell)) {

                return true;

            }

        } else if (((oldPosFile + 1) === newFile) && (oldPosRank + 1 === newRank)) {

            // up right

            if (!kingInCheck(cell, piece, newCell)) {

                return true;

            }

        } else if (((oldPosFile - 1 ) === newFile) && (oldPosRank + 1 === newRank)) {

            //up left

            if (!kingInCheck(cell, piece, newCell)) {

                return true;

            }

        } else if (((oldPosFile - 1 ) === newFile) && (oldPosRank - 1 === newRank)) {

            //down left

            if (!kingInCheck(cell, piece, newCell)) {

                return true;

            }

        } else if (((oldPosFile + 1 ) === newFile) && (oldPosRank - 1 === newRank)) {

            //down right

            if (!kingInCheck(cell, piece, newCell)) {

                return true;

            }

        }

    }

    return false;



}



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

    if ((forwardFile === parseInt(pos[0], 10)) && (forwardRank === parseInt(pos[2], 10))) {

        // once again we check to see if the next row is equal to the selected row

        // pawn can move forward so we add +1 to the row and leave actual pawn position the same

        if (isSpaceEmpty(pos)) {

            return true;

        }

    }



    // first we check to see if the next row is equal to the selected row

    // pawn can move forward so we add - 2 to the row and leave actual pawn position the same

    if (piece[0] === 'b' && (parseInt(oldPos[0], 10)) === 6) {

        if ((forwardFileStart === parseInt(pos[0], 10)) && (forwardRankStart === parseInt(pos[2], 10))) {

            if (isSpaceEmpty(pos)) {

                return true;

            }

        }

    }





    if (piece[0] === 'w' && (parseInt(oldPos[0], 10)) === 1) {



        if ((forwardFileStart === parseInt(pos[0], 10)) && (forwardRankStart === parseInt(pos[2], 10))) {

            if (isSpaceEmpty(pos)) {

                return true;

            }

        }

    }



    //jumping

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





function kingInCheck(cell, piece, newCell) {

    var pos, oldPos, oldPosRank, oldPosFile, newRank, newFile, i, j, isInCheck;

    oldPos = translateCell(cell);

    pos = translateCell(newCell);





    oldPosRank = parseInt(oldPos[0], 10);

    oldPosFile = parseInt(oldPos[2], 10);



    newRank = parseInt(pos[0], 10);

    newFile = parseInt(pos[2], 10);

    isInCheck = false;



    // first we check for a rook or queen

    //if(newRank <= game.board.length -1){



    //we check up for a rook or a queen from the same file

    for (i = newRank + 1; i <= game.board.length - 1; i++) {

        if (game.board[i][newFile] !== 0) {

            if ((game.board[i][newFile][1] === 'R') || (game.board[i][newFile][1] === 'Q')) {

                if ((game.board[i][newFile])[0] !== piece[0]) {

                    return true;

                }

            } else {

                isInCheck = false;

                break;

            }

        }

    }





    // we have to check the sides first right

    for (i = newFile + 1; i <= 7; i++) {

        //console.log(i);

        if (game.board[newRank][i] !== 0) {

            if ((game.board[newRank][i][1] === 'R') || (game.board[newRank][i][1] === 'Q')) {

                if ((game.board[newRank][i])[0] !== piece[0]) {

                    return true;

                }

            } else {

                isInCheck = false;

                break;

            }

        }

    }



    // check left

    for (i = newFile - 1; i >= 0; i--) {

        if (game.board[newRank][i] !== 0) {

            if ((game.board[newRank][i][1] === 'R') || (game.board[newRank][i][1] === 'Q')) {

                if ((game.board[newRank][i])[0] !== piece[0]) {

                    return true;

                }

            } else {

                isInCheck = false;

                break;

            }

        }

    }



    // we have to check down for a rook or queen

    for (i = newRank - 1; i >= 0; i--) {

        if (game.board[i][newFile] !== 0) {

            if ((game.board[i][newFile][1] === 'R') || (game.board[i][newFile][1] === 'Q')) {

                if ((game.board[i][newFile])[0] !== piece[0]) {

                    return true;

                }

            } else {

                isInCheck = false;

                break;

            }

        }

    }





    return isInCheck;



}



function createArray(length) {

    var arr = new Array(length || 0),

        i = length;

    if (arguments.length > 1) {

        var args = Array.prototype.slice.call(arguments, 1);

        while (i--) arr[length - 1 - i] = createArray.apply(this, args);

    }

    return arr;

}



function getPieceName(img) {

    // we strip out the image url name and return the piece name

    var str = img.substring(12);

    return str.substring(0, str.indexOf('.'));

}



function translateCell(cell) {

    var rank = game.rank.indexOf(cell[0]);

    return (cell[1] - 1) + '-' + rank;

}





function isSameColor(piece, newPiece) {

    return piece[0] === newPiece[0];

}



function isSpaceEmpty(newCell) {

    return game.board[newCell[0]][newCell[2]] === 0;

}





function getPieceFromBoard(newCell) {

    return game.board[newCell[0]][newCell[2]];

}