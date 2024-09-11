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

        return res.json({ success: true, message: 'Global earning limit updated successfully', setting: updatedSetting });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Error updating global earning limit' });
    }
};

const getGlobalEarningLimit = async (req, res) => {
    try {
        const setting = await Setting.findOne();
        if (!setting) {
            return res.status(404).json({ success: false, message: 'Global earning limit not set' });
        }
        return res.json({ success: true, globalEarningLimit: setting.globalEarningLimit });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Error fetching global earning limit' });
    }
};

module.exports = {
    setGlobalEarningLimit,
    getGlobalEarningLimit
};
