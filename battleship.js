var prompt = require("prompt-sync")();
let letterIndex = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];


let playingPieces = {

  carrier: {id: 'CA', length: 3},
  //battleship: {id: 'BA', length: 4},
  //cruiser: {id: 'CR', length: 3},
  //submarine: {id: 'SU', length 3},
  //destroyer: {id: 'DE', length: 2}

};


let playingField = [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0]
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

  for(let piece in playingPieces){

    let location = prompt(`Please enter ${piece} start location (ie: A2)`).toUpperCase();
    playingPieces[piece].start = location.split('');
    console.log(playingPieces[piece].start)
    //ADD: Check to see if it is a valid entry

    location = prompt(`Please enter ${piece} direction (R, L, U, D)`).toUpperCase();
    playingPieces[piece].direction = location;
    console.log(playingPieces[piece].direction)
    //ADD: Check to see if it is a valid entry

    console.log(playingPieces[piece])
    addPiecesToBoard(playingPieces[piece]);
  }
}

function printPlayingBoard(field){
  let board = '';

  playingField.forEach(function(element){

    element.forEach(function(element){
      board += element + '  ';
    });

    board += '\n';
  });
  console.log(board);
}

function parseInput(coordinates){

  let letterIndex = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  let returnValue = [];

  letterIndex.forEach(function(element, index){

    if(coordinates[0] == element){
     returnValue = [index, Number(coordinates[1]) - 1];

    }
  });

  return returnValue;
}


console.log(parseInput(['A', '1']));

placePieces();
//console.log(playingPieces);
printPlayingBoard(playingField);





