const mongoose = require('mongoose');
const PaymentSchema  = new mongoose.Schema({
  // security number, zip, state, city, country, address, userID
  name :{
    type  : String,
    required : true
  } ,
  card_number :{
    type : String,
    pattern : "^\d{4}[[:blank:]||-]?\d{4}[[:blank:]||-]?\d{4}[[:blank:]||-]?\d{4}$",
    required : true
  },
  expiration_date :{
    type : string,
    pattern : "^\d{2}\/\d{2}$",
    required : true
  },
  cvc_code :{
    type : String,
    pattern : "\d{3}",
    required : true
  },
  zip :{
    type : Number,
    min: 5,
    max: 5,
    required : true
  },
  state :{
    type : String,
    required : true
  },
  country :{
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
const Payment = mongoose.model('User', PaymentSchema);

module.exports = Payment;