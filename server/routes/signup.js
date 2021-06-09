const express = require('express');

const stockTradesController = require('../controllers/stockTradesController');
const cookieController = require('../controllers/cookieController');
const sessionController = require('../controllers/sessionController')

const router = express.Router();

router.post('/', 
  stockTradesController.createUser,
  stockTradesController.createTransactionHistory,
  stockTradesController.createUserStock,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) => res.status(200).json({})
);


module.exports = router;