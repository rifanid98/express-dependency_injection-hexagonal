import { Health, HealthService } from "../../port/service/health.service";
import { autoInjectable, injectable, singleton } from "tsyringe";

@singleton()
@autoInjectable()
@injectable()
export class HealthServiceImpl implements HealthService {
  async health(): Promise<Health> {
    return {
      isError: false,
      health: {},
    };
  }
}
