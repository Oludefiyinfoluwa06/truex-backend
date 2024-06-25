const User = require('../models/user');

const registerUser = async (req, res) => {
    const { username } = req.body;

    try {
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const newUser = new User({ username, coins: 0, walletAddress: '' });
        await newUser.save();

        res.status(201).json({ success: true, message: 'User registered successfully', user: newUser });
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

const earnCoins = async (req, res) => {
    const { userId, coinsEarned } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        user.coins += coinsEarned;
        await user.save();

        res.json({ success: true, message: 'Coins earned successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error earning coins' });
    }
};

module.exports = {
    registerUser,
    getUserData,
    earnCoins
};
