const express = require('express');
const router = express.Router();
const { registerUser, getUserData, getAllUsers, earnCoins, updateUserCoins } = require('../controllers/userController');

router.post('/register', registerUser);
router.get('/:userId', getUserData);
router.get('/', getAllUsers);
router.post('/earnCoins', earnCoins);
router.put('/updateCoins', updateUserCoins);

module.exports = router;
