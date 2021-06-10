const express = require('express');
const path = require('path');

const stockTradesController = require('../controllers/stockTradesController');
const cookieController = require('../controllers/cookieController');
const sessionController = require('../controllers/sessionController');

const router = express.Router();

router.post('/', 
  stockTradesController.verifyUser,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) => {
    console.log('login hererererere')
    res.status(200).redirect('../../user')
  }
)

module.exports = router;