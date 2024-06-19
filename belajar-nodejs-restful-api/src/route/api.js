import express from 'express'
import userController from '../controller/user-controller.js'
import { authMiddleware } from '../middleware/auth-middleware.js'
import contactController from '../controller/contact-controller.js'
import addressController from '../controller/address-controller.js'

export const router = express.Router()

router.use(authMiddleware)

// users API
router.get('/api/users/current', userController.get)
router.patch('/api/users/current', userController.update)
router.delete('/api/users/logout', userController.logout)

// contacts API
router.post('/api/contacts', contactController.create)
router.get('/api/contacts/:id', contactController.get)
router.put('/api/contacts/:id', contactController.update)
router.delete('/api/contacts/:id', contactController.destroy)
router.get('/api/contacts', contactController.search)

// addresses API
router.post('/api/contacts/:contactId/addresses', addressController.create)
