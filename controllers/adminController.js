const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/admin');
const transporter = require('../config/emailConfig');

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

        return res.json({ success: true, message: 'Login successful', token, admin: adminWithoutPassword });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Error logging in' });
    }
};

const generateResetCode = () => {
    return Math.floor(1000 + Math.random() * 9000);
};

const requestResetCode = async (req, res) => {
    const { email } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ success: false, message: 'Admin not found' });
        }

        const resetCode = generateResetCode();

        admin.resetCode = resetCode;
        await admin.save();

        const mailOptions = {
            from: 'truexgold@gmail.com',
            to: email,
            subject: 'Password Reset Code',
            text: `Your password reset code is: ${resetCode}`
        };

        await transporter.sendMail(mailOptions);

        return res.json({ success: true, message: 'Reset code sent to your email' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Error sending reset code' });
    }
};

const resetPassword = async (req, res) => {
    const { email, resetCode, newPassword } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        
        if (!admin) {
            return res.status(404).json({ success: false, message: 'Admin not found' });
        }

        if (admin.resetCode !== resetCode) {
            return res.status(400).json({ success: false, message: 'Invalid reset code' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        await Admin.findByIdAndUpdate(admin._id, { password: hashedPassword, resetCode: null }, { new: true });

        return res.json({ success: true, message: 'Password reset successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Error resetting password' });
    }
};

module.exports = {
    loginAdmin,
    requestResetCode,
    resetPassword
};
