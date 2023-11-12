if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const { PrismaClient } = require('@prisma/client');
const prismaClient = new PrismaClient();

const insertHouse = require('../../src/database_abstractions/house/insertHouse');
const getHouseById = require('../../src/database_abstractions/house/getHouseById');

test('Create a house called 12 Main St and update it.', async () => {
    const insertHouseData = await insertHouse(prismaClient, '12 Main St');
    expect(insertHouseData.id).toBeGreaterThan(0);
    expect(insertHouseData.nameDisplay).toEqual('12 Main St');

    const getHouseData = await getHouseById(prismaClient, insertHouseData.id);
    expect(getHouseData.id).toEqual(insertHouseData.id);
    expect(getHouseData.nameDisplay).toEqual('12 Main St');
});

test('Create a house called 23 Cross St and update it.', async () => {
    const insertHouseData = await insertHouse(prismaClient, '23 Cross St');
    expect(insertHouseData.id).toBeGreaterThan(0);
    expect(insertHouseData.nameDisplay).toEqual('23 Cross St');

    const getHouseData = await getHouseById(prismaClient, insertHouseData.id);
    expect(getHouseData.id).toEqual(insertHouseData.id);
    expect(getHouseData.nameDisplay).toEqual('23 Cross St');
});