module.exports = async (prismaClient, username, houseId, isReviewer, isAdmin) => {
    const data = await prismaClient.userHouseAssignment.create({
        data: {
            username,
            houseId,
            isReviewer,
            isAdmin
        },
    });

    return {
        id: data.id,
        username: data.username,
        houseId: data.houseId,
        isReviewer: data.isReviewer,
        isAdmin: data.isAdmin
    };
};