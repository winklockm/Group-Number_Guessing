const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;
const randomNumFunction = require('./modules/rngGen')

let guessTable = {
  round: 0,
  guess: [],
  message: []
}



let randomNum;

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

// GET & POST Routes go here
app.post('/guess', (req, res) => {
  if (!randomNum) {
    randomNum = randomNumFunction()
    console.log(`randomNum in POST ${randomNum}`)
  };
  guessTable.guess = [];
  guessTable.message = [];
  guessTable.round++;
  console.log('req.body', req.body);
  for (let [player, number] of Object.entries(req.body)) {
    guessTable.guess.push(number);
    if (number > randomNum) {
      guessTable.message.push('Too High! 😛');
    } else if (number < randomNum) {
      guessTable.message.push('Too Low! 😳');
    } else if (Number(number) === randomNum) {
      guessTable.message.push('WINNER')
      console.log('Winner')
    }
  }


  res.sendStatus(201)
})

app.get('/guess', (req, res) => {
  
  
  res.send(guessTable)
})

app.post('/newGame', (req, res) => {
  guessTable.guess = [];
  guessTable.message = [];
  guessTable.round = 0;
  randomNumFunction()
  res.sendStatus(200)
})



app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
})
