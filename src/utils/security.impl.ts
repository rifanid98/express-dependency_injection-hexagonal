import * as bcrypt from "bcrypt";
import { singleton } from "tsyringe";
import { Security } from "../core/port/utils/security.utils";
import { Logger } from "../core/port/infrastructure";

@singleton()
export class SecurityImpl implements Security {
  constructor(private logger: Logger) {}

  /**
   * Hashing given string
   * @param value
   */
  async hash(value: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(value, salt);
  }

  /**
   * Verify hashed value
   * @param plain
   * @param hashed
   */
  async verify(plain: string, hashed: string): Promise<boolean> {
    try {
      return await bcrypt.compare(plain, hashed);
    } catch (e) {
      this.logger.Error({ message: e.message, stacktrace: e });
      return false;
    }
  }
}
