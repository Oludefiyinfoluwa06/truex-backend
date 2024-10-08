const User = require('../models/user');
const Setting = require('../models/setting');

const getTotalCoins = async () => {
    const users = await User.find();
    const totalCoins = users.reduce((sum, user) => sum + user.coins, 0);
    return totalCoins;
};

const registerUser = async (req, res) => {
    const { username, referrer } = req.body;

    try {
        const existingUser = await User.findOne({ username });

        if (existingUser) return res.status(400).json({ success: false, message: 'Username already exists' });

        const newUser = new User({ username });

        if (referrer) {
            referringUser = await User.findById({ _id: referrer });
            referringUser.referrals.push(newUser._id);
            await referringUser.save();
        }

        await newUser.save();

        return res.json({ success: true, message: 'User registered successfully', user: newUser });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Error registering user' });
    }
};

const getUserData = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        return res.json({ success: true, user });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Error fetching user data' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');

        const userWithMostReferrals = await User.findOne().sort({ referrals: -1 }).select('-password');

        return res.json({
            success: true,
            users,
            totalPlayers: users.length,
            userWithMostReferrals
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Error fetching users' });
    }
};

const earnCoins = async (req, res) => {
    const { userId, coinsEarned } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const setting = await Setting.findOne();
        const totalCoins = await getTotalCoins();

        if (totalCoins > setting.globalEarningLimit) {
            return res.status(400).json({ success: false, message: 'Global earning limit reached. Cannot earn more coins.' });
        }

        user.coins += coinsEarned;
        await user.save();

        return res.json({ success: true, message: 'Coins earned successfully', user });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Error earning coins' });
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

        return res.json({ success: true, message: 'User coins updated successfully', user });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Error updating user coins' });
    }
};

module.exports = {
    registerUser,
    getUserData,
    getAllUsers,
    earnCoins,
    updateUserCoins
};
