import { prismaClient } from "../src/prisma-client"

describe('Prisma Client', () => {
    it('execute raw sql', async () => {
        const id = 2
        const name = 'nandang sopyan;drop table sample;'

        const impacted = await prismaClient.$executeRaw`INSERT INTO sample(id, name) VALUES(${id}, ${name});`

        expect(impacted).toBe(1)
    })
})