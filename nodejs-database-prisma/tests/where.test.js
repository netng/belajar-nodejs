import { prismaClient } from "../src/prisma-client";

describe('Prisma client', () => {
    it('should can using or operator', async () => {
        const products = await prismaClient.product.findMany({
            where: {
                OR: [
                    { name: 'A' },
                    { name: 'B' }
                ]
            },
            orderBy: {
                name: 'asc'
            }
        })

        console.info(products)
        expect(products).toHaveLength(2)
        expect(products[0].name).toBe('A')
        expect(products[1].name).toBe('B')
    });


    it('should can using or operator using raw query', async () => {
        const products = await prismaClient.$queryRaw`
            SELECT 
                *
            FROM
                products p
            WHERE
                (p.name = 'A' OR p.name = 'B')
            ORDER BY
                p.name ASC

        `

        console.info(products)
        expect(products[0].name).toBe('A')
        expect(products[1].name).toBe('B')
    });
})