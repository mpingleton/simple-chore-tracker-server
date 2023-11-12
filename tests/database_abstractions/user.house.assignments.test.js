if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const crypto = require('crypto');
const { PrismaClient } = require('@prisma/client');
const prismaClient = new PrismaClient();

const insertUser = require("../../src/database_abstractions/user/insertUser");
const insertHouse = require("../../src/database_abstractions/house/insertHouse");
const insertUserHouseAssignment = require('../../src/database_abstractions/house/insertUserHouseAssignment');
const getHousesAssignedToUserByUsername = require('../../src/database_abstractions/house/getHousesAssignedToUserByUsername');
const getUsersAssignedToHouseById = require('../../src/database_abstractions/house/getUsersAssignedToHouseById');

test('Create a couple of houses, a couple of users, and assign those users to those houses.', async () => {
    const passphraseHash = crypto.pbkdf2Sync('1234567890', process.env.PASSPHRASE_SECRET_KEY, 100000, 64, 'sha512').toString('hex');

    const insertUserData1 = await insertUser(prismaClient, 'jane.smith', 'Jane Smith', passphraseHash, true);
    const insertUserData2 = await insertUser(prismaClient, 'dane.smith', 'Dane Smith', passphraseHash, true);
    const insertHouseData1 = await insertHouse(prismaClient, '11 Main St');
    const insertHouseData2 = await insertHouse(prismaClient, '33 Cross St');

    const insertUserHouseAssignmentData1 = await insertUserHouseAssignment(prismaClient, insertUserData1.username, insertHouseData1.id, true, true);
    expect(insertUserHouseAssignmentData1.id).toBeGreaterThan(0);
    expect(insertUserHouseAssignmentData1.username).toEqual(insertUserData1.username);
    expect(insertUserHouseAssignmentData1.houseId).toEqual(insertHouseData1.id);
    expect(insertUserHouseAssignmentData1.isReviewer).toEqual(true);
    expect(insertUserHouseAssignmentData1.isAdmin).toEqual(true);

    const insertUserHouseAssignmentData2 = await insertUserHouseAssignment(prismaClient, insertUserData2.username, insertHouseData1.id, false, false);
    expect(insertUserHouseAssignmentData2.id).toBeGreaterThan(0);
    expect(insertUserHouseAssignmentData2.username).toEqual(insertUserData2.username);
    expect(insertUserHouseAssignmentData2.houseId).toEqual(insertHouseData1.id);
    expect(insertUserHouseAssignmentData2.isReviewer).toEqual(false);
    expect(insertUserHouseAssignmentData2.isAdmin).toEqual(false);

    const insertUserHouseAssignmentData3 = await insertUserHouseAssignment(prismaClient, insertUserData2.username, insertHouseData2.id, true, true);
    expect(insertUserHouseAssignmentData3.id).toBeGreaterThan(0);
    expect(insertUserHouseAssignmentData3.username).toEqual(insertUserData2.username);
    expect(insertUserHouseAssignmentData3.houseId).toEqual(insertHouseData2.id);
    expect(insertUserHouseAssignmentData3.isReviewer).toEqual(true);
    expect(insertUserHouseAssignmentData3.isAdmin).toEqual(true);

    const getUsersAssignedToHouse1 = await getUsersAssignedToHouseById(prismaClient, insertHouseData1.id);
    expect(getUsersAssignedToHouse1.length).toEqual(2);

    const getUsersAssignedToHouse2 = await getUsersAssignedToHouseById(prismaClient, insertHouseData2.id);
    expect(getUsersAssignedToHouse2.length).toEqual(1);
});
