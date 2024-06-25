const Task = require('../models/task');
const User = require('../models/user');

const createTask = async (req, res) => {
    const { title, description, reward } = req.body;

    try {
        const newTask = new Task({ title, description, reward, completedBy: [] });
        await newTask.save();

        res.json({ success: true, message: 'Task created successfully', task: newTask });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error creating task' });
    }
};

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json({ success: true, tasks });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error fetching tasks' });
    }
};

const getTask = async (req, res) => {
    const { taskId } = req.params;

    try {
        const task = await Task.findById(taskId);
        res.json({ success: true, task });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error fetching task' });
    }
};

const completeTask = async (req, res) => {
    const { userId, taskId } = req.body;

    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }

        if (task.completedBy.includes(userId)) {
            return res.status(400).json({ success: false, message: 'Task already completed by this user' });
        }

        task.completedBy.push(userId);
        await task.save();

        const user = await User.findById(userId);
        user.totalCoins += task.reward;
        await user.save();

        res.json({ success: true, message: 'Task completed successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error completing task' });
    }
};

const checkUserTaskCompletion = async (req, res) => {
    const { userId, taskId } = req.body;

    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }

        const hasCompleted = task.completedBy.includes(userId);
        res.json({ success: true, hasCompleted });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error checking task completion' });
    }
};

const editTask = async (req, res) => {
    const { taskId } = req.params;
    const { title, description, reward } = req.body;

    try {
        const task = await Task.findByIdAndUpdate(
            taskId,
            { title, description, reward },
            { new: true, runValidators: true }
        );

        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }

        res.json({ success: true, message: 'Task updated successfully', task });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error updating task' });
    }
};

const deleteTask = async (req, res) => {
    const { taskId } = req.params;

    try {
        const task = await Task.findByIdAndDelete(taskId);

        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }

        res.json({ success: true, message: 'Task deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error deleting task' });
    }
};

module.exports = {
    createTask,
    getTasks,
    getTask,
    completeTask,
    checkUserTaskCompletion,
    editTask,
    deleteTask
};
