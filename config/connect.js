const mongoose = require('mongoose')

const connectDB = (url) => {
  return mongoose.connect(url, {}) // after the url options are available
}

module.exports = connectDB;