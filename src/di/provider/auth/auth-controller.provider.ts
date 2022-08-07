import { ProviderRegistry } from "../../type";
import { AuthService } from "../../../core/port/service";
import { AuthServiceImpl } from "../../../core/service/auth/auth.service.impl";
import { Logger, Validator } from "../../../core/port/infrastructure";
import { LoggerImpl } from "../../../infrastructure/logging";
import { ValidatorImpl } from "../../../infrastructure/validator/classvalidator/validator.impl";

export const AuthControllerProvider: ProviderRegistry[] = [
  {
    token: AuthService,
    useClass: AuthServiceImpl,
  },
  {
    token: Logger,
    useClass: LoggerImpl,
  },
  {
    token: Validator,
    useClass: ValidatorImpl,
  },
];
