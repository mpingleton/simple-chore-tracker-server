const express = require('express');

const session = require('../middleware/session');
const validate = require('../middleware/validate');

const self = require('../handlers/user/self');

const initUserRouters = (prismaClient) => {
    const router = express.Router();

    router.get('/self', validate(self.schema), session(prismaClient), self.handler(prismaClient));

    return router;
};

module.exports = initUserRouters;