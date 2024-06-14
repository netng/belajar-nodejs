import { prismaClient } from "../src/prisma-client";

describe('Prisma client', () => {
    it('should be able to create a record with auto-increment primary key', async () => {
        const category = await prismaClient.category.create({
            data: {
                name: 'Food'
            }
        })

        console.log(category)
        expect(category).toHaveProperty('id')
        expect(category.name).toBe('Food')
    });
    
});