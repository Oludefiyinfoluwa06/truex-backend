const express = require('express');
const router = express.Router();
const { loginAdmin, requestResetCode, resetPassword } = require('../controllers/adminController');

router.post('/login', loginAdmin);
router.post('/requestResetCode', requestResetCode);
router.post('/resetPassword', resetPassword);

module.exports = router;
