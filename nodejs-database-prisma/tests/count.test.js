import { prismaClient } from "../src/prisma-client";

describe('prism client', () => {
    it('should can count', async () => {
        const count = await prismaClient.customer.count({
            where: {
                name: 'nandang103'
            }
        })

        expect(count).toBe(2)
    });
});