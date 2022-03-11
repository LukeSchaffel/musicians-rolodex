import { Router } from "express"
import * as instrumentsCtrl from "../controllers/instruments.js"
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

// GET localhost:3000/instruments/new
router.get("/new", isLoggedIn, instrumentsCtrl.new)

//POST localhost:3000/instruments
router.post("/", isLoggedIn, instrumentsCtrl.create)

router.delete('/:id', isLoggedIn, instrumentsCtrl.delete)

export {
  router
}