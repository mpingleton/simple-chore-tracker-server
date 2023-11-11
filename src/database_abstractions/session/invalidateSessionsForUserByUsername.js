module.exports = async (prismaClient, username) => {
    const data = await prismaClient.session.updateMany({
        data: {
            isActive: false
        },
        where: {
            username,
        },
    });
};