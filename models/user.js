const mongoose = require('mongoose');
const UserSchema  = new mongoose.Schema({
  username :{
    type  : String,
    required : true
  } ,
  email :{
    type  : String,
    required : true
  } ,
  password :{
    type  : String,
    required : true
  } ,
  charges: {
    type : Number,
    default : 0,
  },
  date :{
    type : Date,
    default : Date.now
  }
},{collection : 'Users'});
const User= mongoose.model('User',UserSchema);

module.exports = User;