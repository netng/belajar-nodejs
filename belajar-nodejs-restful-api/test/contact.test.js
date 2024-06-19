import supertest from "supertest";
import { createContact, createManyContacts, createUser, deleteAllContacts, deleteUser, getContact } from "./test-util.js";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";
import { prismaClient } from "../src/application/database.js";

describe('POST /api/contacts', () => {
    beforeEach(async () => {
        await createUser()
    })

    afterEach(async () => {
        await deleteAllContacts()
        await deleteUser()
    })

    it('should can create a new contact', async () => {
        const response = await supertest(web)
            .post('/api/contacts')
            .set('Authorization', 'test')
            .send({
                first_name: 'test',
                last_name: 'test',
                email: 'test@test.com',
                phone: '0891111111'
            })

        logger.info(response.body)
        
        expect(response.status).toBe(200)
        expect(response.body.data.first_name).toBe('test')
        expect(response.body.data.last_name).toBe('test')
        expect(response.body.data.email).toBe('test@test.com')
        expect(response.body.data.phone).toBe('0891111111')
    });

    it('should reject if contact data is invalid', async () => {
        const response = await supertest(web)
            .post('/api/contacts')
            .set('Authorization', 'test')
            .send({
                first_name: '',
                last_name: 'test',
                email: 'test',
                phone: '0891111111'
            })

        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined()
    });
})

describe('GET /api/contacts/:id', () => {
    beforeEach(async () => {
        await createUser()
        await createContact()
    })

    afterEach(async () => {
        await deleteAllContacts()
        await deleteUser()
    })

    it('should return contact', async () => {
        const contact = await getContact()

        const response = await supertest(web)
            .get('/api/contacts/' + contact.id)
            .set('Authorization', 'test')

        logger.info(response.body)
        
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBe(contact.id)
        expect(response.body.data.first_name).toBe('test')
        expect(response.body.data.last_name).toBe('test')
        expect(response.body.data.email).toBe('test@test.com')
        expect(response.body.data.phone).toBe('0890000000')
    });

    it('should return error 404 if contact not found', async () => {
        const response = await supertest(web)
            .get('/api/contacts/9999')
            .set('Authorization', 'test')

        logger.info(response.body)
        
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    });

    it('should return error 400 if contact id is invalid', async () => {
        const response = await supertest(web)
            .get('/api/contacts/salahid')
            .set('Authorization', 'test')

        logger.info(response.body)
        
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined()
    });

    it('should return error 401 token is invalid', async () => {
        const contact = await getContact()

        const response = await supertest(web)
            .get('/api/contacts/' + contact.id)
            .set('Authorization', 'invalid token')

        logger.info(response.body)
        
        expect(response.status).toBe(401)
        expect(response.body.errors).toBeDefined()
    });
    
});


describe('PUT /api/contacts/:id', () => {
    beforeEach(async () => {
        await createUser()
        await createContact()
    })

    afterEach(async () => {
        await deleteAllContacts()
        await deleteUser()
    })

    it('should can update existing contact', async () => {
        const testContact = await getContact()
        
        const response = await supertest(web)
            .put('/api/contacts/' + testContact.id)
            .set('Authorization', 'test')
            .send({
                first_name: 'nandang',
                last_name: 'sopyan',
                email: 'nandang@gmail.com',
                phone: '123456789'
            })
        
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBe(testContact.id)
        expect(response.body.data.first_name).toBe('nandang')
        expect(response.body.data.last_name).toBe('sopyan')
        expect(response.body.data.email).toBe('nandang@gmail.com')
        expect(response.body.data.phone).toBe('123456789')
    });

    it('should reject if data is invalid', async () => {
        const testContact = await getContact()
        
        const response = await supertest(web)
            .put('/api/contacts/' + testContact.id)
            .set('Authorization', 'test')
            .send({
                first_name: '',
                last_name: 'sopyan',
                email: 'nandang',
                phone: ''
            })
        
        expect(response.status).toBe(400)
    });

    it('should reject if contact not found', async () => {
        const testContact = await getContact()
        
        const response = await supertest(web)
            .put('/api/contacts/' + (testContact.id + 1))
            .set('Authorization', 'test')
            .send({
                first_name: 'nandang',
                last_name: 'sopyan',
                email: 'nandang@gmail.com',
                phone: '123456789'
            })
        
        expect(response.status).toBe(404)
    });
});

describe('DELETE /api/contacts/:id', () => {
    beforeEach(async () => {
        await createUser()
        await createContact()
    })

    afterEach(async () => {
        await deleteAllContacts()
        await deleteUser()
    })

    it('should delete a contact', async () => {
        let testContact = await getContact()

        const response = await supertest(web)
            .delete('/api/contacts/' + testContact.id)
            .set('Authorization', 'test')

        expect(response.status).toBe(200)
        expect(response.body.data).toBe('OK')

        testContact = await getContact()
        expect(testContact).toBeNull()
    });
    

    it('should return 404 if contact not found', async () => {
        let testContact = await getContact()

        const response = await supertest(web)
            .delete('/api/contacts/' + (testContact.id + 1))
            .set('Authorization', 'test')

        expect(response.status).toBe(404)
    });
});

describe('GET /api/contacts', () => {
    beforeEach(async () => {
        await createUser()
        await createManyContacts()
    })

    afterEach(async () => {
        await deleteAllContacts()
        await deleteUser()
    }) 

    it('should can search contact without query params', async () => {
        const response = await supertest(web)
            .get('/api/contacts')
            .set('Authorization', 'test')
        
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBe(10)
        expect(response.body.paging.page).toBe(1)
        expect(response.body.paging.page_size).toBe(10)
        expect(response.body.paging.total_page).toBe(2)
        expect(response.body.paging.total_items).toBe(15)
    });

    it('should can search contact by name', async () => {
        const response = await supertest(web)
            .get('/api/contacts')
            .query({
                name: 'test 1'
            })
            .set('Authorization', 'test')
        
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBe(6)
        expect(response.body.paging.page).toBe(1)
        expect(response.body.paging.page_size).toBe(10)
        expect(response.body.paging.total_page).toBe(1)
        expect(response.body.paging.total_items).toBe(6)
    });

    it('should can search contact by email', async () => {
        const response = await supertest(web)
            .get('/api/contacts')
            .query({
                email: 'test1'
            })
            .set('Authorization', 'test')
        
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBe(6)
        expect(response.body.paging.page).toBe(1)
        expect(response.body.paging.page_size).toBe(10)
        expect(response.body.paging.total_page).toBe(1)
        expect(response.body.paging.total_items).toBe(6)
    });

    it('should can search contact by phone', async () => {
        const response = await supertest(web)
            .get('/api/contacts')
            .query({
                phone: '08900000001'
            })
            .set('Authorization', 'test')
        
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBe(6)
        expect(response.body.paging.page).toBe(1)
        expect(response.body.paging.page_size).toBe(10)
        expect(response.body.paging.total_page).toBe(1)
        expect(response.body.paging.total_items).toBe(6)
    });

    it('should can get contacts at page 1', async () => {
        const response = await supertest(web)
            .get('/api/contacts')
            .query({
                page: 1
            })
            .set('Authorization', 'test')
        
        logger.info(response.body)
        
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBe(10)
        expect(response.body.paging.page).toBe(1)
        expect(response.body.paging.page_size).toBe(10)
        expect(response.body.paging.total_page).toBe(2)
        expect(response.body.paging.total_items).toBe(15)
    });

    it('should can get contacts at page 2', async () => {
        const response = await supertest(web)
            .get('/api/contacts')
            .query({
                page: 2
            })
            .set('Authorization', 'test')
        
        logger.info(response.body)
        
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBe(5)
        expect(response.body.paging.page).toBe(2)
        expect(response.body.paging.page_size).toBe(10)
        expect(response.body.paging.total_page).toBe(2)
        expect(response.body.paging.total_items).toBe(15)
    });

    
});