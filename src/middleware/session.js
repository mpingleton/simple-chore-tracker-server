if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const jwt = require('jsonwebtoken');

const getSessionByToken = require('../database_abstractions/session/getSessionByToken');
const getUserByUsername = require('../database_abstractions/user/getUserByUsername');
const decodeToken = require('../services/jwt/decodeToken');

module.exports = (prismaClient) => {
    return async (req, res, nxt) => {
        // Get the token out of the header.
        const authorization = req.headers['authorization'];
        if (authorization == null) {
            res.send(401);
            return;
        }
        const authorizationSplit = authorization.split(' ');
        if (authorizationSplit.length != 2) {
            res.send(401);
            return;
        } else if (authorizationSplit[0] != 'Bearer') {
            res.send(400);
            return;
        }
        const accessToken = authorizationSplit[1];

        // Get the session from the database.
        const sessionData = await getSessionByToken(prismaClient, accessToken);
        if (sessionData === null) {
            res.send(500);
            return;
        }

        // Look up the user from the session.
        const userData = await getUserByUsername(prismaClient, sessionData.username);
        if (userData === null) {
            res.send(500);
            return;
        }

        // Decode the token and verify the decoded username matches the username listed on the session.
        const decodedObject = await decodeToken(accessToken);
        if (decodedObject.username != userData.username) {
            res.send(401);
            return;
        }

        // Make sure the session has not been invalidated.
        if (sessionData.isActive === false) {
            res.send(401);
            return;
        }

        // Attach the user object to the request and move it on.
        req.user = userData;
        nxt();
    };
};