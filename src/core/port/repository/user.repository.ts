import { User } from "core/entity/user.entity";

export type GetByUsername = {
  error?: Error;
  message?: string;
  user?: User;
};

interface UserRepositoryInterface {
  getAllUsers(): Promise<User[]>;

  getOneUser(user: User): Promise<User>;

  getUserById(id: string): Promise<User>;

  getUserByUsername(username: string): Promise<GetByUsername>;

  createUser(user: User): Promise<User>;

  updateUser(user: User): Promise<boolean>;
}

export class UserRepository implements UserRepositoryInterface {
  createUser(user: User): Promise<User> {
    return Promise.resolve(undefined);
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

  getUserByUsername(username: string): Promise<GetByUsername> {
    return Promise.resolve(undefined);
  }

  updateUser(user: User): Promise<boolean> {
    return Promise.resolve(false);
  }
}
