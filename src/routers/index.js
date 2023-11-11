const express = require('express');

const initAuthRouters = require('./auth');
const initUserRouters = require('./user');

const initApiRouters = (prismaClient) => {
    const router = express.Router();

    router.use('/auth', initAuthRouters(prismaClient));
    router.use('/users', initUserRouters(prismaClient));

    return router;
};

module.exports = initApiRouters;