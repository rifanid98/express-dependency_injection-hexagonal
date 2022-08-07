import { SecurityImpl } from "../../../utils";
import {
  AuthPresenter,
  AuthPresenterImpl,
} from "../../../interface/extl/v1/auth/auth.presenter";
import { JwtImpl } from "../../../utils/jwt.impl";
import { JWT } from "../../../core/port/utils/jwt.utils";
import { Security } from "../../../core/port/utils/security.utils";
import { UserRepository } from "../../../core/port/repository";
import { UserRepositoryImpl } from "../../../infrastructure/persistence/postgresql/repository";
import { ProviderRegistry } from "../../type";

export const AuthServiceProvider: ProviderRegistry[] = [
  {
    token: AuthPresenter,
    useClass: AuthPresenterImpl,
  },
  {
    token: UserRepository,
    useClass: UserRepositoryImpl,
  },
  {
    token: JWT,
    useClass: JwtImpl,
  },
  {
    token: Security,
    useClass: SecurityImpl,
  },
];
