const express = require('express');
const router = express.Router();
const { createTask, getTasks, completeTask } = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/create', authMiddleware, createTask);
router.get('/', getTasks);
router.post('/complete', completeTask);

module.exports = router;
