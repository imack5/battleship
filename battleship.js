var prompt = require("prompt-sync")();



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

  for(let piece in playingPieces){
    let location = prompt(`Please enter ${piece} start location (ie: A2)`);
    playingPieces[piece].start = location.split('');
    location = prompt(`Please enter ${piece} end location (ie: A2)`);
    playingPieces[piece].end = location.split('');
  }
}




function printPlayingBoard(field){
  let board = '';

  for(let i = 0; i < field.length; i ++ ){

    for(let j = 0; j < field[i].length; j ++){
      board += playingField[i][j] + ' ';
    }

    board += '\n';
  }
  console.log(board);
}

placePieces();
console.log(playingPieces);
printPlayingBoard(playingField);