const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    totalCoins: { type: Number, default: 0 },
    coins: { type: Number, default: 0 },
    referrer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: '' },
    referrals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    walletAddress: { type: String },
});

module.exports = mongoose.model('User', UserSchema);
