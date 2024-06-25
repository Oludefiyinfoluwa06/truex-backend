const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    coins: { type: Number, default: 0 },
    referrals: { type: Number, default: 0 },
    walletAddress: { type: String },
});

module.exports = mongoose.model('User', UserSchema);
