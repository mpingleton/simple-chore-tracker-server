if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

module.exports = function() {
    var mayContinue = true;
    if (process.env.HTTP_PORT === null || process.env.HTTP_PORT === undefined) {
        mayContinue = false;
        console.log("Fatal Error: HTTP_PORT environment variable is not initialized.");
    }

    if (process.env.DATABASE_URL === null || process.env.DATABASE_URL === undefined) {
        mayContinue = false;
        console.log("Fatal Error: DATABASE_URL environment variable is not initialized.");
    }

    if (process.env.JWT_SECRET_KEY === null || process.env.JWT_SECRET_KEY === undefined) {
        mayContinue = false;
        console.log("Fatal Error: JWT_SECRET_KEY environment variable is not initialized.");
    }

    if (process.env.PASSPHRASE_SECRET_KEY === null || process.env.PASSPHRASE_SECRET_KEY === undefined) {
        mayContinue = false;
        console.log("Fatal Error: PASSPHRASE_SECRET_KEY environment variable is not initialized.");
    }

    return mayContinue;
}