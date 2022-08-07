import { NextFunction, Request, Response } from "express";
import { autoInjectable, singleton } from "tsyringe";
import { HttpStatus } from "../../../../../core/constant";
import { JwtClaims, Response as HttpResponse } from "../../../../../utils";
import { GlobalResponse } from "../../../../../core/constant/resp.constant";
import { Logger } from "../../../../../core/port/infrastructure";
import { JWT } from "../../../../../core/port/utils";

interface AuthMiddlewareInterface {
  authenticate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<GlobalResponse>;
}

export class AuthMiddleware implements AuthMiddlewareInterface {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async authenticate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<GlobalResponse> {
    return null;
  }
}

@singleton()
@autoInjectable()
export class AuthMiddlewareImpl implements AuthMiddleware {
  constructor(private logger: Logger, private jwt: JWT) {}

  async authenticate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<GlobalResponse> {
    const authorization = req.headers.authorization;
    const auths = authorization?.split("Bearer ");

    if (!auths || auths[0] === "") {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .send(HttpResponse.unauthorized({ message: "token is required" }));
    }

    const token = auths?.length > 1 ? auths[1] : auths[0];

    const verified = await this.jwt.verify<JwtClaims>(token);
    if (verified.isError) {
      this.logger.Error(verified.error);
      res.status(HttpStatus.UNAUTHORIZED).send(HttpResponse.unauthorized());
    }

    this.logger.Info({ message: "user authenticated" });

    next();
  }
}
