export type LogData = {
  error?: Error;
  message?: string;
  stacktrace?: string;
};

interface LoggerInterface {
  Info(data: LogData);

  Error(data: LogData);

  Warn(data: LogData);

  Debug(data: LogData);
}

export class Logger implements LoggerInterface {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  Info(data: LogData) {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  Error(data: LogData) {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  Debug(data: LogData) {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  Warn(data: LogData) {}
}
