import { Response as HttpResponse } from "../../../../utils";
import { autoInjectable, registry, singleton } from "tsyringe";
import { Request, Response } from "express";
import { HealthControllerProvider } from "../../../../di/provider/health/health-controller.provider";
import { HealthService } from "../../../../core/port/service";
import { Logger } from "../../../../core/port/infrastructure";
import { HttpStatus } from "../../../../core/constant";
import { GlobalResponse } from "../../../../core/constant/resp.constant";

export class HealthController {
  async health(req: Request, res: Response): Promise<GlobalResponse> {
    return res.send(HttpResponse.success());
  }
}

@singleton()
@autoInjectable()
@registry(HealthControllerProvider)
export class HealthControllerImpl implements HealthController {
  constructor(private service: HealthService, private logger: Logger) {}

  public async health(req: Request, res: Response): Promise<GlobalResponse> {
    const check = await this.service.health();
    if (check.isError) {
      return res
        .status(HttpStatus.UNPROCESSABLE_ENTITY)
        .send(HttpResponse.unprocessableentity({ error: check.error.message }));
    }

    this.logger.Info({ message: "health status checked" });

    return res
      .status(HttpStatus.OK)
      .send(HttpResponse.success({ data: check.health }));
  }
}
