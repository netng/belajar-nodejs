import supertest from "supertest";
import { createAddress, createContact, createUser, deleteAllAddresses, deleteAllContacts, deleteUser, getAddress, getContact } from "./test-util.js";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";
import { add } from "winston";

describe('POST /api/contacts/:contactId/addresses', () => {
    beforeEach(async () => {
        await createUser()
        await createContact()
    })

    afterEach(async () => {
        await deleteAllAddresses()
        await deleteAllContacts()
        await deleteUser()
    })

    it('should can create a new contact', async () => {
        const testContact = await getContact()

        const response = await supertest(web)
            .post('/api/contacts/' + testContact.id + '/addresses')
            .set('Authorization', 'test')
            .send({
                street: 'jalan test',
                city: 'kota test',
                province: 'provinsi test',
                country: 'indonesia',
                postal_code: '123123'
            })

        logger.info(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.street).toBe('jalan test')
        expect(response.body.data.city).toBe('kota test')
        expect(response.body.data.province).toBe('provinsi test')
        expect(response.body.data.country).toBe('indonesia')
        expect(response.body.data.postal_code).toBe('123123')
        
    });

    it('should reject if address is invalid with http status 400', async () => {
        const testContact = await getContact()

        const response = await supertest(web)
            .post('/api/contacts/' + testContact.id + '/addresses')
            .set('Authorization', 'test')
            .send({
                street: 'jalan test',
                city: 'kota test',
                province: 'provinsi test',
                country: '',
                postal_code: ''
            })

        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined()
    });

    it('should reject if contact is not found with http status 404', async () => {
        const testContact = await getContact()

        const response = await supertest(web)
            .post('/api/contacts/' + (testContact.id + 1) + '/addresses')
            .set('Authorization', 'test')
            .send({
                street: 'jalan test',
                city: 'kota test',
                province: 'provinsi test',
                country: 'indonesia',
                postal_code: '123123'
            })

        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    });
    
});

describe('GET /api/contacts/:contactId/addresses/:addressId', () => {
    beforeEach(async () => {
        await createUser()
        await createContact()
        await createAddress()
    })

    afterEach(async () => {
        await deleteAllAddresses()
        await deleteAllContacts()
        await deleteUser()
    })

    it('should return contact address', async () => {
        const contact = await getContact()     
        const address = await getAddress()

        const response = await supertest(web)
            .get('/api/contacts/' + contact.id + '/addresses/' + address.id)
            .set('Authorization', 'test')

        logger.info(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.street).toBe('jalan test')
        expect(response.body.data.city).toBe('kota test')
        expect(response.body.data.province).toBe('provinsi test')
        expect(response.body.data.country).toBe('indonesia')
        expect(response.body.data.postal_code).toBe('123123')     
    })

    it('should return 404 if contact not found', async () => {
        const contact = await getContact()     
        const address = await getAddress()

        const response = await supertest(web)
            .get('/api/contacts/' + (contact.id + 1) + '/addresses/' + address.id)
            .set('Authorization', 'test')

        logger.info(response.body)
        expect(response.status).toBe(404)
    });

    it('should return 404 if address not found', async () => {
        const contact = await getContact()     
        const address = await getAddress()

        const response = await supertest(web)
            .get('/api/contacts/' + contact.id + '/addresses/' + (address.id + 1))
            .set('Authorization', 'test')

        logger.info(response.body)
        expect(response.status).toBe(404)
    });
});

describe('PUT /api/contacts/:contactId/addresses/:addressId', () => {
    beforeEach(async () => {
        await createUser()
        await createContact()
        await createAddress()
    })

    afterEach(async () => {
        await deleteAllAddresses()
        await deleteAllContacts()
        await deleteUser()
    })

    it('should update current address in database', async () => {
        const contact = await getContact()     
        const address = await getAddress()

        const response = await supertest(web)
            .put('/api/contacts/' + contact.id + '/addresses/' + address.id)
            .set('Authorization', 'test')
            .send({
                street: 'jalan',
                city: 'kota',
                province: 'provinsi',
                country: 'indo',
                postal_code: '112233'             
            })
        
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBe(address.id)
        expect(response.body.data.street).toBe('jalan')
        expect(response.body.data.city).toBe('kota')
        expect(response.body.data.province).toBe('provinsi')
        expect(response.body.data.country).toBe('indo')
        expect(response.body.data.postal_code).toBe('112233')          
    })

    it('should reject and return 400 if data address is invalid', async () => {
        const contact = await getContact()     
        const address = await getAddress()

        const response = await supertest(web)
            .put('/api/contacts/' + contact.id + '/addresses/' + address.id)
            .set('Authorization', 'test')
            .send({
                street: 'jalan',
                city: 'kota',
                province: 'provinsi',
                country: '',
                postal_code: ''             
            })
        
        expect(response.status).toBe(400)
    })

    it('should reject and return 404 if contact is not found', async () => {
        const contact = await getContact()     
        const address = await getAddress()

        const response = await supertest(web)
            .put('/api/contacts/' + (contact.id + 1) + '/addresses/' + address.id)
            .set('Authorization', 'test')
            .send({
                street: 'jalan',
                city: 'kota',
                province: 'provinsi',
                country: 'indo',
                postal_code: '112233'             
            })
        
        expect(response.status).toBe(404)
    })

    it('should reject and return 404 if address is not found', async () => {
        const contact = await getContact()     
        const address = await getAddress()

        const response = await supertest(web)
            .put('/api/contacts/' + contact.id + '/addresses/' + (address.id + 1))
            .set('Authorization', 'test')
            .send({
                street: 'jalan',
                city: 'kota',
                province: 'provinsi',
                country: 'indo',
                postal_code: '112233'             
            })
        
        expect(response.status).toBe(404)
    })
});


describe('DELETE /api/contacts/:contactId/addresses/:addressId', () => {
    beforeEach(async () => {
        await createUser()
        await createContact()
        await createAddress()
    })

    afterEach(async () => {
        await deleteAllAddresses()
        await deleteAllContacts()
        await deleteUser()
    })

    it('should can destroy address in database', async () => {
        const contact = await getContact()     
        let address = await getAddress()

        const response = await supertest(web)
            .delete('/api/contacts/' + contact.id + '/addresses/' + address.id)
            .set('Authorization', 'test')
        
        logger.info(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data).toBe('OK')

        address = await getAddress()
        expect(address).toBeNull()
    })

    it('should reject and return 404 if contact is not found', async () => {
        const contact = await getContact()     
        const address = await getAddress()

        const response = await supertest(web)
            .delete('/api/contacts/' + (contact.id + 1) + '/addresses/' + address.id)
            .set('Authorization', 'test')
        
        expect(response.status).toBe(404)
    })

    it('should reject and return 404 if address is not found', async () => {
        const contact = await getContact()     
        const address = await getAddress()

        const response = await supertest(web)
            .delete('/api/contacts/' + contact.id + '/addresses/' + (address.id + 1))
            .set('Authorization', 'test')
        
        expect(response.status).toBe(404)
    })
});

describe("GET /api/contacts/:contactId/addresses", () => {
    beforeEach(async () => {
        await createUser()
        await createContact()
        await createAddress()
    })

    afterEach(async () => {
        await deleteAllAddresses()
        await deleteAllContacts()
        await deleteUser()
    })

    it('should return list of addresses ', async () => {
        const contact = await getContact()

        const response = await supertest(web)
            .get('/api/contacts/' + contact.id + '/addresses')
            .set('Authorization', 'test')

        expect(response.status).toBe(200)
        expect(response.body.data.length).toBe(1)
    });

    it('should reject and return 404 if contact is not found ', async () => {
        const contact = await getContact()

        const response = await supertest(web)
            .get('/api/contacts/' + (contact.id + 1) + '/addresses')
            .set('Authorization', 'test')

        expect(response.status).toBe(404)
    });
})