const mongoose = require('mongoose');
require('dotenv').config();

const userDB = mongoose.createConnection(process.env.USER_MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const paymentDB = mongoose.createConnection(process.env.PAYMENT_MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

userDB.on('connected', () => {
  console.log('Connected to User MongoDB Cluster');
});

userDB.on('error', (err) => {
  console.error('User MongoDB Cluster connection error:', err);
});

paymentDB.on('connected', () => {
  console.log('Connected to Payment MongoDB Cluster');
});

paymentDB.on('error', (err) => {
  console.error('Payment MongoDB Cluster connection error:', err);
});

module.exports = { userDB, paymentDB };
