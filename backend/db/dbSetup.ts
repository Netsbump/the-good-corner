import type { Database } from 'sqlite3'
import sqlite3 from 'sqlite3'
import { getFakeAds } from '../src/utils/fakerAds'

export function initializeDatabase(): Database {
  const db = new sqlite3.Database('./db/good_corner.sqlite')

  db.run(
    `
    CREATE TABLE IF NOT EXISTS Ads (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      title TEXT NOT NULL,
      description TEXT,
      price REAL NOT NULL,
      owner TEXT NOT NULL, 
      picture BLOB NOT NULL, 
      location TEXT, 
      createdAT NUMERIC DEFAULT CURRENT_TIMESTAMP
    );
  `,
    (err) => {
      if (err) {
        console.error('Could not create table Ads:', err.message)
      }
      else {
        console.warn('Table Ads created or already exists.')
        // Vérifier si la table Ads contient déjà des enregistrements
        db.get('SELECT COUNT(*) as count FROM Ads', (err, row) => {
          if (err) {
            console.error('Failed to count ads:', err.message)
          }
          else if ((row as { count: number }).count === 0) {
            // S'il n'y a pas d'enregistrements, insérer les données générées par faker
            const fakeAds = getFakeAds()
            fakeAds.forEach((ad) => {
              db.run(
                'INSERT INTO Ads (title, description, price, owner, picture, location) VALUES (?, ?, ?, ?, ?, ?)',
                [
                  ad.title,
                  ad.description,
                  ad.price,
                  ad.owner,
                  ad.picture,
                  ad.location,
                ],
                (err) => {
                  if (err) {
                    console.error('Failed to insert ad:', err.message)
                  }
                },
              )
            })
            console.warn('Fake ads have been inserted.')
          }
          else {
            console.warn('Ads already exist, skipping faker data generation.')
          }
        })
      }
    },
  )

  return db
}
