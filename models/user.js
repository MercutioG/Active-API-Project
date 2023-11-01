const mongoose = require('mongoose');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true, 
    index: true,
  },
  password: {
    type: String,
    required: true
  },
  charges: {
    type: Number,
    default: 0,
  },
  key: {
    type: String,
    default: crypto.randomBytes(16).toString('hex'), // 16 bytes will result in a 32 character hex string
  },
  date: {
    type: Date,
    default: Date.now
  }
}, { collection: 'Users' });

const User = mongoose.model('User', UserSchema);
module.exports = User;