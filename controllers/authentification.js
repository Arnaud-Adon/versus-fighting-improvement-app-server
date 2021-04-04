const User = require("../models/user");
const jwt = require("jwt-simple");
const lodash = require("lodash");
const config = require("../config");
const passport = require("passport");
require("../services/passport");

function getTokenFromUser(user) {
  const timeStamp = new Date().getTime();
  return jwt.encode(
    {
      sub: user._id,
      iat: timeStamp,
    },
    config.jwtKey
  );
}

exports.signup = function (req, res, next) {
  const username = req.body.username;
  const email = req.body.email;
  const birthdayDate = req.body.birthdayDate;
  const country = req.body.country;
  const password = req.body.password;
  const createdAt = new Date();

  User.findOne({ username: username }, function (err, existingUser) {
    if (err) {
      return next(err);
    }
    if (existingUser) {
      return res.status(422).send({ message: "L'utilisateur existe déjà" });
    }
    if (
      lodash.isEmpty(username) ||
      lodash.isEmpty(email) ||
      lodash.isEmpty(birthdayDate) ||
      lodash.isEmpty(country) ||
      lodash.isEmpty(password)
    ) {
      return res.status(422).send({ message: "L'une des donnée est vide" });
    } else {
      const user = new User({
        username: username,
        email: email,
        birthdayDate: birthdayDate,
        country: country,
        password: password,
        createdAt: createdAt,
      });

      user.save(function (err, user) {
        if (err) {
          return next(err);
        } else {
          return res.json({ user: user, token: getTokenFromUser(user) });
        }
      });
    }
  });
};

exports.signin = function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res
        .status(404)
        .send({ message: "les identifiants ne sont pas correctes" });
    } else {
      User.updateOne(
        { username: user.username },
        { lastConnexion: new Date() },
        {},
        function (err, updateUser) {
          if (err) {
            return next(err);
          }
          if (updateUser) {
            User.findOne(
              { username: user.username },
              function (err, modifiedUser) {
                if (err) {
                  return next(err);
                }
                if (modifiedUser) {
                  return res.json({
                    user: modifiedUser,
                    token: getTokenFromUser(modifiedUser),
                  });
                } else {
                  return res
                    .status(404)
                    .send({ message: "cannot found user modified" });
                }
              }
            );
          } else {
            return res
              .status(404)
              .send({ message: "cannot update lastConnexion for user" });
          }
        }
      );
    }
  })(req, res, next);
};
