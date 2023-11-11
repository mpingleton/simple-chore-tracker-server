if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const Joi = require('joi');

const crypto = require('crypto');
const getUserByUsername = require('../../database_abstractions/user/getUserByUsername');
const insertSession = require('../../database_abstractions/session/insertSession');
const invalidateSessionsForUserByUsername = require('../../database_abstractions/session/invalidateSessionsForUserByUsername');
const generateToken = require('../../services/jwt/generateToken');

const schema = Joi.object({
    params: Joi.object({}),
    query: Joi.object({}),
    body: Joi.object({
        username: Joi.string().required(),
        passphraseHash: Joi.string().min(128).max(128).required(),
    }),
});

const handler = (prismaClient) => {
    return async (req, res) => {
        // Look up the user account by name.
        const userData = await getUserByUsername(prismaClient, req.body.username);
        if (userData == null) {
            // The specified account does not exist.
            res.send(401, { message: "The account doesn't exist." });
            return;
        }

        // Check if the provided password matches what's on the account.
        const passphraseHash = crypto.pbkdf2Sync(req.body.passphraseHash, process.env.PASSPHRASE_SECRET_KEY, 100000, 64, 'sha512').toString('hex');
        if (passphraseHash != userData.passphraseHash) {
            // The password is incorrect.
            res.send(403, { message: "Passphrase is incorrect." });
            return;
        } else if (userData.isEnabled === false) {
            res.send(403, { message: "Account is locked." });
            return;
        }

        // Generate a new token.
        const token = generateToken(userData.username);

        // Invalidate all other sessions that are active for this user, just in case.
        await invalidateSessionsForUserByUsername(prismaClient, userData.username);

        // Create a new session and insert it into the database.
        await insertSession(prismaClient, userData.username, token);

        // Send user profile and session data as a response to the client.
        const responseData = {
            username: userData.username,
            token: token,
        };

        res.send(200, responseData);
    };
};

module.exports = { schema, handler };