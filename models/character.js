const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const CharacterSchema = new Schema({
  name: String,
  imageName: String,
  skills: {
    power: Number,
    health: Number,
    mobility: Number,
    technical: Number,
    scope: Number,
  },
});

const Character = model("character", CharacterSchema);

module.exports = Character;
