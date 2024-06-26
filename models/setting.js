const mongoose = require('mongoose');

const SettingSchema = new mongoose.Schema({
    globalEarningLimit: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Setting', SettingSchema);
