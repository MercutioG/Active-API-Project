const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user');

// Passport is used to verify usernames and passwords
module.exports = function(passport) {
  passport.use(
    new LocalStrategy({username: 'email', passwordField: 'password', passReqToCallback: false, session: true}, (email, password, done) => {
      console.log('Local Strat Works')
      // match user
      User.findOne({email: email})
      .then((user) => {
        if(!user) {
          return done(null, false, {message: 'that email is not registered'})
        }
        //match pass
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if(err) throw err;

          if(isMatch) {
            console.log(email + ' ' + password)
            return done(null, user);
          } else {
            return done(null, false, {message: 'Pass Incorrect'})
          }
        })
      })
      .catch((err) => console.log(err))
    })
  )




// Serializing saves the user id to the session, and the deserialization grabs that id (function(ID, done){})

  // These are to handle login sessions
  passport.serializeUser(function(user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function(id, done) {
    User.findById(id).then((err, user) => {
      console.log(err)
      if(err) return done(err)
      done(user, err)
    }).catch( (err => {console.log(err)}))
  })
}