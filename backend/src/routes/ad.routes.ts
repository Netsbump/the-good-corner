import { Router } from 'express'
import { AdController } from '../controllers/ad.controller'
import { dataSource } from '../datasource'
import { Ad } from '../entities/ad.entity'
import { Category } from '../entities/category.entity'
import { AdService } from '../services/ad.service'

const adRepository = dataSource.getRepository(Ad)
const categoryRepository = dataSource.getRepository(Category)
const adService = new AdService(adRepository, categoryRepository)
const adController = new AdController(adService)

const router = Router()

router.get('/ads', adController.getAll.bind(adController))
router.get('/ads/:id', adController.getById.bind(adController))
router.post('/ads', adController.create.bind(adController))
router.put('/ads/:id', adController.update.bind(adController))
router.patch('/ads/:id', adController.partialUpdate.bind(adController))
router.delete('/ads/:id', adController.deleteById.bind(adController))
router.delete('/ads', adController.deleteAll.bind(adController))

export default router
