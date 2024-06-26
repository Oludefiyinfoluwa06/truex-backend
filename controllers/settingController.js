const Setting = require('../models/setting');

const setGlobalEarningLimit = async (req, res) => {
    const { newLimit } = req.body;

    if (typeof newLimit !== 'number' || newLimit <= 0) {
        return res.status(400).json({ success: false, message: 'Invalid earning limit value' });
    }

    try {
        const setting = await Setting.findOne();
        if (!setting) {
            const newSetting = new Setting({ globalEarningLimit: newLimit });
            await newSetting.save();
            return res.json({ success: true, message: 'Global earning limit set successfully', setting: newSetting });
        }

        setting.globalEarningLimit = newLimit;
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
