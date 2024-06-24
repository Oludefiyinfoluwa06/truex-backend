const Task = require('../models/task');
const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');

// Create a new task
const createTask = async (req, res) => {
    const { title, description, reward } = req.body;

    try {
        const newTask = new Task({ title, description, reward });
        await newTask.save();

        res.json({ success: true, message: 'Task created successfully', task: newTask });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error creating task' });
    }
};

const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ success: false, message: 'Admin not found' });
        }

        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        const { password: _, ...adminWithoutPassword } = admin.toObject();

        res.json({ success: true, message: 'Login successful', token, admin: adminWithoutPassword });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error logging in' });
    }
};

module.exports = {
    createTask,
    loginAdmin
};
