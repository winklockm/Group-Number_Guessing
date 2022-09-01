$(document).ready(handleReady);

function handleReady() {
  console.log("jquery is loaded!")
  $('#play-btn').on('click', grabInputs)
  $('#reset-btn').on('click', newGame)
}

function grabInputs() {
  let player1Guess = $('#player1Input').val();
  let player2Guess = $('#player2Input').val();
  let player3Guess = $('#player3Input').val();
  let player4Guess = $('#player4Input').val();
  $('input').val('')
  $.ajax({
    type: 'POST',
    url: '/guess',
    data: {player1Guess, player2Guess, player3Guess, player4Guess}
  }).then(function(response) {
    renderGuesses();
  })
}

function renderGuesses() {
  //add empty table here if needed
  $.ajax({
    type: 'GET',
    url: '/guess'
  }).then(function(guessTable){
    if (guessTable.message.includes('WINNER')) {
      
      $('#reset-btn').show()
      $('#play-btn').prop('disabled', true)
    }
    $('#tableBody').append(`
      <tr>
        <td>${guessTable.round}</td>
        <td>${guessTable.guess[0]} | ${guessTable.message[0]}</td>
        <td>${guessTable.guess[1]} | ${guessTable.message[1]}</td>
        <td>${guessTable.guess[2]} | ${guessTable.message[2]}</td>
        <td>${guessTable.guess[3]} | ${guessTable.message[3]}</td>
      </tr>
        `)
      $('#tallyNum').empty().append(`${guessTable.round + 1}`)
  })
}

function newGame() {
  $('#play-btn').prop('disabled', false)
  $('#reset-btn').hide()
  $.ajax({
    type: 'POST',
    url: '/newGame'
  }).then(function(response) {
    $('#tableBody').empty();
    $('#tallyNum').empty().append(1)
  })
}

//