const express = require('express')
const router = express.Router()
const {ensureAuthenticated} = require('../config/auth')


// home page
router.get('/', (req, res) => {
  res.render('./pages/login')
})
router.get('/payment-method', (req, res) => {
  res.render('./pages/payment')
})
// register/login page
router.get('/register', (req, res) => {
  res.render('./pages/register')
})
router.get('/login', (req, res) => {
  res.render('./pages/login')
})

// dashboard-homepage redirect
router.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.render('./pages/dashboard', {
    user: req.user
  })
}) // Checks whether or not the user is authenticated/logged in, and if so they are sent to the dashboard

module.exports = router;