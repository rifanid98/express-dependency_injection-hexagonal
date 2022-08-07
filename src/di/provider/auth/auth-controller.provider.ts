import { ProviderRegistry } from "../../type";
import { AuthService } from "../../../core/port/service";
import { AuthServiceImpl } from "../../../core/service/auth/auth.service.impl";
import { Logger } from "../../../core/port/infrastructure";
import { LoggerImpl } from "../../../infrastructure/logging";

export const AuthControllerProvider: ProviderRegistry[] = [
  {
    token: AuthService,
    useClass: AuthServiceImpl,
  },
  {
    token: Logger,
    useClass: LoggerImpl,
  },
];
