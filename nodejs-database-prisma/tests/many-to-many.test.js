import { prismaClient } from "../src/prisma-client";

describe('Many To Many Relationship', () => {
    it('should be able to insert many to many where a customer can like many products, and a product can liked by many customers ', async () => {
        const likes = await prismaClient.customer.findUnique({
            where: {
                id: 'nandang',
                likes: {
                    some: {
                        product: {
                            name: {
                                equals: 'A' 
                            }
                        }
                    }
                }
            },
            include: {
                likes: {
                    include: {
                        product: true
                    }
                }
            }
        })

        console.log(likes)
    });

    it('should can insert many to many relation', async () => {
        const like = await prismaClient.like.create({
            data: {
                customer_id: 'nandang',
                product_id: 'P0005'
            },
            include: {
                customer: true,
                product: true
            }
        })
        
        console.info(like)
    });

    it('should find with include', async () => {
        const customer = await prismaClient.customer.findUnique({
            where: {
                id: 'nandang'
            },
            include: {
                likes: {
                    include: {
                        product: true
                    }
                }
            }
        })

        console.info(JSON.stringify(customer))
        
    });


    it('should execute raw query',  async () => {
        const customer = await prismaClient.$queryRaw`
            SELECT * FROM customers c
            LEFT JOIN likes l on l.customer_id = c.id
            LEFT JOIN products p on l.product_id = p.id
            WHERE c.id = 'nandang' and
                    p.name LIKE 'A';
        `

        console.info(customer)
    });
})