import { Router } from "express";
import { HealthController } from "../health/index";
import { autoInjectable, inject, registry, singleton } from "tsyringe";
import { HealthRouterProvider } from "../../../../di/provider/health/health-router.provider";
import { AppRouter } from "./router.config";
import { AuthMiddlewareImpl } from "./middleware";

@singleton()
@autoInjectable()
@registry(HealthRouterProvider)
export class HealthRouter extends AppRouter {
  constructor(
    @inject("Router") public router?: Router,
    private controller?: HealthController,
    private middleware?: AuthMiddlewareImpl
  ) {
    super();
    this.name = "health";
    this.routes();
  }

  public routes() {
    this.router.get(
      "/",
      this.middleware.authenticate.bind(this.middleware),
      this.controller.health.bind(this.controller)
    );
  }
}
