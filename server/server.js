const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

let guessTable = {
  round: 1,
  guess: [1],
  message: ['low']
}

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

// GET & POST Routes go here
app.post('/guess', (req, res) => {
  res.sendStatus(201)
})

app.get('/guess', (req, res) => {
  res.send(guessTable)
})



app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
})
