import { prismaClient } from "../application/database.js"
import { logger } from "../application/logging.js"

export const authMiddleware = async (req, res, next) => {
    const token = req.get('Authorization')

    logger.info(token)

    if (!token) {
        res.status(401).json({
            errors: "Unauthorized"
        }).end()
    } else {
        const user = await prismaClient.user.findFirst({
            where: {
                token: token
            },
            select: {
                username: true,
                name: true,
                token: true
            }
        })

        if (!user) {
            res.status(401).json({
                errors: "Unauthorized"
            }).end()
        } else {
            req.user = user
            next()
        }

    }
}