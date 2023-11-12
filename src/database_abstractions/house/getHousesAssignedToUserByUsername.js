module.exports = async (prismaClient, username) => {
    const data = await prismaClient.userHouseAssignment.findMany({
        where: { username },
    });

    return data.map((d) => ({
        id: d.id,
        username: d.username,
        houseId: d.houseId,
        isReviewer: d.isReviewer,
        isAdmin: d.isAdmin
    }));
};