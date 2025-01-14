import { Arg, ID, Mutation, Query, Resolver, Ctx, Authorized } from 'type-graphql'
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
  public async user(@Arg("id") id: number): Promise<User> {
    const user = await this.userService.getById(id)
    if (!user) {
      throw new Error('User not found');
    }
    return user
  }

  @Mutation(() => AuthResponse)
  public async createUser(
    @Arg("userData") userData: UserCreateInput,
    @Ctx() context: Context
  ): Promise<AuthResponse> {
    return await this.userService.create(userData, context)
  }

  @Authorized()
  @Query(() => User)
  async me(@Ctx() { user }: AuthContext) {
    const currentUser = await this.userService.getById(user!.userId);
    if (!currentUser) {
      throw new Error('User not found');
    }
    return currentUser;
  }
}
