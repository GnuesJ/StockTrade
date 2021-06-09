const models = require('../models/sessionModel');

const sessionController = {};

sessionController.isLoggedIn = async (req, res, next) => {
  // req.cookie
  if(!req.cookies){
    next();
  }
  await models.Session.findOne({cookieId: req.cookies.SSID})
    .then(data => {
      // if()
      // console.log(data, 'result');
      if(!data){
        next(new Error('Invalid cookie'))
      }
      req.body._id = data.cookieId
      console.log(req.body._id,'adding');

      next();
    })
    .catch(err => next({
      log: 'Error in sessionController.isLoggedIn: failed mongoDB call: ' + err,
      message: { err: 'Error in sessionController.isLoggedIn, check log for details' }
    }))
};

sessionController.startSession = async (req, res, next) => {
  // const {cookieId, searchId}
  await models.Session.deleteOne({cookieId: res.locals.user._id})
    .then()
    .catch(err => next({
      log: 'Error in sessionController.startSession: failed mongoDB call: ' + err,
      message: { err: 'Error in sessionController.startSession, check log for details' }
    }))


  await models.Session.create({cookieId: res.locals.user._id})
  .then(next())
  .catch(err => next({
      log: 'Error in sessionController.startSession: failed mongoDB call: ' + err,
      message: { err: 'Error in sessionController.startSession, check log for details' }
  }))
};

module.exports = sessionController;