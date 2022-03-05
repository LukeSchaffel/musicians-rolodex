import { Router } from 'express'
import * as contactsCtrl from '../controllers/contacts.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()


//GET localhost:3000/contacts
router.get('/', contactsCtrl.index)
// GET localhost:3000/contacts/new
router.get('/new', contactsCtrl.new)

export {
  router
}