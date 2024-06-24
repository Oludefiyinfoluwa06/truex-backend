const express = require('express');
const router = express.Router();
const { createTask, loginAdmin } = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/login', loginAdmin);
router.post('/tasks', authMiddleware, createTask);

module.exports = router;
