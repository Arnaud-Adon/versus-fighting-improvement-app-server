const monggose = require("mongoose");
const passwordHelper = require("../helper/password");
const Schema = monggose.Schema;
const model = monggose.model;

const UserSchema = new Schema({
  username: String,
  email: String,
  birthdayDate: Date,
  country: String,
  password: String,
  createdAt: { type: Date, default: new Date() },
  lastConnexion: { type: Date, default: null },
  imageId: { type: Number, default: null },
  characters: { type: Array, default: [] },
});

UserSchema.pre("save", function (next) {
  //   notify(this.get("email"));
  const user = this;
  passwordHelper.hashPassword(user, next);
});

UserSchema.methods.isEqual = function (password, done) {
  const user = this;
  passwordHelper.comparePassword(password, user.password, done);
};

const UserModel = model("user", UserSchema);

module.exports = UserModel;
