const Character = require("../../models/character");
const CharacterList = require("../../fixtures/characterFixtures");

module.exports = function () {
  try {
    Character.collection.countDocuments({}, (err, number) => {
      if (err) {
        console.log("A error was occured: ", error);
      }
      if (!(number > 0)) {
        Character.insertMany(CharacterList, (err, characters) => {
          if (err) {
            console.log("A error was occured: ", error);
          }
          if (characters.length > 0) {
            console.log("All characters has been added");
          } else {
            console.log("Characters already been added");
          }
        });
      }
    });
  } catch (error) {
    console.log("Cannot lunch this script: ", error);
  }
};
