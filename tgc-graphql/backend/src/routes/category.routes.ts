// TODO: Afficher les annonces des catégories dont le nom commence par un “v”
// app.get('/categories', (req, res) => {

import { Router } from 'express'
import { CategoryController } from '../controllers/category.controller'
import { dataSource } from '../datasource'
import { Category } from '../entities/category.entity'
import { CategoryService } from '../services/category.service'

const categoryRepository = dataSource.getRepository(Category)
const categoryService = new CategoryService(categoryRepository)
const categoryController = new CategoryController(categoryService)

const router = Router()

router.get('/categories', categoryController.getAll.bind(categoryController))
router.get('/categories/:id', categoryController.getById.bind(categoryController))
router.post('/categories', categoryController.create.bind(categoryController))
router.put('/categories/:id', categoryController.update.bind(categoryController))
router.delete('/categories/:id', categoryController.deleteById.bind(categoryController))

export default router
