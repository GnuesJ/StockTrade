const mongoose = require('mongoose');

// const MONGO_URI = 'mongodb+srv://codesmith:codesmith@cluster0.mr7jz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

// mongoose.connect((MONGO_URI), {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   dbName: 'stocktrades'
// })
//   .then(() => console.log('Connected to Mongo DB'))
//   .catch(err => console.log(err));

  const Schema = mongoose.Schema;

  const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstName: String,
    lastName: String,
    buyPower: {type: Number, default: 0},
    totalInvested: {type: Number, default: 0}

  })

  const User = mongoose.model('user', userSchema);


  const transactionHistorySchema = new Schema({
    id: {type: String, required: true, unique: true},
    history: [{
      stockName: {type: String, required: true},
      price: {type: Number, required: true},
      quantity: {type: Number, required: true},
      transaction: {type: String, required: true},
      date: {type: Date, default: Date.now}
    }]
  })

  const TransactionHistory = mongoose.model('transactionHistory', transactionHistorySchema);


  const userStockSchema = new Schema({
    id: {type: String, required: true, unique: true},
    stocks: [{
      stockName: {type: String, required: true},
      quantity: {type: Number, required: true, default: 0},
    }]
  })


  const UserStock = mongoose.model('userStock', userStockSchema);

  module.exports = {
    User,
    TransactionHistory,
    UserStock
  }