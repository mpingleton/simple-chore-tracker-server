const Joi = require('joi');

const insertHouse = require('../../database_abstractions/house/insertHouse');
const insertUserHouseAssignment = require('../../database_abstractions/house/insertUserHouseAssignment');

const schema = Joi.object({
    params: Joi.object({}),
    query: Joi.object({}),
    body: Joi.object({
        nameDisplay: Joi.string().min(1).max(100).required(),
    }),
});

const handler = (prismaClient) => {
    return async (req, res) => {
        // Create the house in the database.
        const houseData = await insertHouse(prismaClient, req.body.nameDisplay);
        if (houseData === null) {
            res.send(500);
            return;
        }

        // Assign the current user to the newly created house.
        const userHouseAssignmentData = await insertUserHouseAssignment(prismaClient, req.user.username, houseData.nameDisplay, true, true);
        if (userHouseAssignmentData === null) {
            res.send(500);
            return;
        }

        res.send(201);
    };
};

module.exports = { schema, handler };