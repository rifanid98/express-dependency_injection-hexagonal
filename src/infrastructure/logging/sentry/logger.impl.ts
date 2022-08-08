import * as Sentry from "@sentry/node";
import "@sentry/tracing";
import { LogData, Logger } from "../../../core/port/infrastructure";
import { autoInjectable, singleton } from "tsyringe";
import * as winston from "winston";

@singleton()
@autoInjectable()
export class LoggerImpl implements Logger {
  private logger: winston.Logger;

  constructor() {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,

      // Set tracesSampleRate to 1.0 to capture 100%
      // of transactions for performance monitoring.
      // We recommend adjusting this value in production
      tracesSampleRate: 1.0,
      debug: true,
    });

    this.logger = winston.createLogger({
      level: process.env.LOG_LEVEL,
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.simple(),
            winston.format.colorize()
          ),
        }),
      ],
    });
  }

  Info(data: LogData): void {
    this.logger.info(data);
    Sentry.captureMessage(data.message);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  Debug(data: LogData): void {
    this.logger.debug(data);
  }

  Error(data: LogData): void {
    console.error(data);
    Sentry.captureException(data.error);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  Warn(data: LogData): void {
    this.logger.warn(data);
  }
}
