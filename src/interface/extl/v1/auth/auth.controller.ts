import { GlobalResponse, Response as HttpResponse } from "../../../../utils";
import { autoInjectable, registry, singleton } from "tsyringe";
import { Request, Response } from "express";
import { AuthControllerProvider } from "../../../../di/provider/auth/auth-controller.provider";
import { AuthService } from "../../../../core/port/service";
import { User } from "../../../../core/entity";
import { Logger } from "../../../../core/port/infrastructure";

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
  constructor(private service: AuthService, private logger: Logger) {}

  public async signin(req: Request, res: Response): Promise<GlobalResponse> {
    return res.send(HttpResponse.success({ data: req.body }));
  }

  public async signup(req: Request, res: Response): Promise<GlobalResponse> {
    const { body } = req;
    const user = new User();

    this.mapBodyToEntity(body, user);

    const result = await this.service
      .signup(user)
      .catch((err: Error) => this.logger.Info({ error: err }));

    this.logger.Info({ message: user.username });

    return res.send(HttpResponse.success({ data: result }));
  }

  mapBodyToEntity(body: User, entity: User) {
    entity.username = body.username;
    entity.password = body.password;
  }
}
