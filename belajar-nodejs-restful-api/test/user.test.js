import { logger } from "../src/application/logging";
import { web } from "../src/application/web";
import supertest from "supertest";
import { createUser, deleteUser, getUser } from "./test-util";
import bcrypt from 'bcrypt'



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

describe('GET /api/users/current', () => {
    beforeEach(async () => {
        await createUser()
    })

    afterEach(async () => {
      await deleteUser()
    })

    it('should get current logged in user', async () => {
        const response = await supertest(web)
            .get('/api/users/current')
            .set('Authorization', 'test')
        
        logger.info(response)
        
        expect(response.status).toBe(200)
        expect(response.body.data.username).toBe('test')
        expect(response.body.data.name).toBe('test')
    });

    it('should reject if token invalid', async () => {
        const response = await supertest(web)
            .get('/api/users/current')
            .set('Authorization', 'salah')
        
        logger.info(response)
        
        expect(response.status).toBe(401)
        expect(response.body.errors).toBeDefined()
    });
    
});

describe('PATH /api/users/current', () => {
    beforeEach(async () => {
        await createUser()
    })

    afterEach(async () => {
      await deleteUser()
    })

    it('should can update current user', async () => {
        const response = await supertest(web)
            .patch('/api/users/current')
            .set('Authorization', 'test')
            .send({
                name: 'nandang',
                password: 'rahasialagi'
            })
        
        expect(response.status).toBe(200)
        expect(response.body.data.username).toBe('test')
        expect(response.body.data.name).toBe('nandang')

        const user = await getUser()
        expect(await bcrypt.compare('rahasialagi', user.password)).toBe(true)
    });

    it('should can update current user name', async () => {
        const response = await supertest(web)
            .patch('/api/users/current')
            .set('Authorization', 'test')
            .send({
                name: 'nandang'
            })
        
        expect(response.status).toBe(200)
        expect(response.body.data.username).toBe('test')
        expect(response.body.data.name).toBe('nandang')
    });

    it('should can update current user password', async () => {
        const response = await supertest(web)
            .patch('/api/users/current')
            .set('Authorization', 'test')
            .send({
                password: 'rahasialagi'
            })
        
        expect(response.status).toBe(200)
        expect(response.body.data.username).toBe('test')
        expect(response.body.data.name).toBe('test')

        const user = await getUser()
        expect(await bcrypt.compare('rahasialagi', user.password)).toBe(true)
    });

    it('should reject if invalid request token', async () => {
        const response = await supertest(web)
            .patch('/api/users/current')
            .set('Authorization', 'invalid')
            .send({
                name: 'nandang',
                password: 'rahasialagi'
            })
        
        expect(response.status).toBe(401)
        expect(response.body.errors).toBeDefined()
    });
});


describe('DELETE /api/users/logout', () => {
    beforeEach(async () => {
        await createUser()
    })

    afterEach(async () => {
      await deleteUser()
    })

    it('should can logout', async () => {
        const response = await supertest(web)
            .delete('/api/users/logout')
            .set('Authorization', 'test')
        
        logger.info(response)
            
        const user = await getUser()
            
        expect(response.status).toBe(200)
        expect(response.body.data).toBe('OK')
        expect(user.token).toBeNull()
    });

    it('should reject if token is invalid', async () => {
        const response = await supertest(web)
            .delete('/api/users/logout')
            .set('Authorization', 'invalid')
        
        const user = await getUser()
            
        expect(response.status).toBe(401)
    });
});