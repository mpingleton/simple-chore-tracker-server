const express = require('express');

const session = require('../middleware/session');
const validate = require('../middleware/validate');

const createHouse = require('../handlers/house/createHouse');
const getHousesInUserByUsername = require('../handlers/house/getHousesInUserByUsername');
const getUsersInHouseById = require('../handlers/house/get')

const initHouseRouters = (prismaClient) => {
    const router = express.Router();

    router.put('/', validate(createHouse.schema), session(prismaClient), createHouse.handler(prismaClient));
    router.get('/in/user/:username', validate(getHousesInUserByUsername.schema), session(prismaClient), getHousesInUserByUsername.handler(prismaClient));
    router.get('/id/:houseId/users', validate(getUsersInHouseById.schema), session(prismaClient), getUsersInHouseById.handler(prismaClient));

    return router;
};

module.exports = initHouseRouters;