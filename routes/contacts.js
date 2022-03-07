import { Router } from 'express'
import * as contactsCtrl from '../controllers/contacts.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()


//GET localhost:3000/contacts
router.get('/', contactsCtrl.index)
// GET localhost:3000/contacts/new
router.get('/new', contactsCtrl.new)

//GET localhost:3000/contacts/:id/edit
router.get('/:id/edit', isLoggedIn, contactsCtrl.edit)

//PUT localhost:3000/contacts/:id
router.put('/:id/', isLoggedIn, contactsCtrl.update)

//POST localhost:3000/contacts
router.post('/', isLoggedIn, contactsCtrl.create)

//GET localhost:3000/contacts/:id
router.get('/:id', isLoggedIn, contactsCtrl.show)

//POST localhost:3000/contacts/:id/notes
router.post('/:id/notes', contactsCtrl.addNewNote)


//DELETE
router.delete('/:id', contactsCtrl.delete)

export {
  router
}