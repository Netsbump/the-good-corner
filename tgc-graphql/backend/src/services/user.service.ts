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

  public async create(userData: UserCreateInput): Promise<User> {
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
        hashedPassword,
        isVerified: false // Ajouter un champ pour la vérification
      });

      await this.userRepository.save(newUser);

      // TODO: Envoyer un email de vérification
      // await this.emailService.sendVerificationEmail(newUser.email);

      return newUser;
    }
    catch (error) {
      throw new Error(`Failed to create user: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  public async signIn(email: string, password: string, context: Context): Promise<AuthResponse> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user) {
        throw new Error('User not found');
      }

      //Todo: vérifier si le compte est vérifié

      const validPassword = await argon2.verify(user.hashedPassword, password);
      if (!validPassword) {
        throw new Error('Password is incorrect');
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      // Configurer le cookie
      context.cookies.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000 // 24 heures
      });

      return { user, token };
    } catch (error) {
      throw new Error(`Failed to sign in: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  public async signOut(context: Context): Promise<boolean> {
    try {
      // Supprimer le cookie
      context.cookies.set('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 0 // Expire immédiatement
      });

      return true;
    } catch (error) {
      throw new Error(`Failed to sign out: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}
