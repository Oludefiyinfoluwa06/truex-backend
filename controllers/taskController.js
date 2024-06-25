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
        user.coins += task.reward;
        await user.save();

        res.json({ success: true, message: 'Task completed successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error completing task' });
    }
};

module.exports = {
    createTask,
    getTasks,
    completeTask
};
