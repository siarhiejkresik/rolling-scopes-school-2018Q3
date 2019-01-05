/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const PlayerModel = require('./models/player');

const URL = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/game2018q3';

mongoose.connect(
  URL,
  { useNewUrlParser: true },
);

const PORT = process.env.PORT || 3000;

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE, PUT');
  next();
});

app.use(bodyParser.json());

app.post('/scores', async (req, res) => {
  console.log('scores [post]');
  const { number } = req.body;
  try {
    const records = await PlayerModel.topScores(number);
    res.json(records).end();
    console.log(records);
  } catch (error) {
    res
      .status(500)
      .send(error)
      .end();
  }
});

app.post('/', async (req, res) => {
  console.log('player [post]');
  const { name } = req.body;
  try {
    const player = await PlayerModel.findOneOrCreate({ name });
    res.json(player).end();
  } catch (error) {
    res
      .status(500)
      .send(error)
      .end();
  }
});

app.put('/', async (req, res) => {
  console.log('player [put]');
  const { name, score } = req.body;
  try {
    await PlayerModel.update({ name, score });
    res.end();
  } catch (error) {
    res
      .status(500)
      .send(error)
      .end();
  }
});

app.listen(PORT, () => console.log(`Starting game-2018Q3 server, port: ${PORT}`));
