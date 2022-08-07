export type Health = {
  isError: boolean;
  error?: Error;
  health: any;
};

interface HealthServiceInterface {
  health(): Promise<Health>;
}

export class HealthService implements HealthServiceInterface {
  health(): Promise<Health> {
    return Promise.resolve(undefined);
  }
}
