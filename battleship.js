var prompt = require("prompt-sync")();
let letterIndex = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
let directionIndex = ['R', 'L', 'U', 'D'];

let playingPieces = {

  Carrier: {id: 'CA', length: 5},
  Battleship: {id: 'BA', length: 4},
  //Cruiser: {id: 'CR', length: 3},
  //Submarine: {id: 'SU', length: 3},
  //Destroyer: {id: 'DE', length: 2}

};

let playingPiecesAI = {

  Carrier: {id: 'CA', length: 5},
  Battleship: {id: 'BA', length: 4},
  Cruiser: {id: 'CR', length: 3},
  Submarine: {id: 'SU', length: 3},
  Destroyer: {id: 'DE', length: 2}

};


let playingField = [
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                   ];

let playingFieldAI = [
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                   ];

let shotsFiredUser = [];
let shotsFiredAI = [];

//Checks validity of desired entry with three function
function checkValidity(piece, board){
  checkDirection = function(piece){
    let inputCheck = (directionIndex.indexOf(piece.direction[0]) !== -1);
    return inputCheck;
  };

  checkLocation = function(piece){
    let inputCheck = (letterIndex.indexOf(piece.start[0]) !== -1 && ( piece.start[1] > 0 && piece.start[1] <= 10));
    return (inputCheck && piece.start.length === 2);
  };

  checkPlacement = function(piece){
    let fitsOnBoard = true;
    let noInterference = true;

    switch(piece.direction){

      case 'R':

        fitsOnBoard = (Number(piece.start[1]) + piece.length - 1) <= 10;
        break;

      case 'L':

        fitsOnBoard = (Number(piece.start[1]) - piece.length) >= 1;
        break;

      case 'U':

        fitsOnBoard = (letterIndex.indexOf(piece.start[0]) - piece.length) >= 1;
        break;

      case 'D':

        fitsOnBoard = (letterIndex.indexOf(piece.start[0]) + piece.length - 1) <= 10;
        break;

    }

    //Prevents accessing parts of the array that dont exist in the next aspect of the check
    if(fitsOnBoard === false){
      return fitsOnBoard;
    }

    let startLocation = parseInput(piece.start);

    //Checks if the ships interfere with other ships
    for(let i = 0; i < piece.length; i ++){
      switch(piece.direction){

        case 'R':

          if(board[startLocation[0]][i + startLocation[1]] !== 0){
            noInterference = false;
          }
          break;

        case 'L':

          if(board[startLocation[0]][startLocation[1] - i] !== 0){
            noInterference = false;
          }
          break;

        case 'U':

          if(board[startLocation[0] - i][startLocation[1]] !== 0){
            noInterference = false;
          }

          break;

        case 'D':

          if(board[startLocation[0] + i][startLocation[1]] !== 0){
            noInterference = false;
          }
          break;

      }

      if(noInterference === false){
        break;
      }
    }

    return noInterference && fitsOnBoard;
  };

  if(checkDirection(piece) && checkLocation(piece) && checkPlacement(piece)){
    return true;
  } else {
    console.log("That is not a valid entry");
    return false;
  }
}

function addPiecesToBoard(piece, inputBoard){
  let board = inputBoard;
  let startLocation = parseInput(piece.start);

  for(let i = 0; i < piece.length; i ++){
    switch(piece.direction){

      case 'R':

        board[startLocation[0]][i + startLocation[1]] = piece.id;
        break;

      case 'L':

        board[startLocation[0]][startLocation[1] - i] = piece.id;
        break;

      case 'U':

        board[startLocation[0] - i][startLocation[1]] = piece.id;
        break;

      case 'D':

        board[startLocation[0] + i][startLocation[1]] = piece.id;
        break;

    }
  }

  return board;
}

function getPieces(){

  for(let piece in playingPieces){
   let location = '';
   let direction = '';
   let board = playingField;
    while(true){
      location = prompt(`Please enter ${piece} start location (ie: A2)`).toUpperCase();
      direction = prompt(`Please enter ${piece} direction (R, L, U, D)`).toUpperCase();

      playingPieces[piece].start = location.split('');
      playingPieces[piece].direction = direction;


      if(checkValidity(playingPieces[piece], board)){
        break;
      }
    }
    playingField = addPiecesToBoard(playingPieces[piece], playingField);
  }
}

function printPlayingBoard(field){
  let board = '';

  field.forEach(function(element){

    element.forEach(function(element){
      if(element.length == 2){
        board += element + '  ';
      } else {
        board += element + '   ';
      }
    });

    board += '\n';
  });
  console.log(board);
}

function parseInput(coordinates){

  let letterIndex = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  let returnValue = [];
  returnValue = [letterIndex.indexOf(coordinates[0]), Number(coordinates[1] - 1)];
  return returnValue;
}

function populateAIBoard(){

  function getRand(max){
    let a = Math.floor(Math.random() * max);
    return a;
  }

  let tempLocation = ['A', '1'];
  let tempDirection = 'U';

  for(let piece in playingPiecesAI){

    while(true){
      tempLocation[0] = letterIndex[getRand(10)];
      tempLocation[1] = Number(getRand(10));
      tempDirection = directionIndex[getRand(4)];

      playingPiecesAI[piece].start = tempLocation.join('');
      playingPiecesAI[piece].direction = tempDirection;

      if(checkValidity(playingPiecesAI[piece], playingFieldAI)){
        break;
      }
    }
    playingFieldAI = addPiecesToBoard(playingPiecesAI[piece], playingFieldAI);
  }
}

function takeShot(user){

  checkDirection = function(location){
    let inputCheck = (letterIndex.indexOf(location) !== -1);
    return inputCheck;
  };

  function userShot(){
    let shotLocation = '';

    while(true){
      shotLocation = prompt("Enter shot coordinates");

      if(checkDirection(shotLocation[0]) && shotsFiredUser.indexOf(shotLocation) === -1){
        break;
      } else {
        console.log("Must be a valid location");
      }
    }

    shotsFiredUser.push(shotLocation);
    return shotLocation;
  }

  function shotAI(){

    function getRand(max){
      let a = Math.floor(Math.random() * max);
      return a;
    }

    let tempLocation = ['A', '1'];

    while(true){
      tempLocation[0] = letterIndex[getRand(10)];
      tempLocation[1] = Number(getRand(10));
      if(shotsFiredAI.indexOf(tempLocation.join('')) === -1){
        break;
      }
    }
    shotsFiredAI.push(tempLocation.join(''));
    return tempLocation.join('');
  }

  if(user === 'AI'){
    return shotAI();
  } else if(user === 'user') {
    return userShot();
  }
}


getPieces();

printPlayingBoard(playingField);

populateAIBoard();

printPlayingBoard(playingFieldAI);

while(true){
  let userShot = parseInput(takeShot('user'));

  playingField[userShot[0]][userShot[1]] = 'X';

  printPlayingBoard(playingField);

  let aiShot = parseInput(takeShot('AI'));

  playingFieldAI[aiShot[0]][aiShot[1]] = 'X';

  printPlayingBoard(playingFieldAI);

}



