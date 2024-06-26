const express = require('express');
const router = express.Router();
const { setGlobalEarningLimit } = require('../controllers/settingController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/globalEarningLimit', authMiddleware, setGlobalEarningLimit);

module.exports = router;
