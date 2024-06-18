import { logger } from "../src/application/logging";
import { web } from "../src/application/web";
import supertest from "supertest";
import { createUser, deleteUser } from "./test-util";



describe('POST /api/users', () => {
    
    afterEach(async () => {
      await deleteUser()
    })
    
    it('should can register new user', async () => {
        const response = await supertest(web)
            .post('/api/users')
            .send({
                username: 'test',
                name: 'test',
                password: 'rahasia'
            })

        logger.info(response.body)

        expect(response.status).toBe(200)
        expect(response.body.data.username).toBe('test')
        expect(response.body.data.name).toBe('test')
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
            username: 'test',
            name: 'test',
            password: 'rahasia'
        })

        expect(response.status).toBe(200)
        expect(response.body.data.username).toBe('test')
        expect(response.body.data.name).toBe('test')
        expect(response.body.data.password).toBeUndefined()

        response = await supertest(web)
        .post('/api/users')
        .send({
            username: 'test',
            name: 'test',
            password: 'rahasia'
        })

        logger.info(response.body)

        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined()
    });
});

describe('POST /api/users/login', () => {
    beforeEach(async () => {
        await createUser()
    })

    afterEach(async () => {
      await deleteUser()
    })

    it('should can do user login', async () => {
        const response = await supertest(web)
            .post('/api/users/login')
            .send({
                username: 'test',
                password: 'rahasia'
            })
        
        logger.info(response.body)

        expect(response.status).toBe(200)
        expect(response.body.data.token).toBeDefined()
        expect(response.body.data.token).not.toBe('test')
    });
    
    it('should reject if login invalid', async () => {
        const response = await supertest(web)
            .post('/api/users/login')
            .send({
                username: '',
                password: ''
            })
        
        logger.info(response.body)

        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined()
    });

    it('should reject if username is wrong', async () => {
        const response = await supertest(web)
            .post('/api/users/login')
            .send({
                username: 'salah',
                password: 'rahasia'
            })
        
        expect(response.status).toBe(401)
        expect(response.body.errors).toBeDefined()
    });

    it('should reject if password is wrong', async () => {
        const response = await supertest(web)
            .post('/api/users/login')
            .send({
                username: 'test',
                password: 'salah'
            })
        
        expect(response.status).toBe(401)
        expect(response.body.errors).toBeDefined()
    });
});