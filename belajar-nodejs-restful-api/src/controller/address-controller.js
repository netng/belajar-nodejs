import addressService from "../service/address-service.js"

const create = async (req, rest, next) => {
    try {
        const user = req.user
        const contactId = req.params.contactId
        const result = await addressService.create(user, contactId, req.body)
        rest.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

export default {
    create,
}