import { logger } from "../application/logging.js"
import contactService from "../service/contact-service.js"

const create = async (req, res, next) => {
    try {
        const username = req.user.username
        req.body.username = username
        const result = await contactService.create(req.body)
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const get = async (req, res, next) => {
    try {
        const user = req.user
        const contactId = req.params.id
        const result = await contactService.get(user, contactId)
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const update = async (req, res, next) => {
    try {
        const username = req.user.username
        const contactId = req.params.id
        req.body.username = username
        const result = await contactService.update(contactId, req.body)
        res.status(200).send({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const destroy = async (req, res, next) => {
    try {
        const user = req.user
        const contactId = req.params.id
        await contactService.destroy(user, contactId)
        res.status(200).json({
            data: 'OK'
        })
    } catch (e) {
        next(e)
    }
}

const search = async (req, res, next) => {
    try {
        const user = req.user
        const request = {
            name: req.query.name,
            email: req.query.email,
            phone: req.query.phone,
            page: req.query.page,
            size: req.query.size
        }

        const result = await contactService.search(user, request)
        res.status(200).json({
            data: result.data,
            paging: result.paging
        })
    } catch (e) {
        next(e)
    }
}

export default {
    create,
    get,
    update,
    destroy,
    search,
}