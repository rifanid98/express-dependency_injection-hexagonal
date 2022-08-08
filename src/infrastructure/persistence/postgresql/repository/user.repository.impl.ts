import {
  GetByUsername,
  UserRepository,
} from "../../../../core/port/repository";
import { User } from "../../../../core/entity";
import { autoInjectable, inject, registry, singleton } from "tsyringe";
import { UserRepositoryProvider } from "../../../../di/provider/user/user-repository.provider";
import KnexInstance from "../knex/knex";
import { Logger } from "../../../../core/port/infrastructure";

@singleton()
@autoInjectable()
@registry(UserRepositoryProvider)
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @inject("Knex") private db: KnexInstance,
    private logger: Logger
  ) {}

  async createUser(user: User): Promise<User> {
    await this.db.knex.insert(user).into("users");
    return Promise.resolve(user);
  }

  getAllUsers(): Promise<User[]> {
    return Promise.resolve([]);
  }

  getOneUser(user: User): Promise<User> {
    return Promise.resolve(undefined);
  }

  getUserById(id: string): Promise<User> {
    return Promise.resolve(undefined);
  }

  async getUserByUsername(username: string): Promise<GetByUsername> {
    try {
      const users: User[] = await this.db
        .knex<User>("users")
        .select("*")
        .where({ username: username });

      if (users.length < 1) {
        return { message: "user not found" };
      }

      const user = new User();
      this.mapTypeToEntity(users[0], user);

      return { user: user };
    } catch (e) {
      this.logger.Error(e);
      return {
        error: e,
      };
    }
  }

  updateUser(user: User): Promise<boolean> {
    return Promise.resolve(false);
  }

  private mapTypeToEntity(type: User, entity: User) {
    Object.keys(type).forEach((key: string) => {
      entity[key] = type[key];
    });
  }
}
