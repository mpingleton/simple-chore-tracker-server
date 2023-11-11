module.exports = async (prismaClient, username) => {
    const data = await prismaClient.user.findUnique({
        where: { username },
    });
    if (data == null) {
        // The user account with the requested username does not exist.
        return null;
    }

    return {
        username: data.username,
        nameDisplay: data.nameDisplay,
        passphraseHash: data.passphraseHash,
        isEnabled: data.isEnabled,
    };
};