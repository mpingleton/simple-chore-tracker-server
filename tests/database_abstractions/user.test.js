if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const crypto = require('crypto');
const { PrismaClient } = require('@prisma/client');
const prismaClient = new PrismaClient();

const insertUser = require('../../src/database_abstractions/user/insertUser');
const getUserByUsername = require('../../src/database_abstractions/user/getUserByUsername');

test('Create a user john.doe and update it.', async () => {
    const passphraseHash = crypto.createHash('sha512').update('1234567890').digest('hex');
    const passphraseSaltyHash = crypto.pbkdf2Sync(passphraseHash, process.env.PASSPHRASE_SECRET_KEY, 100000, 64, 'sha512').toString('hex');
    
    const insertUserData = await insertUser(prismaClient, 'john.doe', 'John Doe', passphraseSaltyHash, true);
    expect(insertUserData.username).toEqual('john.doe');
    expect(insertUserData.nameDisplay).toEqual('John Doe');
    expect(insertUserData.passphraseHash).toEqual(passphraseSaltyHash);
    expect(insertUserData.isEnabled).toEqual(true);

    const getUserData = await getUserByUsername(prismaClient, 'john.doe');
    expect(getUserData.username).toEqual('john.doe');
    expect(getUserData.nameDisplay).toEqual('John Doe');
    expect(getUserData.passphraseHash).toEqual(passphraseSaltyHash);
    expect(getUserData.isEnabled).toEqual(true);
});

test('Create a user jane.doe and update it.', async () => {
    const passphraseHash = crypto.createHash('sha512').update('1234567890').digest('hex');
    const passphraseSaltyHash = crypto.pbkdf2Sync(passphraseHash, process.env.PASSPHRASE_SECRET_KEY, 100000, 64, 'sha512').toString('hex');
    
    const insertUserData = await insertUser(prismaClient, 'jane.doe', 'Jane Doe', passphraseSaltyHash, true);
    expect(insertUserData.username).toEqual('jane.doe');
    expect(insertUserData.nameDisplay).toEqual('Jane Doe');
    expect(insertUserData.passphraseHash).toEqual(passphraseSaltyHash);
    expect(insertUserData.isEnabled).toEqual(true);

    const getUserData = await getUserByUsername(prismaClient, 'jane.doe');
    expect(getUserData.username).toEqual('jane.doe');
    expect(getUserData.nameDisplay).toEqual('Jane Doe');
    expect(getUserData.passphraseHash).toEqual(passphraseSaltyHash);
    expect(getUserData.isEnabled).toEqual(true);
});