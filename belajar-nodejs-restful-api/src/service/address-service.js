import { prismaClient } from "../application/database.js"
import { ResponseError } from "../error/response-error.js"
import { createAddressValidation } from "../validation/address-validation.js"
import { getContactValidation } from "../validation/contact-validation.js"
import { validate } from "../validation/validation.js"

const create = async (user, contactId, request) => {
    contactId = validate(getContactValidation, contactId)

    const contactCountInDatabase = await prismaClient.contact.count({
        where: {
            username: user.username,
            id: contactId
        }
    })

    if (contactCountInDatabase !== 1) {
        throw new ResponseError(404, 'Contact is not found')
    }

    request = validate(createAddressValidation, request)
    request.contact_id = contactId

    return prismaClient.address.create({
        data: request,
        select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true,
        }
    })
}

export default {
    create,
}