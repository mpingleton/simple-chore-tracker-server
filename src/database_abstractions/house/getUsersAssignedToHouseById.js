module.exports = async (prismaClient, houseId) => {
    const data = await prismaClient.userHouseAssignment.findMany({
        where: { houseId },
    });

    return data.map((d) => ({
        id: d.id,
        username: d.username,
        houseId: d.houseId,
        isReviewer: d.isReviewer,
        isAdmin: d.isAdmin
    }));
};