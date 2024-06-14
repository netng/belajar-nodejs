import { prismaClient } from "../src/prisma-client"

// afterAll(async () => {
//     await prismaClient.customer.deleteMany()
// })

describe('Prisma client', () => {
    it('should create many records', async() => {
        const { count } = await prismaClient.customer.createMany({
            data: [
                {
                    id: 'nandang103',
                    name: 'nandang103',
                    email: 'nandang103@gmail.com',
                    phone: '01234758474484'
                },
                {
                    id: 'nandang104',
                    name: 'nandang104',
                    email: 'nandang104@gmail.com',
                    phone: '0123472324384'
                }
            ]
        })

        expect(count).toBe(2)
    })

    it('should can update many records', async () => {
        const { count } = await prismaClient.customer.updateMany({
            data: {
                email: 'nandang103update@gmail.com'
            },
            where: {
                id: 'nandang103'
            }
        })

        expect(count).toBe(1)
    })

    it('should can delete many data', async () => {
        const { count } = await prismaClient.customer.deleteMany({
            where: {
                name: 'tidak ada'
            }
        })

        expect(count).toBe(0)
    })

    it('should can read many record', async () => {
        const record = await prismaClient.customer.findMany({})
        expect(record.length).toBe(2)
    })
})