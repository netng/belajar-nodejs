import { prismaClient } from "../src/prisma-client";

describe('Prisma Client', () => {
    it('shoud be able to run sql select query', async () => {
        const id = 1;

        const samples = await prismaClient.$queryRaw`
            SELECT *
            FROM sample
            WHERE
                id = ${id}
        `

        for (const sample of samples) {
            console.log(`id: ${sample.id}, name: ${sample.name}`)
        }
    })
})