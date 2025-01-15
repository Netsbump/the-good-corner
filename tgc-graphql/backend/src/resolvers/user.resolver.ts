import { Arg, Mutation, Query, Resolver, Ctx, Authorized, ID } from 'type-graphql'
import { Service } from 'typedi'
import { User } from '../entities/user.entity'
import { UserService } from '../services/user.service'
import { UserCreateInput } from '../inputs/user.input'
import { AuthResponse } from '../types/auth.type'
import { Context } from '../types/context.type'
import { AuthContext } from '../types/auth-checker'

@Service()
@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Authorized()
  @Query(() => [User])
  public async users(): Promise<User[]> {
    try {
      return await this.userService.getAll()
    }
    catch (error) {
      throw new Error(`Failed to retrieve users: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  @Authorized(["ADMIN"])
  @Query(() => User)
  public async user(@Arg("id", () => ID) id: number): Promise<User> {
    const user = await this.userService.getById(id)
    if (!user) {
      throw new Error('User not found');
    }
    return user
  }

  @Query(() => User, { nullable: true })
  public async userByEmail(@Arg("email") email: string): Promise<User | null> {
    return await this.userService.getByEmail(email)
  }

  @Mutation(() => User)
  public async createUser(
    @Arg("userData") userData: UserCreateInput,
  ): Promise<User> {
    return await this.userService.create(userData)
  }

  @Mutation(() => AuthResponse)
  async signIn(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() context: Context
  ): Promise<AuthResponse> {
    return await this.userService.signIn(email, password, context);
  }

  @Mutation(() => Boolean)
  @Authorized()
  async signOut(@Ctx() context: Context): Promise<boolean> {
    return await this.userService.signOut(context);
  }

  @Query(() => User)
  @Authorized()
  async me(@Ctx() { user }: AuthContext): Promise<User> {
    const currentUser = await this.userService.getById(user!.userId);
    if (!currentUser) {
      throw new Error('User not found');
    }
    return currentUser;
  }
}
