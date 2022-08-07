import * as Sentry from "@sentry/node";
import "@sentry/tracing";
import { LogData, Logger } from "../../../core/port/infrastructure";
import { autoInjectable, singleton } from "tsyringe";

@singleton()
@autoInjectable()
export class LoggerImpl implements Logger {
  constructor() {
    Sentry.init({
      dsn: "https://78d9f657a0594e148bfe20bfcb3a72aa@o1338022.ingest.sentry.io/6629615",

      // Set tracesSampleRate to 1.0 to capture 100%
      // of transactions for performance monitoring.
      // We recommend adjusting this value in production
      tracesSampleRate: 1.0,
      debug: true,
    });
  }

  Info(data: LogData): void {
    console.info(data);
    Sentry.captureMessage(data.message);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  Debug(data: LogData): void {}

  Error(data: LogData): void {
    console.error(data);
    Sentry.captureException(data.error);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  Warn(data: LogData): void {}
}
