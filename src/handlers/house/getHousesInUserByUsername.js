const Joi = require('joi');

const getHousesAssignedToUserByUsername = require('../../database_abstractions/house/getHousesAssignedToUserByUsername');

const schema = Joi.object({
    params: Joi.object({
        username: Joi.string().min(1).max(100).required(),
    }),
    query: Joi.object({}),
    body: Joi.object({}),
});

const handler = (prismaClient) => {
    return async (req, res) => {
        const userAssignmentData = await getHousesAssignedToUserByUsername(prismaClient, req.params.username);
        if (userAssignmentData === null) {
            res.send(500);
            return;
        }

        res.send(200, userAssignmentData);
    };
};

module.exports = { schema, handler };