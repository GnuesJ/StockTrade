const express = require('express');

const stockTradesController = require('../controllers/stockTradesController');
const cookieController = require('../controllers/cookieController');
const sessionController = require('../controllers/sessionController');

const router = express.Router();

router.get('/', 
  stockTradesController.verifyUser,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) => res.status(200).json(res.locals.user)
)

module.exports = router;