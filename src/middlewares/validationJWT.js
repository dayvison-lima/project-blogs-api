const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'senha';
const jwtConfig = { algorithm: 'HS256', expiresIn: '10d' };

const genToken = async (email) => {
    const payload = { data: email };
    const token = jwt.sign(payload, secret, jwtConfig);
    return token;
};

const validadeToken = (token) => jwt.verify(token, secret);

const validadeJWT = (req, res, next) => {
        const { authorization: token } = req.headers;
        
        const token2 = token && token.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: 'Token not found' });
        }

        try {
            const payload = validadeToken(token2);
            if (payload) {
                next();
            }
        } catch (error) {
            return res.status(401).json({ message: 'Expired or invalid token' });
        }
};

const validadeCategoryJWT = (req, res, next) => {
    const { authorization: token } = req.headers;
    
    if (!token) {
        return res.status(401).json({ message: 'Token not found' });
    }

    try {
        const payload = validadeToken(token);
        if (payload) {
            next();
        }
    } catch (error) {
        return res.status(401).json({ message: 'Expired or invalid token' });
    }
};

module.exports = {
    genToken,
    validadeToken,
    validadeJWT,
    validadeCategoryJWT,
};