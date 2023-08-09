const jwt = require('jsonwebtoken');
const { 
    getUserEmail,
    createUserService,
    getUsersService,
    getUserByIdService,
 } = require('../services/user.service');
const { genToken } = require('../middlewares/validationJWT');

const secret = process.env.JWT_SECRET || 'senha';
const jwtConfig = { algorithm: 'HS256', expiresIn: '10d' };
const validateBody = (email, password) => email && password;

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!validateBody(email, password)) {
            return res.status(400).json({ message: 'Some required fields are missing' });
        }
        const user = await getUserEmail(email);
        
        if (!user || user.password !== password) {
            return res.status(400).json({ message: 'Invalid fields' });
        }

        const token = jwt.sign({ data: user }, secret, jwtConfig);
        return res.status(200).json({ token });
    } catch (error) {
        return res.status(500).json({ message: 'Internal error', error: error.message });
    }
};

const createUser = async (req, res, next) => {
    try {
        const { displayName, email, password, image } = req.body;
        const existingEmail = await getUserEmail(email);
        if (existingEmail) {
            return res.status(409).json({ message: 'User already registered' });
        }
        const newUser = await createUserService(displayName, email, password, image);

        const { _password, ...payload } = newUser.dataValues;

        console.log('CONSOLE LOG PAYLOAD CREATE USER: ', payload);

        const token = await genToken(payload);

        console.log('CONSOLE LOG DO TOKEN: ', token);

    return res.status(201).json({ token });
    } catch (error) {
        next(error);
    }
};

const getUsers = async (_req, res) => {
    const users = await getUsersService();
    return res.status(200).json(users);
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await getUserByIdService(id);

        if (!user) {
            return res.status(404).json({ message: 'User does not exist' });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
    }
};

module.exports = { 
    loginController,
    createUser,
    getUsers,
    getUserById,
 };