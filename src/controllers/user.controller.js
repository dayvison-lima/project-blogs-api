const jwt = require('jsonwebtoken');
const { getUserEmail } = require('../services/user.service');

const secret = process.env.JWT_SECRET || 'senha';
const jwtConfig = { algorithm: 'HS256', expiresIn: '1h' };
const validateBody = (email, password) => email && password;

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!validateBody(email, password)) {
            return res.status(400).json({ message: 'Some required fields are missing' });
        }
        const user = await getUserEmail(email);
        // console.log('CONSOLE LOG DO CONTROLER: ', user);
        if (!user || user.password !== password) {
            return res.status(400).json({ message: 'Invalid fields' });
        }

        const token = jwt.sign({ data: user }, secret, jwtConfig);
        return res.status(200).json({ token });
    } catch (error) {
        return res.status(500).json({ message: 'Internal error', error: error.message });
    }
};

module.exports = { loginController };