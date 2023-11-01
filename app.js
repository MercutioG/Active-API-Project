const express = require('express')
const session = require('express-session')
const flash = require('connect-flash')
const morgan = require('morgan')
const passport = require('passport')
require('./config/passport')(passport) //app.js already uses passport so no need to create a const
require('dotenv').config() //every time process.env happens it should call the .env file
const router = express.Router()
const app = express()
const mongoose = require('mongoose')
const expressEJSLayout = require('express-ejs-layouts')

try {
  mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {console.log(`Connected on port: ${process.env.PORT}`)})
  .catch((err) => {console.log(err)})
} catch (err) {

}
//Development Tools
app.use(morgan('tiny'))
// EJS
app.set('view engine', 'ejs')
app.use(expressEJSLayout)
app.use(express.static('/views/public'))
// Body Parser
app.use(express.urlencoded({extended: false}))
// Express Session
app.use(session({
  secret: process.env.SESSION_SECRET, // master key (access session with key)
  resave: true,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
// Use flash messaging - Express
app.use(flash())
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.error = req.flash('error')
  next()
})
// Routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))
app.use('/public', express.static('./views/public'))

app.listen(process.env.PORT)