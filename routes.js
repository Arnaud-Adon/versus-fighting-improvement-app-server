const authController = require("./controllers/authentification");
const characterController = require("./controllers/character");
const userController = require("./controllers/user");
const passport = require("passport");
require("./services/passport");

const requireToken = passport.authenticate("jwt", { session: false });

module.exports = function (app) {
  app.post("/signup", authController.signup);
  app.post("/signin", authController.signin);
  app.get("/characters", characterController.getCharacters);
  app.post("/add-character", requireToken, userController.addCharacter);
  app.post("/get-note", requireToken, userController.getNote);
  app.post("/add-note", requireToken, userController.addNote);
  app.post("/update-note", requireToken, userController.updateNote);
  app.post("/delete-note", requireToken, userController.deleteNote);
};
