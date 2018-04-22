var prompt = require("prompt-sync")();
let letterIndex = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];


let playingPieces = {

  carrier: {id: 'CA'},
  //battleship: {id: 'BA'},
  //cruiser: {id: 'CR'},
  //submarine: {id: 'SU'},
  //destroyer: {id: 'DE'}

};


let playingField = [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0]
                   ];

function placePieces(){
  function addPiecesToBoard(){
    //playingField
  }

  for(let piece in playingPieces){

    let location = prompt(`Please enter ${piece} start location (ie: A2)`).toUpperCase();
    playingPieces[piece].start = location.split('');

    //ADD: Check to see if it is a valid entry

    location = prompt(`Please enter ${piece} end location (ie: A2)`).toUpperCase();
    playingPieces[piece].end = location.split('');

    //ADD: Check to see if it is a valid entry
  }
}

function printPlayingBoard(field){
  let board = '';

  playingField.forEach(function(element){

    element.forEach(function(element){
      board += element + ' ';
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
     returnValue = [index, Number(coordinates[1])];
    }
  });

  return returnValue;
}

console.log(parseInput(['A', '1']))

//placePieces();
//console.log(playingPieces);
printPlayingBoard(playingField);





