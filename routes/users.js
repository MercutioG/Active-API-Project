const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const passport = require('passport')
const { userDB, paymentDB } = require('../config/db');
const User = userDB.model('User', require('../models/user'));
const Payment = paymentDB.model('Payment', require('../models/payment'));


router.get('/login', (req, res) => {
  res.render('pages/login')
})

router.get('/register', (req, res) => {
  res.render('pages/register')
})

router.get('/payment', (req, res) => {
  const tempUser = req.session.tempUser;
  if (!tempUser) {
    return res.redirect('/users/register');
  }
  
  res.render('pages/payment', { tempUser });
});


router.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  let errors = [];
  
  if (!username || !email || !password) {
    errors.push({ msg: "Please fill in all fields" });
  }
  
  if (password.length < 6) {
    errors.push({ msg: "Password needs to be at least 6 characters" });
  }
  
  if (errors.length > 0) {
    res.render('pages/register', { errors, username, email, password });
  } else {
    req.session.tempUser = { username, email, password };
    res.redirect('/users/payment');
  }
});

router.post('/payment', async (req, res) => {
  const tempUser = req.session.tempUser;
  if (!tempUser) {
    return res.redirect('/users/register');
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(tempUser.password, salt);
    
    console.log(req.body)

    const newUser = await new User({
      username: tempUser.username,
      email: tempUser.email,
      password: hash
    }).save();
    
    req.flash('success_msg', 'Registration and payment successful!');
    req.session.tempUser = null;
    
    res.redirect('/users/login');
  } catch (err) {
    res.redirect('/users/login');
  }
});



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
