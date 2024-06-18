import { prismaClient } from "../application/database.js"
import { ResponseError } from "../error/response-error.js"
import { userRegistrationValidation } from "../validation/user-validation.js"
import { validate } from "../validation/validation.js"
import bcrypt from "bcrypt"

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

export default {
    register
}