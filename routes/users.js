const express = require('express');
const router = express.Router()
const bcrypt = require('bcrypt')
const passport = require('passport')
const User = require('../models/user')


// Login Handler takes them to logging page
router.get('/login', (req, res) => {
  res.render('login')
})

// Register page takes them to registration page
router.get('/register', (req, res) => {
  res.render('Register')
})

// Register Handler this is a template, not the norm
router.post('/register', (req, res) => {
  const {username, email, password, password2} = req.body
  let errors = []
  // console.log(' Name: ' + first_name + ' ' + last_name + ' Email: ' + email + ' Password: ' + password)
  if(!username || !email || !password || !password2) {
    errors.push({msg: 'Please fill in all required fields.'})
  } 
  // Check if match
  if(password !== password2) {
    errors.push({msg: 'Passwords do not match.'})
  }
  // Check if password is less than 6 characters
  if(password.length < 6) {
    errors.push({msg: 'Password must be at least 6 characters'})
  }
  if(errors.length > 0) {
    res.render('register', {
      errors: errors,
      username: username,
      email: email,
      password: password
    })
  } else {
    // Validation Passed
    User.findOne({email: email}).then((err, user) => {
      // console.log(user)
      if(user) {
        errors.push({msg: 'This Email is already in use'});
        res.render(errors, username, email, password, password2);
      } else {
        const newUser = new User({
          username: username,
          email: email,
          password: password
        })
        // Hash Password
        bcrypt.genSalt(10, (err, salt) => 
        bcrypt.hash(newUser.password, salt,
          (err, hash) =>{
            if(err) throw err;
            // save password to hash
            newUser.password = hash;
            // save user
            newUser.save() //mongoose function to save to the database
            .then((value) => {
              req.flash('success_msg', 'You have now registered!')
              res.redirect('/users/login')
            })
            .catch(value => console.log('value: You probably did it'))
          }))
      }
    })
  }
})
// Login
router.post('/login', (req, res, next) => { // Built using the authenticate
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true,
  })(req, res, next)
})

// Logout
router.get('/logout', (req, res) => {
  req.logout(function(err) {
    if (err) { return next(err); }
  })
  res.redirect('/')
})
// If no error and loggout is successful, return to the homepage

module.exports = router;