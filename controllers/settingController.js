const Setting = require('../models/setting');

const setGlobalEarningLimit = async (req, res) => {
    const { limit } = req.body;

    if (limit <= 0) {
        return res.status(400).json({ success: false, message: 'Invalid earning limit value' });
    }

    try {
        const updatedSetting = await Setting.findOneAndUpdate(
            {},
            { $set: { globalEarningLimit: limit } },
            { new: true, upsert: true }
        );

        res.json({ success: true, message: 'Global earning limit updated successfully', setting: updatedSetting });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error updating global earning limit' });
    }
};

module.exports = {
    setGlobalEarningLimit
};
