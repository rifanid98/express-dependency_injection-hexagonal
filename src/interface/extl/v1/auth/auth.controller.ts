import { Response as HttpResponse } from "../../../../utils";
import { autoInjectable, registry, singleton } from "tsyringe";
import { Request, Response } from "express";
import { AuthControllerProvider } from "../../../../di/provider/auth/auth-controller.provider";
import { AuthService } from "../../../../core/port/service";
import { User } from "../../../../core/entity";
import { Logger, Validator } from "../../../../core/port/infrastructure";
import { AuthSignInDto, AuthSignUpDto } from "./auth.dto";
import { HttpStatus } from "../../../../core/constant";
import { GlobalResponse } from "../../../../core/constant/resp.constant";

export class AuthController {
  async signin(req: Request, res: Response): Promise<GlobalResponse> {
    return res.send(HttpResponse.success());
  }

  async signup(req: Request, res: Response): Promise<GlobalResponse> {
    return res.send(HttpResponse.success());
  }
}

@singleton()
@autoInjectable()
@registry(AuthControllerProvider)
export class AuthControllerImpl implements AuthController {
  constructor(
    private service: AuthService,
    private logger: Logger,
    private validator: Validator
  ) {}

  public async signin(req: Request, res: Response): Promise<GlobalResponse> {
    const { body } = req;

    const user = new User();
    const signin = new AuthSignInDto();

    this.mapBodyToEntity(body, user);
    this.mapBodyToDto(body, signin);

    const validate = await this.validator.validate<User>(signin);
    if (validate.isError) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send(HttpResponse.badrequest({ errors: validate.messages }));
    }

    const result = await this.service.signin(user);
    if (result.error) {
      return res
        .status(HttpStatus.UNPROCESSABLE_ENTITY)
        .send(
          HttpResponse.unprocessableentity({ error: result.error.message })
        );
    }

    if (!result.jwt) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .send(HttpResponse.unauthorized({ message: "invalid credentials" }));
    }

    this.logger.Info({ message: "user signin success" });

    return res
      .status(HttpStatus.OK)
      .send(HttpResponse.success({ data: result.jwt }));
  }

  public async signup(req: Request, res: Response): Promise<GlobalResponse> {
    const { body } = req;

    const user = new User();
    const signup = new AuthSignUpDto();

    this.mapBodyToEntity(body, user);
    this.mapBodyToDto(body, signup);

    const validate = await this.validator.validate<User>(signup);
    if (validate.isError) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send(HttpResponse.badrequest({ errors: validate.messages }));
    }

    const {
      isError,
      error: signupError,
      user: result,
    } = await this.service.signup(user);
    if (isError) {
      return res
        .status(HttpStatus.UNPROCESSABLE_ENTITY)
        .send(HttpResponse.unprocessableentity({ error: signupError }));
    }

    this.logger.Info({ message: "user signup success" });

    return res
      .status(HttpStatus.CREATED)
      .send(HttpResponse.created({ data: result }));
  }

  mapBodyToEntity(body: User, entity: User) {
    entity.username = body.username;
    entity.password = body.password;
  }

  mapBodyToDto(body: User, dto: User) {
    dto.username = body.username;
    dto.password = body.password;
  }
}
