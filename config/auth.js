const ensureAuthenticated = (req, res, next) => {
  if(req.isAuthenticated()) {
    next()
  } else {
    req.flash('error_msg', 'Please login to view this resource')
    res.redirect('/users/login')
  }
}




module.exports = {
  ensureAuthenticated
}
// Verifies if the user is logged in, it will return true if they are, otherwise it will send them to the login page