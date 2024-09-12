const express = require('express');
const router = express.Router();
const { createTask, getTasks, getTask, completeTask, checkUserTaskCompletion, editTask, deleteTask } = require('../controllers/taskController');

router.post('/create', createTask);
router.get('/', getTasks);
router.get('/task/:taskId', getTask);
router.post('/complete', completeTask);
router.post('/checkCompletion', checkUserTaskCompletion);
router.put('/edit/:taskId', editTask);
router.delete('/delete/:taskId', deleteTask);

module.exports = router;
