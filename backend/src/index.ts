import type { Ad } from './utils/types'
import express from 'express'
import { initializeDatabase } from '../db/dbSetup'
import { AdPatchSchema, AdSchema } from './schemas/ad.schema'

const app = express()

app.use(express.json())

const port = 3000

const db = initializeDatabase()

app.get('/ads', (_, res) => {
  try {
    db.all('SELECT * FROM Ads', (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to retrieve ads' })
      }
      return res.json(rows)
    })
  }
  catch (error) {
    return res.status(500).json({ error: `Internal Server Error : ${error}` })
  }
})

app.get('/ads/:id', (req, res) => {
  try {
    const adId = req.params.id

    if (Number.isNaN(adId)) {
      return res.status(400).json({ error: 'Invalid ID format' })
    }

    db.get(`SELECT * FROM Ads WHERE id = ?`, [adId], (err: Error | null, row) => {
      if (err) {
        return res.status(500).json({ error: err })
      }
      return res.json(row)
    })
  }
  catch (error) {
    return res.status(500).json(`Internal Server Error : ${error}`)
  }
})

app.post('/ads', (req, res) => {
  try {
    const result = AdSchema.safeParse(req.body)

    if (!result.success) {
      return res
        .status(400)
        .json({ error: 'Invalid Ad format', details: result.error.errors })
    }

    const newAd: Ad = result.data

    db.run(
      `INSERT INTO Ads (title, description, price, owner, picture, location) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        newAd.title,
        newAd.description,
        newAd.price,
        newAd.owner,
        newAd.picture,
        newAd.location,
      ],
      function (err) {
        if (err) {
          return res.status(500).json('Failed to insert ad')
        }
        return res.json({ id: this.lastID })
      },
    )
  }
  catch (error) {
    return res.status(500).json({ error: `Internal Server Error : ${error}` })
  }
})

app.put('/ads/:id', (req, res) => {
  try {
    const result = AdSchema.safeParse(req.body)

    if (!result.success) {
      return res
        .status(400)
        .json({ error: 'Invalid Ad format', details: result.error.errors })
    }

    const updatedAd: Ad = result.data
    const adId = req.params.id

    db.run(
      `UPDATE Ads SET title = ?, description = ?, price = ?, owner = ?, picture = ?, location = ? WHERE id = ?`,
      [
        updatedAd.title,
        updatedAd.description,
        updatedAd.price,
        updatedAd.owner,
        updatedAd.picture,
        updatedAd.location,
        adId,
      ],
      function (err) {
        if (err) {
          return res.status(500).json('Failed to update ad')
        }

        // Vérification du nombre de lignes modifiées
        if (this.changes === 0) {
          return res.status(404).json({ error: 'Ad not found' })
        }

        return res.json({ id: adId })
      },
    )
  }
  catch (error) {
    return res.status(500).json({ error: `Internal Server Error : ${error}` })
  }
})

app.patch('/ads/:id', (req, res) => {
  try {
    const result = AdPatchSchema.safeParse(req.body)

    if (!result.success) {
      return res.status(400).json({
        error: 'Invalid Ad format',
        details: result.error.errors,
      })
    }

    const updatedFields = result.data
    const adId = Number(req.params.id)

    // Génération dynamique de la requête SQL pour mettre à jour seulement les champs fournis
    const fields = Object.keys(updatedFields)
      .map(key => `${key} = ?`)
      .join(', ')
    const values = Object.values(updatedFields)

    if (fields.length === 0) {
      return res.status(400).json({
        error: 'No valid fields provided for update',
      })
    }

    db.run(
      `UPDATE Ads SET ${fields} WHERE id = ?`,
      [...values, adId],
      function (err: Error | null) {
        if (err) {
          return res.status(500).json('Failed to update ad')
        }

        // Vérification du nombre de lignes modifiées
        if (this.changes === 0) {
          return res.status(404).json({ error: 'Ad not found' })
        }

        return res.json({ id: adId })
      },
    )
  }
  catch (error) {
    return res.status(500).json({ error: `Internal Server Error : ${error}` })
  }
})

app.delete('/ads/:id', (req, res) => {
  try {
    const adId = Number(req.params.id)

    if (Number.isNaN(adId)) {
      return res.status(400).json({ error: 'Invalid ID format' })
    }

    db.run('DELETE FROM Ads WHERE id = ?', [adId], function (err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to delete ad' })
      }

      // Vérifier si une ligne a été supprimée
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Ad not found' })
      }

      return res.status(200).json({ message: 'Ad deleted', id: adId })
    })
  }
  catch (error) {
    return res.status(500).json({ error: `Internal Server Error : ${error}` })
  }
})

app.delete('/ads', (_, res) => {
  try {
    // Supprimer toutes les annonces
    db.run('DELETE FROM Ads', (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to delete ads' })
      }

      // Réinitialiser la séquence d'auto-incrémentation
      db.run('DELETE FROM sqlite_sequence WHERE name = \'Ads\'', (err) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to reset ID sequence' })
        }

        return res
          .status(200)
          .json({ message: 'All ads deleted and ID sequence reset' })
      })
    })
  }
  catch (error) {
    return res.status(500).json({ error: `Internal Server Error : ${error}` })
  }
})

app.listen(port, () => {
  console.warn(`Listening on ${port}`)
})
