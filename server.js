const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let notes = {};

app.get('/notes/:code', (req, res) => {
  const code = req.params.code;
  const note = notes[code];
  if (note) {
    res.json({ note });
  } else {
    res.status(404).send({ error: 'Note not found' });
  }
});

app.post('/notes', (req, res) => {
  const note = req.body.note;
  const code = generateCode();
  notes[code] = note;
  res.json({ code });
});

function generateCode() {
  let code = "";
  const possibleCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 5; i++) {
    code += possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
  }
  return code;
}

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
