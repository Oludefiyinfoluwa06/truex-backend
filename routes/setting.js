const express = require('express');
const router = express.Router();
const { setGlobalEarningLimit, getGlobalEarningLimit } = require('../controllers/settingController');
const authMiddleware = require('../middlewares/authMiddleware');

router.put('/globalEarningLimit', authMiddleware, setGlobalEarningLimit);
router.get('/globalEarningLimit', getGlobalEarningLimit);

module.exports = router;
