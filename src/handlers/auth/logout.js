const Joi = require('joi');

const invalidateSessionsForUserByUsername = require('../../database_abstractions/session/invalidateSessionsForUserByUsername');

const schema = Joi.object({
    params: Joi.object({}),
    query: Joi.object({}),
    body: Joi.object({}),
});

const handler = (prismaClient) => {
    return async (req, res) => {
        await invalidateSessionsForUserByUsername(prismaClient, req.user.username);
        res.send(200);
    };
};

module.exports = { schema, handler };