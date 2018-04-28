let letterIndex = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

function createBoard(){
  let $row = $("<tr>");
  let $cell = $("<td>")
  let $pinLocation = $("<div>").addClass("pin-location");


  for(let i = 0; i < 10; i ++){
    $row = $("<tr>").addClass(String(i));
    $("#userBoard").append($row);

    for(let j = 0; j < 10; j ++){
      $cell = $("<td>").attr('id', `${i}${j}`);
      $(`#userBoard .${i}`).append($cell);
    }
  }

  $("td").append($pinLocation);
}

$(document).ready(function(){
  createBoard();
  $('#userBoard').on('click', 'td', function(event){
    $('#' + event.target.id).toggleClass("colored")
  });
});