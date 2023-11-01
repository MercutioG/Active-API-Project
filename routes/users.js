const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const passport = require('passport')
const User = require('../models/user')

router.get('/login', (req, res) => {
  res.render('pages/login')
})

router.get('/register', (req, res) => {
  res.render('pages/register')
})

router.post('/register', (req, res)=>{
  const {username, email, password, password2} = req.body;
  let errors = [];
  console.log(username, email, password, password2)
  if(!username || !email || !password || !password2){
      errors.push({msg: "Please fill in all fields"})
  }
  // check if match
  if(password !== password2){
      errors.push({msg: "Passwords do not match"})
  }

  // check if password is less than 6 characters
  if(password.length < 6){
      errors.push({msg: "Password needs to be at least 6 characters"})
  }

  if(errors.length > 0){
      res.render('pages/register', {
          errors: errors,
          username: username,
          email: email,
          password: password
      })
  } else {
      User.findOne({email: email}).then((err, user)=>{
          if(user){
              errors.push({msg: "This email has aleady been registered"})
              res.render('pages/register', {
                  errors: errors,
                  username: username,
                  email: email,
                  password: password
              })
          } else {
              const newUser = new User({
                  username: username,
                  email: email,
                  password: password
              })

              bcrypt.genSalt(10, (err, salt)=>
              bcrypt.hash(newUser.password,salt,
                  ((err,hash)=> {
                      if(err) throw err;
                      console.log(newUser)
                      // save pass to hash
                      newUser.password = hash
                      console.log(newUser)
                      newUser.save()
                      .then((value)=>{
                          req.flash('success_msg', 'You have onw registered!')
                          res.redirect('/users/login')
                      })
                          .catch(value =>{ req.flash('success_msg', 'You have onw registered!')
                          res.redirect('/users/login')})
                  })
                  )
              )
          }
      })
  }
})

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next)
})

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return next(err)
    req.flash('success_msg', 'You are logged out')
    res.redirect('/')
  })
})

module.exports = router
