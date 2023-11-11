if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const validateEnv = require('./validateEnv');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const initApiRouters = require('./routers');

async function init() {
    if (!validateEnv()) {
        throw "Some environment variables are found to be missing.";
    }

    const port = process.env.HTTP_POST;
    app.use(bodyParser.json());
    app.use(cors());
    app.use('/api', initApiRouters(prisma));
    app.listen(port);
}

init()
    .then(() => console.log('Simple Chore Tracker is now running.'))
    .catch((err) => console.log('Execution ended becuase of an error: ' + err));