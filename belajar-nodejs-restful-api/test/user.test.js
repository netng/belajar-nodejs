import { prismaClient } from "../src/application/database";
import { logger } from "../src/application/logging";
import { web } from "../src/application/web";
import supertest from "supertest";



describe('POST /api/users', () => {
    
    afterEach(async () => {
        await prismaClient.user.deleteMany({
            where: {
                username: 'nandang'
            }
        })
    })
    
    it('should can register new user', async () => {
        const response = await supertest(web)
            .post('/api/users')
            .send({
                username: 'nandang',
                name: 'nandang',
                password: 'rahasia'
            })

        logger.info(response.body)

        expect(response.status).toBe(200)
        expect(response.body.data.username).toBe('nandang')
        expect(response.body.data.name).toBe('nandang')
        expect(response.body.data.password).toBeUndefined()
    })
    
    it('should reject if request is invalid', async () => {
        const response = await supertest(web)
            .post('/api/users')
            .send({
                username: '',
                name: '',
                password: ''
            })
        
        logger.info(response.body)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined()
    });

    it('should reject if user already exists', async () => {
        let response = await supertest(web)
        .post('/api/users')
        .send({
            username: 'nandang',
            name: 'nandang',
            password: 'rahasia'
        })

        expect(response.status).toBe(200)
        expect(response.body.data.username).toBe('nandang')
        expect(response.body.data.name).toBe('nandang')
        expect(response.body.data.password).toBeUndefined()

        response = await supertest(web)
        .post('/api/users')
        .send({
            username: 'nandang',
            name: 'nandang',
            password: 'rahasia'
        })

        logger.info(response.body)
        
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined()
    });
});