const { User } = require('../models');

const getUserEmail = (email) => User.findOne({ where: { email } });

const createUserService = async (displayName, email, password, image) => {
        const newUser = await User.create({
            displayName,
            email,
            password,
            image,
        });

        return newUser;
};

const getUsersService = () => User.findAll({ attributes: { exclude: 'password' } });
    
module.exports = { 
    getUserEmail,
    createUserService,
    getUsersService,
};