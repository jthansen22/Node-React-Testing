const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('User');

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id)
    .then((user) => {
      cb(null, user);
    });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, cb) => {
      User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
          // We already have a record with given profile id
          cb(null, existingUser);
        } else {
          // We don't have a user record with this id. Create new record
          User.create({ googleId: profile.id, googleName: profile.displayName })
            .then(user => cb(null, user));
        }
      });
    }
  )
);
