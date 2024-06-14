import { prismaClient } from "../src/prisma-client"

describe('Prisma client', () => {
    it('should can do paging', async () => {
        const page1 = await prismaClient.customer.findMany({
            take: 1,
            skip: 0
        })

        const page2 = await prismaClient.customer.findMany({
            take: 1,
            skip: 1
        })

        console.log(page1)

        expect(page1.length).toBe(1)
        expect(page2.length).toBe(1)
    })
})