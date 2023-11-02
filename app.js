const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
const mongoose = require('mongoose');
const expressEJSLayout = require('express-ejs-layouts');
require('./config/passport')(passport);
require('dotenv').config();

const app = express();
app.use(morgan('tiny'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressEJSLayout);
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'views', 'public')));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/api', require('./routes/api'));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

