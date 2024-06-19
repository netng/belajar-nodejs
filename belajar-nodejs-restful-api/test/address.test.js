import supertest from "supertest";
import { createContact, createUser, deleteAllAddresses, deleteAllContacts, deleteUser, getContact } from "./test-util.js";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";

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