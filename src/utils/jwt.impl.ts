import { singleton } from "tsyringe";
import { JWT, JwtResponse } from "../core/port/utils/jwt.utils";
import * as jwt from "jsonwebtoken";
import { Logger } from "../core/port/infrastructure";

export type JwtClaims = {
  id: string;
  username: string;
  iat: number;
  exp: number;
};

@singleton()
export class JwtImpl implements JWT {
  private secret: string;
  private expire: string;

  constructor(private logger: Logger) {
    this.secret = process.env.JWT_SECRET || "secret";
    this.expire = process.env.JWT_EXPIRE || "1d";
  }

  sign(payload: any): JwtResponse<string> {
    const token = jwt.sign(payload, this.secret, { expiresIn: this.expire });
    return { token };
  }

  verify<T>(token: any): JwtResponse<T> {
    try {
      const decoded = jwt.verify(token, this.secret);
      return { decoded: decoded as T };
    } catch (err) {
      this.logger.Error(err);
      if (err.message.includes("invalid")) {
        return { message: err.message };
      }

      // unexpected error
      return { error: err.message };
    }
  }
}
