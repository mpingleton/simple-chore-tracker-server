if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const jwt = require('jsonwebtoken');

module.exports = async (token) => {
    var decodedObject = undefined;
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            decodedObject = null;
        } else {
            decodedObject = decoded;
        }
    });

    return decodedObject;
};