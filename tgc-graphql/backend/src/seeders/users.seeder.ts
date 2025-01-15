import { dataSource } from '../datasource'
import { User } from '../entities/user.entity'
import argon2 from 'argon2'

export async function seedUsers(): Promise<User> {
  const userRepository = dataSource.getRepository(User)

  // Vérifier s'il y a déjà des utilisateurs
  const existingUser = await userRepository.findOne({ 
    where: { email: 'seed@example.com' } 
  })
  
  if (existingUser) {
    console.warn('Users already exist, skipping seeding.')
    return existingUser  // Retourne l'utilisateur existant
  }

  // Créer un utilisateur par défaut pour les seeds
  const defaultUser = new User()
  defaultUser.email = 'seed@example.com'
  defaultUser.hashedPassword = await argon2.hash('password123')

  await userRepository.save(defaultUser)
  console.warn('Default user has been created.')
  
  return defaultUser
} 