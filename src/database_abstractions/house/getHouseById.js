module.exports = async (prismaClient, id) => {
    const data = await prismaClient.house.findUnique({
        where: { id },
    });

    return {
        id: data.id,
        nameDisplay: data.nameDisplay
    };
};