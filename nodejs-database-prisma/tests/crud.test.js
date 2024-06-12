import { prismaClient } from "../src/prisma-client"

describe('prisma client crud', () => {
    it('should insert a new data', async () => {
        const customer = await prismaClient.customer.create({
            data: {
                id: 'nandang1',
                name: 'nandang sopyan',
                email: 'nandang@email.com',
                phone: '012345678'
            }
        })

        expect(customer.id).toBe('nandang1')
        expect(customer.name).toBe('nandang sopyan')
        expect(customer.email).toBe('nandang@email.com')
        expect(customer.phone).toBe('012345678')
    })

    it('should be able to update data', async () => {
        const updatedCustomer = await prismaClient.customer.update({
            data: {
                name: 'nandang sopyan updated'
            },
            where: {
                id: 'nandang1'
            }
        })

        expect(updatedCustomer.name).toBe('nandang sopyan updated')
    })

    it('should be able to read data', async () => {
        const customer = await prismaClient.customer.findUnique({
            where: {
                id: 'nandang1'
            }
        })

        expect(customer.id).toBe('nandang1')
        expect(customer.name).toBe('nandang sopyan updated')
    })

    it('should be able to delete data', async () => {
        const customer = await prismaClient.customer.delete({
            where: {
                id: 'nandang1'
            }
        })

        expect(customer.id).toBe('nandang1')
    })
} )