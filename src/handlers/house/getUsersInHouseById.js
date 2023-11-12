const Joi = require('joi');

const getUsersAssignedToHouseById = require('../../database_abstractions/house/getUsersAssignedToHouseById');

const schema = Joi.object({
    params: Joi.object({
        houseId: Joi.number().integer().positive().required(),
    }),
    query: Joi.object({}),
    body: Joi.object({}),
});

const handler = (prismaClient) => {
    return async (req, res) => {
        const userAssignmentData = await getUsersAssignedToHouseById(prismaClient, Number.parseInt(req.params.houseId));
        if (userAssignmentData === null) {
            res.send(500);
            return;
        }

        res.send(200, userAssignmentData);
    };
};

module.exports = { schema, handler };