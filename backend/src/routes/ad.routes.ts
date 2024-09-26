import { Router } from 'express'
import { AdController } from '../controllers/ad.controller'

const router = Router()

router.get('/ads', AdController.getAll)
router.get('/ads/:id', AdController.getById)
router.post('/ads', AdController.create)
router.put('/ads/:id', AdController.update)
router.patch('/ads/:id', AdController.partialUpdate)
router.delete('/ads/:id', AdController.deleteById)
router.delete('/ads', AdController.deleteAll)

export default router
