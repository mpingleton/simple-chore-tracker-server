const dayjs = require('dayjs');

module.exports = async (prismaClient, username, token) => {
    const data = await prismaClient.session.create({
        data: {
            username,
            token,
            isActive: true,
            started: dayjs(),
        },
    });

    if (data == null) {
        // Could not insert the session into the database.
        return null;
    }

    return {
        id: data.id,
        username: data.username,
        token: data.token,
        isActive: data.isActive,
        started: data.started,
    };
};