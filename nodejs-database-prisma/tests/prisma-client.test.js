import { PrismaClient } from "@prisma/client";

describe('Prisma Client', () => {
    it('should be able connect to database', async () => {
        const prisma = new PrismaClient()
        prisma.$connect()


        // Do something

        prisma.$disconnect()
    })
})