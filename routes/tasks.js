const express = require('express');
const router = express.Router();
const { createTask, getTasks, getTask, completeTask, checkUserTaskCompletion } = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/create', authMiddleware, createTask);
router.get('/', getTasks);
router.get('/task/:taskId', getTask);
router.post('/complete', completeTask);
router.post('/checkCompletion', checkUserTaskCompletion);

module.exports = router;
