const express = require('express');
const path = require('path');

const stockTradesController = require('../controllers/stockTradesController');
const cookieController = require('../controllers/cookieController');
const sessionController = require('../controllers/sessionController')

const router = express.Router();

router.get('/', (req,res) => res.status(200).render(path.join(__dirname, '../../client/signup')))

router.post('/', 
  stockTradesController.createUser,
  stockTradesController.createTransactionHistory,
  stockTradesController.createUserStock,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) => res.status(200).redirect('../../user')
);


module.exports = router;