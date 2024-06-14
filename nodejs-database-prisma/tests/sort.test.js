import { prismaClient } from "../src/prisma-client"

describe('Prisma client', () => {
    it('should sort records', async () => {
        const customers = await prismaClient.customer.findMany({
            orderBy: [
                {
                    name: 'desc'
                },
                {
                    email: 'asc'
                }
            ]
        })

        console.info(customers)
    })
})