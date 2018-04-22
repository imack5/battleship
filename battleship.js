let playingField = [
                [0, 0, 0, 0, 0],
                [1, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0]
               ];



//console.log(playingField);

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

printPlayingBoard(playingField);