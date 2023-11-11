const Joi = require('joi');

const getUserByUsername = require('../../database_abstractions/user/getUserByUsername');

const schema = Joi.object({
    params: Joi.object({}),
    query: Joi.object({}),
    body: Joi.object({}),
});

const handler = (prismaClient) => {
    return async (req, res) => {
        const userData = await getUserByUsername(prismaClient, req.user.username);
        if (userData == null) {
            res.send(500);
            return;
        }

        const responseData = { username: userData.username };

        res.send(200, responseData);
    };
};

module.exports = { schema, handler };