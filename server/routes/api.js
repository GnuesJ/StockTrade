const express = require('express');

const stockTradesController = require('../controllers/stockTradesController');
const sessionController = require('../controllers/sessionController');

const router = express.Router();

router.get('/user', 
  sessionController.isLoggedIn,
  stockTradesController.getUser,
  stockTradesController.getTransactionHistory,
  stockTradesController.getUserStock,
  (req, res) => res.status(200).json(res.locals)
);

// router.post('/user', 
//   stockTradesController.createUser,
//   stockTradesController.createTransactionHistory,
//   stockTradesController.createUserStock,
//   (req, res) => res.status(200).json({})
// );

// router.post('/updateTotalInvested',
//   sessionController.isLoggedIn,
//   stockTradesController.updateTotalInvested,
//   (req, res) => res.status(200).json()
// )

//updateTotalInvested
router.get('/transactionhistory', 
  sessionController.isLoggedIn,
  stockTradesController.getTransactionHistory,
  (req, res) => res.status(200).json(res.locals.transactionHistory)
);

router.patch('/transactionhistory', 
  sessionController.isLoggedIn,
  stockTradesController.addTransactionHistory,
  (req, res) => res.status(200).json({})
);



router.get('/userstock', 
  sessionController.isLoggedIn,
  stockTradesController.getUserStock,
  (req, res) => res.status(200).json(res.locals.userStock)
);

router.patch('/userstock', 
  sessionController.isLoggedIn,
  stockTradesController.updateUserStock,
  (req, res) => res.status(200).json({})
);


router.patch('/addBuyPower',
  sessionController.isLoggedIn,
  stockTradesController.addBuyPower,
  (req, res) => res.status(200).json({})
);

router.post('/transaction', 
  sessionController.isLoggedIn,
  stockTradesController.addTransactionHistory,
  stockTradesController.updateUserStock,
  stockTradesController.updateTotalInvested,
  stockTradesController.getTransactionHistory,
  stockTradesController.getUserStock,
  (req, res) => res.status(200).json(res.locals)
);


router.get('/testing',
  sessionController.isLoggedIn,
  (res, req) => res.status(200).json()
)

module.exports = router;




// router.post('/transactionhistory', 
//   stockTradesController.createTransactionHistory,
//   (req, res) => res.status(200).json({})
// );

// router.post('/userstock', 
//   stockTradesController.createUserStock,
//   (req, res) => res.status(200).json({})
// );
