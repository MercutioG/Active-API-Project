const express = require('express')
const router = express.Router()
const {ensureAuthenticated} = require('../config/auth')


// home page
router.get('/', (req, res) => {
  res.render('./pages/welcome')
})
// register page
router.get('/register', (req, res) => {
  res.render('./pages/register')
})

// dashboard-homepage redirect
router.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.render('./pages/dashboard', {
    user: req.user
  })
}) // Checks whether or not the user is authenticated/logged in, and if so they are sent to the dashboard

module.exports = router;