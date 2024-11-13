import type { AdDtoToCreate } from '@tgc/packages'
import type { Request, Response } from 'express'
import type { AdService } from '../services/ad.service'
import { AdPatchSchema, AdSchema, IdSchema, querySchema } from '@tgc/packages'

export class AdController {
  constructor(private readonly adsService: AdService) {}

  public async getAll(req: Request, res: Response) {
    try {
      // 1. Vérification
      const parseResult = querySchema.safeParse(req.query)

      if (!parseResult.success) {
        return res.status(400).json({ error: 'Invalid query parameters' })
      }

      const { category_ids } = parseResult.data

      // 2. Récupérer les annonces
      const ads = category_ids
        ? await this.adsService.getAllByCategory(category_ids)
        : await this.adsService.getAll()

      return res.status(200).json(ads)
    }
    catch (error) {
      return res.status(500).json({ error: `Failed to retrieve ads: ${error instanceof Error ? error.message : 'Unknown error'}` })
    }
  }

  public async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      const parseAdId = IdSchema.safeParse(id)

      if (!parseAdId.success) {
        return res.status(400).json({ error: 'Invalid ID format' })
      }

      const ad = await this.adsService.getById(parseAdId.data)

      if (!ad) {
        return res.status(500).json('Ad not found')
      }

      return res.json(ad)
    }
    catch (error) {
      return res.status(500).json(`Internal Server Error : ${error}`)
    }
  }

  public async create(req: Request, res: Response) {
    try {
      // const parseAd = AdSchema.safeParse(req.body)
      const parseAd = AdSchema.safeParse(req.body)

      if (!parseAd.success) {
        return res
          .status(400)
          .json({ error: 'Invalid Ad format', details: parseAd.error.errors })
      }

      const newAd: AdDtoToCreate = parseAd.data

      const createdAd = await this.adsService.create(newAd)
      return res.status(201).json(createdAd)
    }
    catch (error) {
      return res.status(500).json({ error: `Failed to create ad: ${error instanceof Error ? error.message : 'Unknown error'}` })
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      const parseUpdateAdId = IdSchema.safeParse(id)

      if (!parseUpdateAdId.success) {
        return res.status(400).json({ error: 'Invalid ID format' })
      }

      const parseAd = AdSchema.safeParse(req.body)

      if (!parseAd.success) {
        return res
          .status(400)
          .json({ error: 'Invalid Ad format', details: parseAd.error.errors })
      }

      const updateAd: AdDtoToCreate = parseAd.data
      const updateAdId = parseUpdateAdId.data

      const updatedAd = await this.adsService.update(updateAdId, updateAd)
      if (!updatedAd) {
        return res.status(404).json({ error: 'Ad not found' })
      }
      return res.status(200).json(updatedAd)
    }
    catch (error) {
      return res.status(500).json({ error: `Failed to update ad: ${error instanceof Error ? error.message : 'Unknown error'}` })
    }
  }

  public async partialUpdate(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      const parseUpdateAdId = IdSchema.safeParse(id)

      if (!parseUpdateAdId.success) {
        return res.status(400).json({ error: 'Invalid ID format' })
      }

      const parsePartialAd = AdPatchSchema.safeParse(req.body)

      if (!parsePartialAd.success) {
        return res
          .status(400)
          .json({ error: 'Invalid partial Ad format', details: parsePartialAd.error.errors })
      }

      const updateFields: Partial<AdDtoToCreate> = parsePartialAd.data
      const adId = parseUpdateAdId.data

      const updatedAd = await this.adsService.partialUpdate(adId, updateFields)
      if (!updatedAd) {
        return res.status(404).json({ error: 'Ad not found' })
      }
      return res.status(200).json(updatedAd)
    }
    catch (error) {
      return res.status(500).json({ error: `Failed to partial update ad: ${error instanceof Error ? error.message : 'Unknown error'}` })
    }
  }

  public async deleteById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      const parseAdId = IdSchema.safeParse(id)

      if (!parseAdId.success) {
        return res.status(400).json({ error: 'Invalid ID format' })
      }

      const deletedAd = await this.adsService.deleteById(parseAdId.data)
      if (!deletedAd) {
        return res.status(404).json({ error: 'Ad not found' })
      }

      return res.status(200).json({ message: 'Ad deleted', id: parseAdId.data })
    }
    catch (error) {
      return res.status(500).json({ error: `Failed to delete ad: ${error instanceof Error ? error.message : 'Unknown error'}` })
    }
  }

  public async deleteAll(req: Request, res: Response) {
    try {
      await this.adsService.deleteAll()
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
