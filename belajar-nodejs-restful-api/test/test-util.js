import { prismaClient } from '../src/application/database.js'
import bcrypt from 'bcrypt'

export const createUser = async () => {
    await prismaClient.user.create({
        data: {
            username: 'test',
            name: 'test',
            password: await bcrypt.hash('rahasia', 10),
            token: 'test'
        }
    })
}

export const deleteUser = async () => {
    await prismaClient.user.deleteMany({
        where: {
            username: 'test'
        }
    })
}

export const getUser = async () => {
    return prismaClient.user.findUnique({
        where: {
            username: 'test'
        }
    })
}

export const deleteAllContacts = async () => {
    await prismaClient.contact.deleteMany({
        where: {
            username: 'test'
        }
    })
}

export const createContact = async () => {
    await prismaClient.contact.create({
        data: {
            first_name: 'test',
            last_name: 'test',
            email: 'test@test.com',
            phone: '0890000000',
            username: 'test'
        }
    })
}

export const createManyContacts = async () => {
    for (let i = 0; i < 15; i++) {
        await prismaClient.contact.create({
            data: {
                first_name: `test ${i}`,
                last_name: `test ${i}`,
                email: `test${i}@test.com`,
                phone: `0890000000${i}`,
                username: 'test'
            }
        })
    }
}

export const getContact = async () => {
    return prismaClient.contact.findFirst({
        where: {
            username: 'test',
        }
    })
}

export const deleteAllAddresses = async () => {
    await prismaClient.address.deleteMany({
        where: {
            contact: {
                username: 'test'
            }
        }
    })
}