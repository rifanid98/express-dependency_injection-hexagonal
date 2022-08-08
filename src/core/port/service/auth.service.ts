import { User } from "core/entity/user.entity";

export type Signup = {
  isError: boolean;
  error?: Error;
  user: User;
};

export type Signin = {
  error?: Error;
  message?: string;
  jwt?: string;
};

interface AuthServiceInterface {
  signup(user: User): Promise<Signup>;

  signin(user: User): Promise<Signin>;
}

export class AuthService implements AuthServiceInterface {
  signin(auth: User): Promise<Signin> {
    return Promise.resolve(undefined);
  }

  signup(auth: User): Promise<Signup> {
    return Promise.resolve(undefined);
  }
}
