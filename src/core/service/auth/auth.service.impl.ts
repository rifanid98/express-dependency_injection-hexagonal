import { AuthPresenter } from "../../../interface/extl/v1/auth/auth.presenter";
import { User } from "../../../core/entity/user.entity";
import { AuthService, Signin, Signup } from "../../port/service/auth.service";
import { autoInjectable, injectable, registry, singleton } from "tsyringe";
import { AuthServiceProvider } from "../../../di/provider";
import { JWT } from "../../port/utils/jwt.utils";
import { Security } from "../../port/utils/security.utils";
import { UserRepository } from "../../port/repository";
import { randomUUID } from "crypto";

@singleton()
@autoInjectable()
@injectable()
@registry(AuthServiceProvider)
export class AuthServiceImpl implements AuthService {
  constructor(
    private presenter: AuthPresenter,
    private userRepository: UserRepository,
    private jwt: JWT,
    private security: Security
  ) {}

  async signup(user: User): Promise<Signup> {
    user.id = randomUUID();
    user.password = await this.security.hash(user.password);
    const result = await this.userRepository.createUser(user);

    return {
      isError: false,
      user: this.presenter.showAll(result),
    };
  }

  async signin(user: User): Promise<Signin> {
    const result = await this.userRepository.getUserByUsername(user.username);
    if (result.isError) {
      return {
        isError: true,
        error: result.error,
        jwt: "",
      };
    }

    if (result.user.isEmpty()) {
      return {
        isError: true,
        error: new Error("user is not exists"),
        jwt: "",
      };
    }

    const verified = await this.security.verify(
      user.password,
      result.user.password
    );
    if (!verified) {
      return {
        isError: true,
        error: new Error("credentials is invalid"),
        jwt: "",
      };
    }

    const presentedUser = this.presenter.show(result.user);
    const jwtPayload = this.presenter.json(presentedUser);
    const jwt = this.jwt.sign(jwtPayload);
    if (jwt.isError) {
      return {
        isError: true,
        error: jwt.error,
        jwt: "",
      };
    }

    return {
      isError: false,
      jwt: jwt.token,
    };
  }
}
