const express = require('express');
const router = express.Router();
const { registerUser, getUserData, earnCoins } = require('../controllers/userController');

router.post('/register', registerUser);
router.get('/:userId', getUserData);
router.post('/earnCoins', earnCoins);

module.exports = router;
