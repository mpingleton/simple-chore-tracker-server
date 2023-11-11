module.exports = async (prismaClient, token) => {
    const data = await prismaClient.session.findUnique({
        where: { token },
    });
    if (data == null) {
        // Session was not found.
        return null;
    }

    return {
        token: data.token,
        isActive: data.isActive,
        started: data.started,
        username: data.username
    };
};