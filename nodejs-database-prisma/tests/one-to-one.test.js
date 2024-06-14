import { prismaClient } from "../src/prisma-client";

describe('Prisma client', () => {
    it('should be able to create one to one relation', async () => {
        const wallet = await prismaClient.wallet.create({
            data: {
                id: 'nandang',
                balance: 1000_000,
                customer_id: 'nandang'
            },
            include: {
                customer: true
            }
        })

        console.info(wallet)
        
    })

    it('should be able to create one to one relation between customer and wallet', async () => {
        const customer = await prismaClient.customer.create({
            data: {
                id: 'kazu',
                name: 'kazunius',
                email: 'kazu@gmail.com',
                phone: '657464567',
                wallet: {
                    create: {
                        id: 'kazu',
                        balance: 10_000_000
                    }
                }
            },
            include: {
                wallet: true
            }
        })

        console.info(customer)
    });

    it('should be able to find customer that only has wallet', async () => {
        const customer = await prismaClient.customer.findMany({
            where: {
                wallet: {
                    isNot: null
                }
            },
            include: {
                wallet: true
            }
        })

        console.log(customer)
    })
})
