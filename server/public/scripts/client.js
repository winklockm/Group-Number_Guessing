$(document).ready(handleReady);

function handleReady() {
  console.log("jquery is loaded!")
  $('#play-btn').on('click', grabInputs)
}

function grabInputs() {
  let player1Guess = $('#player1Input').val();
  let guessArr = [player1Guess];
  $.ajax({
    type: 'POST',
    url: '/guess',
    data: [player1Guess]
  }).then(function(response) {
    //function here to call get route
  })
}

function renderGuesses() {
  //add empty table here if needed
  $.ajax({
    type: 'GET',
    url: '/guess'
  }).then(function(guessTable){
    $('#tableBody').append(`
      <tr>
        <td>${guessTable.round}</td>
        <td>${guessTable.guess[0]} | ${guessTable.message[0]}</td>
        <td>${guessTable.guess[1]} | ${guessTable.message[1]}</td>
        <td>${guessTable.guess[2]} | ${guessTable.message[2]}</td>
        <td>${guessTable.guess[3]} | ${guessTable.message[3]}</td>
      </tr>
        `)
  })
}

//