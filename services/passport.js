const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const config = require("../config");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtKey,
};

passport.use(
  new LocalStrategy(function (username, password, done) {
    User.findOne({ username: username }, function (error, user) {
      if (error) {
        return done(error);
      }
      if (!user) {
        return done(null, false, { message: "Le pseudo n'est pas correcte" });
      }
      user.isEqual(password, function (err, same) {
        console.log("same", same);
        if (err) {
          return done(err);
        }
        if (!same) {
          return done(null, false, {
            message: "Le mot de passe est incorrectes",
          });
        } else {
          return done(null, user);
        }
      });
    });
  })
);

passport.use(
  new JwtStrategy(options, function (payload, done) {
    User.findOne({ _id: payload.sub }, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);
