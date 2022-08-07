import { ProviderRegistry } from "../../type";
import { HealthService } from "../../../core/port/service";
import { HealthServiceImpl } from "../../../core/service/health/health.service.impl";
import { Logger } from "../../../core/port/infrastructure";
import { LoggerImpl } from "../../../infrastructure/logging";

export const HealthControllerProvider: ProviderRegistry[] = [
  {
    token: HealthService,
    useClass: HealthServiceImpl,
  },
  {
    token: Logger,
    useClass: LoggerImpl,
  },
];
