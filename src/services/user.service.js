const { User } = require('../models');

const getUserEmail = (email) => User.findOne({ where: { email } });
    
module.exports = { 
    getUserEmail,
};