import { prismaClient } from "../application/database.js"
import { ResponseError } from "../error/response-error.js"
import { createContactValidation, getContactValidation, searchContactValidation, updateContactValidation } from "../validation/contact-validation.js"
import { validate } from "../validation/validation.js"

const create = async (request) => {
    const contact = validate(createContactValidation, request)

    return prismaClient.contact.create({
        data: contact,
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true
        }
    })
}

const get = async (user, contactId) => {
    contactId = validate(getContactValidation, contactId)

    const contact = await prismaClient.contact.findFirst({
        where: {
            username: user.username,
            id: contactId
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true
        }
    })

    if (!contact) {
        throw new ResponseError(404, 'Contact is not found')
    }

    return contact
}

const update = async (contactId, request) => {
    request.id = contactId
    const contact = validate(updateContactValidation, request)

    const countContactInDatabase = await prismaClient.contact.count({
        where: {
            username: contact.username,
            id: contact.id
        }
    })

    if (countContactInDatabase !== 1) {
        throw new ResponseError(404, 'Contact is not found')
    }

    return prismaClient.contact.update({
        where: {
            username: contact.username,
            id: contact.id
        },
        data: {
            first_name: contact.first_name,
            last_name: contact.last_name,
            email: contact.email,
            phone: contact.phone
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true
        }
    })
}

const destroy = async (user, contactId) => {
    contactId = validate(getContactValidation, contactId)

    const contact = await prismaClient.contact.findFirst({
        where: {
            username: user.username,
            id: contactId
        }
    })

    if(!contact) {
        throw new ResponseError(404, 'Contact is not found')
    }

    await prismaClient.contact.delete({
        where: {
            username: user.username,
            id: contactId 
        }
    })
}

const search = async (user, request) => {
    const searchRequest = validate(searchContactValidation, request)

    // page 1: 10, skip 0
    // page 2: 10, skip 1
    // (page - 1) * size
    // (1 - 1) * 10
    // (2 - 1) * 10
    const skip = (searchRequest.page - 1) * searchRequest.size

    const filters = []

    if (searchRequest.name) {
        filters.push({
            OR: [
                {
                    first_name: {
                        contains: searchRequest.name
                    },
                },
                {
                    last_name: {
                        contains: searchRequest.name
                    },

                }
            ],
        })
    }

    if (searchRequest.email) {
        filters.push({
            email: {
                contains: searchRequest.email
            },
        })
    }

    if (searchRequest.phone) {
        filters.push({
            phone: {
                contains: searchRequest.phone
            }
        })
    }

    filters.push({username: user.username})

    const contacts = await prismaClient.contact.findMany({
        where: {
            AND: filters,
        },
        take: searchRequest.size,
        skip: skip
    })

    const totalItems = await prismaClient.contact.count({
        where: {
            AND: filters
        }
    })

    return {
        data: contacts,
        paging: {
            page: searchRequest.page,
            page_size: searchRequest.size,
            total_page: Math.ceil(totalItems / searchRequest.size),
            total_items: totalItems
        }
    }
}

export default {
    create,
    get,
    update,
    destroy,
    search,
}