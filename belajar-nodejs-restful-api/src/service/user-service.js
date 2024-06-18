import { prismaClient } from "../application/database.js"
import { ResponseError } from "../error/response-error.js"
import { userLoginValidation, userRegistrationValidation } from "../validation/user-validation.js"
import { validate } from "../validation/validation.js"
import bcrypt from "bcrypt"
import { v4 as uuid } from 'uuid'

const register = async (request) => {
    // validasi payload
    const user = validate(userRegistrationValidation, request)

    // cek apakah username sudah ada
    const countUser = await prismaClient.user.count({
        where: {
            username: user.username
        }
    })

    if (countUser === 1) {
        throw new ResponseError(400, 'Username already exists')
    }

    // encrypt password
    user.password = await bcrypt.hash(user.password, 10)

    // insert ke database
    return prismaClient.user.create({
        data: user,
        select: {
            username: true,
            name: true
        }
    })
}

const login = async (request) => {
    const loginRequest = validate(userLoginValidation, request)

    const user = await prismaClient.user.findUnique({
        where: {
            username: loginRequest.username
        },
        select: {
            username: true,
            password: true
        }
    })

    if(!user) {
        throw new ResponseError(401, 'username or password is wrong')
    }

    const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password)

    if (!isPasswordValid) {
        throw new ResponseError(401, 'username or password is wrong')
    }

    return await prismaClient.user.update({
        data: {
            token: uuid().toString()
        },
        where: {
            username: user.username
        },
        select: {
            token: true
        }
    })

}

export default {
    register,
    login
}