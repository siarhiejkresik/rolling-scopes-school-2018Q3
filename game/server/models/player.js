/* eslint-disable func-names */
const mongoose = require('mongoose');

const PlayerSchema = mongoose.Schema({
  name: String,
  score: Number,
});

PlayerSchema.statics.findOneOrCreate = async function ({ name }) {
  let player = await this.findOne({ name });

  if (!player) {
    player = await this.create({ name });
  }

  return player;
};

PlayerSchema.statics.update = async function ({ name, score }) {
  const player = await this.findOne({ name });

  if (!player) {
    return;
  }
  if (!player.score || player.score < score) {
    player.score = score;
    await player.save();
  }
};

PlayerSchema.statics.topScores = async function (number) {
  return this.find({ score: { $exists: true } })
    .sort('-score')
    .select('name score')
    .limit(parseInt(number, 10));
};

module.exports = mongoose.model('Player', PlayerSchema);
