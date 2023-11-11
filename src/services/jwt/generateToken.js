if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const jwt = require('jsonwebtoken');

module.exports = (username) => {
    return jwt.sign({ username }, process.env.JWT_SECRET_KEY);
};