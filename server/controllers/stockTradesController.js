const models = require('../models/stockTradesModels');

const stockTradesController = {};

stockTradesController.verifyUser = async (req, res, next) => {
  await models.User.findOne({username: req.body.username})
    .then(data => {
      if(data.password != req.body.password)
        next(new Error('invalid password'));
      res.locals.user = data;
      next();
    })
    .catch(err => next({
      log: 'Error in stockTradesController.getUser: failed mongoDB call: ' + err,
      message: { err: 'Error in stockTradesController.getUser, check log for details' }
    }));
}

stockTradesController.getUser = async (req, res, next) => {
  await models.User.findOne({username: req.body.username})
    .then(data => {
      res.locals.user = data;
      next();
    })
    .catch(err => next({
      log: 'Error in stockTradesController.getUser: failed mongoDB call: ' + err,
      message: { err: 'Error in stockTradesController.getUser, check log for details' }
    }));
}

stockTradesController.createUser = async (req, res, next) => {
  await models.User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  })
    .then(data => {
      res.locals.user = data;
      next();
    })
    .catch(err => next({
      log: 'Error in stockTradesController.createUser: failed mongoDB call: ' + err,
      message: { err: 'Error in stockTradesController.createUser, check log for details' }
    }));
}

stockTradesController.getTransactionHistory = async (req, res, next) => {
  await models.TransactionHistory.findOne({id: req.body._id})
    .then(data => {
      res.locals.transactionHistory = data;
      next();
    })
    .catch(err => next({
      log: 'Error in stockTradesController.getTransactionHistory: failed mongoDB call: ' + err,
      message: { err: 'Error in stockTradesController.getTransactionHistory, check log for details' }
    }));
}

stockTradesController.createTransactionHistory = async (req, res, next) => {
  await models.TransactionHistory.create({id: res.locals.user._id})
    .then(data => next())
    .catch(err => next({
      log: 'Error in stockTradesController.addTransactionHistory: failed mongoDB call: ' + err,
      message: { err: 'Error in stockTradesController.addTransactionHistory, check log for details' }
    }));
}


stockTradesController.addTransactionHistory = async (req, res, next) => {
  const {stockName, price, quantity, transaction} = req.body;
  console.log(stockName, price, quantity, transaction);
  await models.TransactionHistory.updateOne(
    {id: req.body._id},
    {$push: 
      {history: {stockName: stockName, price: price, quantity: quantity, transaction: transaction}}
    }
  )
    .then(next())
    .catch(err => next({
      log: 'Error in stockTradesController.addTransactionHistory: failed mongoDB call: ' + err,
      message: { err: 'Error in stockTradesController.addTransactionHistory, check log for details' }
    }));
}

stockTradesController.getUserStock = async (req, res, next) => {
  console.log(req.body._id);
  await models.UserStock.findOne({id: req.body._id})
    .then(data => {
      res.locals.userStock = data;
      next();
    })
    .catch(err => next({
      log: 'Error in stockTradesController.getUserStock: failed mongoDB call: ' + err,
      message: { err: 'Error in stockTradesController.getUserStock, check log for details' }
    }));
}

stockTradesController.createUserStock = async (req, res, next) => {
  await models.UserStock.create({id: res.locals.user._id})
    .then(data => next())
    .catch(err => next({
      log: 'Error in stockTradesController.updateUserStock: failed mongoDB call: ' + err,
      message: { err: 'Error in stockTradesController.updateUserStock, check log for details' }
    }));
}

stockTradesController.updateUserStock = async (req, res, next) => {
  console.log(req.body.stockName, req.body._id, req.body.quantity);
  await models.UserStock.updateOne(
    {id: req.body._id, 'stocks.stockName': {$ne: req.body.stockName}},
    {$push: {
      stocks : {'stockName': req.body.stockName}
    }}
    
  )
    .then()
    .catch(err => next({
      log: 'Error in stockTradesController.updateUserStock: failed mongoDB call: ' + err,
      message: { err: 'Error in stockTradesController.updateUserStock, check log for details' }
    }));

  await models.UserStock.updateOne(
    {id: req.body._id, 'stocks.stockName': req.body.stockName},
    {$inc: {
      "stocks.$.quantity": req.body.quantity
    }},{upsert: true}
  )
    .then()
    .catch(err => next({
      log: 'Error in stockTradesController.updateUserStock: failed mongoDB call: ' + err,
      message: { err: 'Error in stockTradesController.updateUserStock, check log for details' }
    }));
  next();
}

module.exports = stockTradesController;