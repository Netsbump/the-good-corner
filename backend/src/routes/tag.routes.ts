import { Router } from 'express'

import { TagController } from '../controllers/tag.controller'
import { dataSource } from '../datasource'
import { Tag } from '../entities/tag.entity'
import { TagService } from '../services/tag.service'

const tagRepository = dataSource.getRepository(Tag)
const tagService = new TagService(tagRepository)
const tagController = new TagController(tagService)

const router = Router()

router.get('/tags', tagController.getAll.bind(tagController))

export default router
