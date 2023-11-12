const express = require('express');

const initAuthRouters = require('./auth');
const initUserRouters = require('./user');
const initHouseRouters = require('./house');

const initApiRouters = (prismaClient) => {
    const router = express.Router();

    router.use('/auth', initAuthRouters(prismaClient));
    router.use('/users', initUserRouters(prismaClient));
    router.use('/houses', initHouseRouters(prismaClient));

    return router;
};

module.exports = initApiRouters;