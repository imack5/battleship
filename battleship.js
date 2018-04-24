var prompt = require("prompt-sync")();
let letterIndex = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];


let playingPieces = {

  Carrier: {id: 'CA', length: 5},
  Battleship: {id: 'BA', length: 4},
  //Cruiser: {id: 'CR', length: 3},
  //Submarine: {id: 'SU', length 3},
  //Destroyer: {id: 'DE', length: 2}

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

function placePieces(){
  function addPiecesToBoard(piece){

    let startLocation = parseInput(piece.start);

    for(let i = 0; i < piece.length; i ++){
      switch(piece.direction){

        case 'R':

          playingField[startLocation[0]][i + startLocation[1]] = piece.id;
          break;

        case 'L':

          playingField[startLocation[0]][startLocation[1] - i] = piece.id;
          break;

        case 'U':

          playingField[startLocation[0] - i][startLocation[1]] = piece.id;
          break;

        case 'D':

          playingField[startLocation[0] + i][startLocation[1]] = piece.id;
          break;

      }
    }
  }



  function checkValidity(piece){


    checkDirection = function(piece){
      let inputCheck = (['R', 'L', 'U', 'D'].indexOf(piece.direction[0]) !== -1);
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

            if(playingField[startLocation[0]][i + startLocation[1]] !== 0){
              noInterference = false;
            }
            break;

          case 'L':

            if(playingField[startLocation[0]][startLocation[1] - i] !== 0){
              noInterference = false;
            }
            break;

          case 'U':

            if(playingField[startLocation[0] - i][startLocation[1]] !== 0){
              noInterference = false;
            }

            break;

          case 'D':

            if(playingField[startLocation[0] + i][startLocation[1]] !== 0){
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




  for(let piece in playingPieces){
   let location = '';
   let direction = '';

    while(true){
      location = prompt(`Please enter ${piece} start location (ie: A2)`).toUpperCase();
      direction = prompt(`Please enter ${piece} direction (R, L, U, D)`).toUpperCase();

      playingPieces[piece].start = location.split('');
      playingPieces[piece].direction = direction;


      if(checkValidity(playingPieces[piece])){
        break;
      }
    }

    addPiecesToBoard(playingPieces[piece]);
  }
}

function printPlayingBoard(field){
  let board = '';

  playingField.forEach(function(element){

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
  returnValue = [letterIndex.indexOf(coordinates[0]), coordinates[1] - 1];
  return returnValue;
}


console.log(parseInput(['A', '1']));

placePieces();
//console.log(playingPieces);
printPlayingBoard(playingField);





