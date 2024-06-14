import { prismaClient } from "../src/prisma-client"

describe('prisma client', () => {
    it('should can create and select fields', async () => {
        const customer = await prismaClient.customer.create({
            data: {
                id: 'jaka',
                name: 'jaka suhandri',
                email: 'jaka@gmail.com',
                phone: '12343423666'
            },
            select: {
                id: true,
                name: true
            }
        })

        expect(customer.id).toBe('jaka')
        expect(customer.name).toBe('jaka suhandri')
        expect(customer.email).toBeUndefined()
        expect(customer.phone).toBeUndefined()
    })

    it('should select fields on findMany', async () => {
        const customers = await prismaClient.customer.findMany({
            select: {
                id: true,
                name: true
            }
        })

        customers.forEach((customer) => {
            expect(customer.id).toBeDefined()
            expect(customer.name).toBeDefined()
            expect(customer.email).toBeUndefined()
            expect(customer.phone).toBeUndefined()
        })
    })
})