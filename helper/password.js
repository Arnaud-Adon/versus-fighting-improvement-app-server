const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.hashPassword = function (user, next) {
  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (err) {
      console.log("Cannot generated salt");
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        console.log("Cannot hashed password");
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
};

exports.comparePassword = (externalPassword, userPassword, done) => {
  console.log("externalPassword", externalPassword);
  console.log("userPassword", userPassword);
  bcrypt.compare(externalPassword, userPassword, (err, same) => {
    console.log("comparePassword", same);
    if (err) {
      return done(err);
    }
    return done(null, same);
  });
};
