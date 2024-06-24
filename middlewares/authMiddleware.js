const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ success: false, message: 'No token provided, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await Admin.findById(decoded.id);

        if (!admin) {
            return res.status(401).json({ success: false, message: 'Authorization denied, admin not found' });
        }

        req.admin = admin;
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ success: false, message: 'Token is not valid' });
    }
};

module.exports = authMiddleware;
