const validator = require('validator');

const createUserMiddleware = (req, res, next) => {
    const { displayName, email, password } = req.body;
    let messageErro = '';
    if (displayName.length < 8) {
        messageErro = '"displayName" length must be at least 8 characters long';
        return res.status(400).json({ message: messageErro });
    }
    if (!validator.isEmail(email)) {
        messageErro = '"email" must be a valid email';
        return res.status(400).json({ message: messageErro });
    }
    if (password.length < 6) {
        messageErro = '"password" length must be at least 6 characters long';
        return res.status(400).json({ message: messageErro });
    }

    next();
};

module.exports = {
    createUserMiddleware,
};