const express = require('express');

const session = require('../middleware/session');
const validate = require('../middleware/validate');

const loginUsernameAndPassphrase = require('../handlers/auth/loginUsernameAndPassphrase');
const logout = require('../handlers/auth/logout');

const initAuthRouters = (prismaClient) => {
    const router = express.Router();

    router.post('/login', validate(loginUsernameAndPassphrase.schema), loginUsernameAndPassphrase.handler(prismaClient));
    router.post('/logout', validate(logout.schema), session(prismaClient), logout.handler(prismaClient));

    return router;
};

module.exports = initAuthRouters;