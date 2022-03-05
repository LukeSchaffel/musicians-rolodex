import { Router } from 'express'
import * as contactsCtrl from '../controllers/contacts.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()


//GET localhost:3000/contacts
router.get('/', contactsCtrl.index)
// GET localhost:3000/contacts/new
router.get('/new', contactsCtrl.new)

//POST localhost:3000/contacts
router.post('/', isLoggedIn, contactsCtrl.create)

//GET localhost:3000/contacts/:id
router.get('/:id', isLoggedIn, contactsCtrl.show)

//POST localhost:3000/contacts/:id/notes
router.post('/:id/notes', contactsCtrl.addNewNote)

export {
  router
}