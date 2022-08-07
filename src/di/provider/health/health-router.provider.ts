import {
  HealthController,
  HealthControllerImpl,
} from "../../../interface/extl/v1/health";
import { Router } from "express";
import { ProviderRegistry } from "../../type";
import {
  AuthMiddleware,
  AuthMiddlewareImpl,
} from "../../../interface/extl/v1/router";

export const HealthRouterProvider: ProviderRegistry[] = [
  {
    token: HealthController,
    useClass: HealthControllerImpl,
  },
  {
    token: AuthMiddleware,
    useClass: AuthMiddlewareImpl,
  },
  {
    token: "Router",
    useValue: Router(),
  },
];
