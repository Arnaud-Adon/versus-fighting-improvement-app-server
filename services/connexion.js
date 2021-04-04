const mongoose = require("mongoose");
const config = require("../config");
const createCharacters = require("../scripts/database/insertCharacter");

const CONNECT_DATABASE_URL = `mongodb+srv://${config.dbUser}:${config.dbPassword}@${config.cluster}/${config.dbName}?retryWrites=true&w=majority`;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

module.exports = async function () {
  try {
    await mongoose.connect(CONNECT_DATABASE_URL, options);
    console.log("-------------- Server connected to database ---------------");
    createCharacters();
  } catch (error) {
    console.log("Cannot connect database");
  }
};
