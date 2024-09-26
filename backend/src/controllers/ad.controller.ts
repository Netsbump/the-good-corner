import type { Request, Response } from 'express'
import type { AdType } from '../utils/types'
import { AdIdSchema, AdPatchSchema, AdSchema, querySchema } from '../schemas/ad.schema'
import { AdService } from '../services/ad.service'

export class AdController {
  static async getAll(req: Request, res: Response) {
    try {
      // 1. Vérification
      const parseResult = querySchema.safeParse(req.query)

      if (!parseResult.success) {
        return res.status(400).json({ error: 'Invalid query parameters' })
      }

      const categoryIds = parseResult.data.category_ids

      const ads = await AdService.getAll(categoryIds)

      return res.status(200).json(ads)
    }
    catch (error) {
      return res.status(500).json({ error: `Failed to retrieve ads: ${error instanceof Error ? error.message : 'Unknown error'}` })
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      const parseAdId = AdIdSchema.safeParse(id)

      if (!parseAdId.success) {
        return res.status(400).json({ error: 'Invalid ID format' })
      }

      const ad = await AdService.getById(parseAdId.data)

      if (!ad) {
        return res.status(500).json('Ad not found')
      }

      return res.json(ad)
    }
    catch (error) {
      return res.status(500).json(`Internal Server Error : ${error}`)
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const parseAd = AdSchema.safeParse(req.body)

      if (!parseAd.success) {
        return res
          .status(400)
          .json({ error: 'Invalid Ad format', details: parseAd.error.errors })
      }

      const newAd: AdType = parseAd.data

      const createdAd = await AdService.create(newAd)
      return res.status(201).json(createdAd)
    }
    catch (error) {
      return res.status(500).json({ error: `Failed to update ad: ${error instanceof Error ? error.message : 'Unknown error'}` })
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      const parseUpdateAdId = AdIdSchema.safeParse(id)

      if (!parseUpdateAdId.success) {
        return res.status(400).json({ error: 'Invalid ID format' })
      }

      const parseAd = AdSchema.safeParse(req.body)

      if (!parseAd.success) {
        return res
          .status(400)
          .json({ error: 'Invalid Ad format', details: parseAd.error.errors })
      }

      const updateAd: AdType = parseAd.data
      const updateAdId = parseUpdateAdId.data

      const updatedAd = await AdService.update(updateAdId, updateAd)
      if (!updatedAd) {
        return res.status(404).json({ error: 'Ad not found' })
      }
      return res.status(200).json(updatedAd) // 200 OK pour une mise à jour réussie
    }
    catch (error) {
      return res.status(500).json({ error: `Failed to update ad: ${error instanceof Error ? error.message : 'Unknown error'}` })
    }
  }

  static async partialUpdate(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      const parseUpdateAdId = AdIdSchema.safeParse(id)

      if (!parseUpdateAdId.success) {
        return res.status(400).json({ error: 'Invalid ID format' })
      }

      const parsePartialAd = AdPatchSchema.safeParse(req.body)

      if (!parsePartialAd.success) {
        return res
          .status(400)
          .json({ error: 'Invalid partial Ad format', details: parsePartialAd.error.errors })
      }

      const updateFields: Partial<AdType> = parsePartialAd.data
      const adId = parseUpdateAdId.data

      const updatedAd = await AdService.partialUpdate(adId, updateFields)
      if (!updatedAd) {
        return res.status(404).json({ error: 'Ad not found' })
      }
      return res.status(200).json(updatedAd)
    }
    catch (error) {
      return res.status(500).json({ error: `Failed to partial update ad: ${error instanceof Error ? error.message : 'Unknown error'}` })
    }
  }

  static async deleteById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      const parseAdId = AdIdSchema.safeParse(id)

      if (!parseAdId.success) {
        return res.status(400).json({ error: 'Invalid ID format' })
      }

      const deletedAd = await AdService.deleteById(parseAdId.data)
      if (!deletedAd) {
        return res.status(404).json({ error: 'Ad not found' })
      }

      return res.status(200).json({ message: 'Ad deleted', id: parseAdId.data })
    }
    catch (error) {
      return res.status(500).json({ error: `Failed to delete ad: ${error instanceof Error ? error.message : 'Unknown error'}` })
    }
  }

  static async deleteAll(req: Request, res: Response) {
    try {
      await AdService.deleteAll()
      return res.status(200).json({ message: 'All ads deleted' })
    }
    catch (error) {
      return res.status(500).json({ error: `Failed to delete ads: ${error instanceof Error ? error.message : 'Unknown error'}` })
    }
  }
}

// app.get('/ads/avg_price/:category_id', (req, res) => {
//   try {
//     const categoryId = Number(req.params.category_id)

//     if (Number.isNaN(categoryId)) {
//       return res.status(400).json({ error: 'Invalid Category ID format' })
//     }

//     const sql = `
//     SELECT AVG(price) as average_price FROM Ads
//     JOIN Categories ON Ads.category_id = Categories.id
//     WHERE Categories.id = ?
//   `

//     db.get(sql, categoryId, (err, row) => {
//       if (err) {
//         return res.status(500).json({ error: 'Failed to retrieve average price' })
//       }
//       if (!row) {
//         return res.status(404).json({ error: 'Category not found or no ads in this category' })
//       }
//       return res.json(row)
//     })
//   }
//   catch (error) {
//     return res.status(500).json({ error: `Internal Server Error: ${error}` })
//   }
// })
