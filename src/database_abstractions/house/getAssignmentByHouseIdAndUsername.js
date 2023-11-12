module.exports = async (prismaClient, username, houseId) => {
    const dataArray = await prismaClient.userHouseAssignment.findMany({
        where: {
            username,
            houseId,
        },
    });
    if (dataArray.length != 1) {
        return null;
    }
    const data = dataArray[0];

    return {
        id: data.id,
        username: data.username,
        houseId: data.houseId,
        isReviewer: data.isReviewer,
        isAdmin: data.isAdmin
    };
};