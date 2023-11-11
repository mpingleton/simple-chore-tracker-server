module.exports = async (prismaClient, username, nameDisplay, passphraseHash, isEnabled) => {
    const data = await prismaClient.user.create({
        data: {
            username,
            nameDisplay,
            passphraseHash,
            isEnabled
        },
    });

    return {
        username: data.username,
        nameDisplay: data.nameDisplay,
        passphraseHash: data.passphraseHash,
        isEnabled: data.isEnabled
    };
};