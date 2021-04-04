const Character = require("../models/character");

exports.getCharacters = async function (req, res, next) {
  await Character.find({}, (err, characters) => {
    if (err) {
      return next(err);
    }
    if (!characters) {
      return res
        .status(404)
        .send({ message: "Character not exist in database" });
    } else {
      return res.send({ characters: characters });
    }
  });
};
