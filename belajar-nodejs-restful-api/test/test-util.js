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