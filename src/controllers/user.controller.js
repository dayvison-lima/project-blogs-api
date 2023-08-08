const jwt = require('jsonwebtoken');
const { getUserEmail, createUserService, getUsersService } = require('../services/user.service');
const { genToken } = require('../middlewares/validationJWT');

const secret = process.env.JWT_SECRET || 'senha';
const jwtConfig = { algorithm: 'HS256', expiresIn: '10h' };
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

        const token = await genToken(payload);

    return res.status(201).json({ token });
    } catch (error) {
        next(error);
    }
};

const getUsers = async (_req, res) => {
    const users = await getUsersService();
    return res.status(200).json(users);
};

module.exports = { 
    loginController,
    createUser,
    getUsers,
 };