import { prismaClient } from "../src/prisma-client";

describe('Prisma client', () => {
    it('should insert comment and include related customer on result', async () => {
        const comment = await prismaClient.comment.create({
            data: {
                customer_id: 'nandang',
                title: 'comment title',
                description: 'comment description'
            },
            include: {
                customer: true
            }
        })

        expect(comment).toHaveProperty('id')
        expect(comment.title).toBe('comment title')
        expect(comment.description).toBe('comment description')
        expect(comment.customer.id).toBe('nandang')
        
    });
    
    it('should can insert and many relation', async () => {
        const customer = await prismaClient.customer.create({
            data: {
                id: 'idham',
                name: 'idham',
                email: 'idham@gmail.com',
                phone: '523497423728',
                comments: {
                    createMany: {
                        data: [
                            {
                                title: 'comment title 1',
                                description: null
                            },
                            {
                                title: 'comment title 2',
                                description: 'comment description 2'
                            }
                        ]
                    }
                }
            },
            include: {
                comments: true
            }
        }) 
        
        console.info(customer)
    })

    it('should return customer with comment containt specific word', async () => {
        const customers = await prismaClient.customer.findMany({
            where: {
                comments: {
                    some: {
                        title: {
                            contains: 'comment'
                        }
                    }
                }
            },
            include: {
                comments: true
            }
        })

        console.log(JSON.stringify(customers))
        
    });
});