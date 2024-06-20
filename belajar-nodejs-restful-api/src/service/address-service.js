import { prismaClient } from "../application/database.js"
import { ResponseError } from "../error/response-error.js"
import { createAddressValidation, getAddressValidation, updateAddressValidation } from "../validation/address-validation.js"
import { getContactValidation } from "../validation/contact-validation.js"
import { validate } from "../validation/validation.js"

const checkContactId = async (user, contactId) => {
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

    return contactId
}

const checkAddressInDatabase = async (user, addressId, contactId) => {
    const currentAddressInDatabase = await prismaClient.address.findFirst({
        where: {
            id: addressId,
            contact: {
                id: contactId,
                username: user.username
            }
        },
        select: {
            id: true
        }
    })

    if (!currentAddressInDatabase) {
        throw new ResponseError(404, 'Address not found')
    }

    return currentAddressInDatabase
}

const create = async (user, contactId, request) => {
    contactId = await checkContactId(user, contactId)

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

const get = async (user, contactId, addressId) => {
    contactId = await checkContactId(user, contactId)
    addressId = validate(getAddressValidation, addressId)

    const address = await prismaClient.address.findFirst({
        where: {
            id: addressId,
            contact: {
                id: contactId,
                username: user.username
            }
        },
        select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true,
        }
    })

    if (!address) {
        throw new ResponseError(404, 'Address is not found')
    }

    return address
}

const update = async (user, contactId, addressId, request) => {
    contactId = await checkContactId(user, contactId)
    addressId = validate(getAddressValidation, addressId)
    request = validate(updateAddressValidation, request)

    const currentAddressInDatabase = await checkAddressInDatabase(user, addressId, contactId)
    
    return prismaClient.address.update({
        where: {
            id: currentAddressInDatabase.id
        },
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

const destroy = async (user, contactId, addressId) => {
    contactId = await checkContactId(user, contactId)
    addressId = validate(getAddressValidation, addressId)   

    const currentAddressInDatabase = await checkAddressInDatabase(user, addressId, contactId)

    await prismaClient.address.delete({
        where: {
            id: currentAddressInDatabase.id
        }
    })
}

const list = async (user, contactId) => {
    contactId = await checkContactId(user, contactId)

    return prismaClient.address.findMany({
        where: {
            contact: {
                id: contactId,
                username: user.username
            }
        },
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
    get,
    update,
    destroy,
    list,
}