import { User } from "core/entity/user.entity";

export type Signup = {
  isError: boolean;
  error?: Error;
  user: User;
};

export type Signin = {
  isError: boolean;
  error?: Error;
  jwt: string;
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
