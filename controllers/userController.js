const User = require('../models/user');
const Setting = require('../models/setting');
const getTotalCoins = require('../utils/coinUtils');

const registerUser = async (req, res) => {
    const { username, referrer } = req.body;

    try {
        const newUser = new User({ username });

        if (referrer) {
            referringUser = await User.findOne({ referrer });
            newUser.referrer = referrer;
            referringUser.referrals.push(newUser._id);
            await referringUser.save();
        }

        await newUser.save();

        res.json({ success: true, message: 'User registered successfully', user: newUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error registering user' });
    }
};

const getUserData = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({ success: true, user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error fetching user data' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json({ success: true, users });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error fetching users' });
    }
};

const earnCoins = async (req, res) => {
    const { userId, coinsEarned } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const settings = await Setting.findOne();
        const totalCoins = await getTotalCoins();

        if (totalCoins + coinsEarned > settings.globalEarningLimit) {
            return res.status(400).json({ success: false, message: 'Global earning limit reached. Cannot earn more coins.' });
        }

        user.coins += coinsEarned;
        await user.save();

        res.json({ success: true, message: 'Coins earned successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error earning coins' });
    }
};

const updateUserCoins = async (req, res) => {
    const { userId, newCoins } = req.body;

    if (typeof newCoins !== 'number' || newCoins < 0) {
        return res.status(400).json({ success: false, message: 'Invalid coins value' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        user.totalCoins = newCoins;
        user.coins = 0
        await user.save();

        res.json({ success: true, message: 'User coins updated successfully', user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error updating user coins' });
    }
};

module.exports = {
    registerUser,
    getUserData,
    getAllUsers,
    earnCoins,
    updateUserCoins
};
