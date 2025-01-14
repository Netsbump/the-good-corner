import type { Repository } from 'typeorm'
import { Service, Inject } from 'typedi';
import { User } from '../entities/user.entity';
import { UserCreateInput } from '../inputs/user.input';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { AuthResponse } from '../types/auth.type';
import { Context } from '../types/context.type'

@Service()
export class UserService {
  constructor(
    @Inject("UserRepository")
    private readonly userRepository: Repository<User>
  ) { }

  public async getAll(): Promise<User[]> {
    try {
      return await this.userRepository.find()
    }
    catch (error) {
      throw new Error(`Failed to retrieve users: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  public async getById(id: number): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ id })
    return user || null
  }

  public async create(userData: UserCreateInput, context: Context): Promise<AuthResponse> {
    try {
      // Vérifier si l'email existe déjà
      const existingUser = await this.userRepository.findOne({
        where: { email: userData.email }
      });

      if (existingUser) {
        throw new Error("Un utilisateur avec cet email existe déjà");
      }

      // Hasher le mot de passe avec argon2
      const hashedPassword = await argon2.hash(userData.password, {
        type: argon2.argon2id,
        memoryCost: 2 ** 16,
        timeCost: 3,
        parallelism: 1
      });

      // Créer le nouvel utilisateur
      const newUser = this.userRepository.create({
        email: userData.email,
        hashedPassword
      });

      await this.userRepository.save(newUser);

      // Générer le token JWT
      const token = jwt.sign(
        { userId: newUser.id, email: newUser.email },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      // Stocker le token dans un cookie
      context.cookies.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000
      })

      return {
        user: newUser,
        token
      };
    }
    catch (error) {
      throw new Error(`Failed to create user: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}
