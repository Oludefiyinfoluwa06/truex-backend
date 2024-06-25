const User = require('../models/user');

const getTotalCoins = async () => {
    const users = await User.find();
    const totalCoins = users.reduce((sum, user) => sum + user.coins, 0);
    return totalCoins;
};

module.exports = { getTotalCoins };