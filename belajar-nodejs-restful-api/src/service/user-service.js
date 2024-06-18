import { prismaClient } from "../application/database.js"
import { logger } from "../application/logging.js"
import { ResponseError } from "../error/response-error.js"
import { getUserValidation, loginUserValidation, registerUserValidation, updateUserValidation } from "../validation/user-validation.js"
import { validate } from "../validation/validation.js"
import bcrypt from "bcrypt"
import { v4 as uuid } from 'uuid'

const register = async (request) => {
    // validasi payload
    const user = validate(registerUserValidation, request)

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
    const loginRequest = validate(loginUserValidation, request)

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

const get = async (username) => {
    username = validate(getUserValidation, username)

    const currentUser = await prismaClient.user.findUnique({
        where: {
            username: username
        },
        select: {
            username: true,
            name: true
        }
    })

    if (!currentUser) {
        throw new ResponseError(404, 'User not found')
    }

    return currentUser
}

const update = async (request) => {
    const user = validate(updateUserValidation, request)

    const userCount = await prismaClient.user.count({
        where: {
            username: user.username
        }
    })


    if (userCount !== 1) {
        logger.info('INVOKED')
        throw new ResponseError(401, 'Unauthorized')
    }

    const data = {}

    if (request.name) {
        data.name = request.name
    }

    if (request.password) {
        data.password = await bcrypt.hash(request.password, 10)
    }

    return prismaClient.user.update({
        where: {
            username: user.username
        },
        data: data,
        select: {
            username: true,
            name: true
        }
    })
}

export default {
    register,
    login,
    get,
    update
}