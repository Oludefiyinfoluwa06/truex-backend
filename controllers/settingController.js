const Setting = require('../models/setting');

const setGlobalEarningLimit = async (req, res) => {
    const { newLimit } = req.body;

    if (newLimit <= 0) {
        return res.status(400).json({ success: false, message: 'Invalid earning limit value' });
    }

    try {
        const setting = new Setting({ globalEarningLimit: limit });

        await setting.save();

        res.json({ success: true, message: 'Global earning limit updated successfully', setting });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error updating global earning limit' });
    }
};

module.exports = {
    setGlobalEarningLimit
};
