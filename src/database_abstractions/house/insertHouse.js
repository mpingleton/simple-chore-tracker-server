module.exports = async (prismaClient, nameDisplay) => {
    const data = await prismaClient.house.create({
        data: { nameDisplay },
    });

    return {
        id: data.id,
        nameDisplay: data.nameDisplay
    };
};