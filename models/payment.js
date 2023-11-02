const mongoose = require('mongoose');
const PaymentSchema  = new mongoose.Schema({
  name_on_card:{
    type  : String,
    required : true
  } ,
  expiry_date :{
    type : String,
    required : true
  },
  card_number :{
    type : String,
    required : true
  },
  ccv :{
    type : String,
    required : true
  },
  email :{
    type : String,
    required : true
  },
  country :{
    type : String,
    required : true
  },
  city :{
    type : String,
    required : true
  },
  state :{
    type : String,
    required : true
  },
  zip :{
    type : Number,
    required : true
  },
  street_address :{
    type : String,
    required : true
  },
  userID :{
    type : String,
    required : true
  },
  date :{
    type : Date,
    default : Date.now
  }
},{collection : 'Payment'});

module.exports = PaymentSchema;