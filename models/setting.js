const mongoose = require('mongoose');

const SettingSchema = new mongoose.Schema({
    globalEarningLimit: { type: Number, required: true, default: 40000000 }
}, { timestamps: true });

module.exports = mongoose.model('Setting', SettingSchema);
