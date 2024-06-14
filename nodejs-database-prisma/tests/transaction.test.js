import { prismaClient } from "../src/prisma-client"

describe('Prisma client', () => {
    it('can execute transactional sequential', async () => {
        const [nandang, sopyan] = await prismaClient.$transaction([
            prismaClient.customer.create({
                data: {
                    id: Math.random(Math.floor() * 999).toString(),
                    email: 'nandang@gmail.com',
                    name: 'nandang',
                    phone: '0987654321'
                }
            }),

            prismaClient.customer.create({
                data: {
                    id: Math.random(Math.floor() * 999).toString(),
                    email: 'sopyan@gmail.com',
                    name: 'sopyan',
                    phone: '09876543212'
                },

            })
        ])


        expect(nandang.name).toBe('nandang')
        expect(sopyan.name).toBe('sopyan')


    })


    it('can execute transactional interactive transaction', async () => {
        const [nandang10, nandang20] = await prismaClient.$transaction(async (prisma) => {
            const nandang10 = await prisma.customer.create({
                data: {
                    id: 'nandang10',
                    name: 'nandang 10',
                    email: 'nandang10@gmail.com',
                    phone: '09878787565'
                }
            })

            const nandang20 = await prisma.customer.create({
                data: {
                    id: 'nandang20',
                    name: 'nandang 20',
                    email: 'nandang20@gmail.com',
                    phone: '098787845455'
                }
            })

            return [nandang10, nandang20]
        })

        expect(nandang10.name).toBe('nandang 10')
        expect(nandang20.name).toBe('nandang 20')
    })
})