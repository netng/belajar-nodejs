import express from 'express'
import userController from '../controller/user-controller.js'

export const publicRouter = express.Router()

publicRouter.post('/api/users', userController.register)
publicRouter.post('/api/users/login', userController.login)
