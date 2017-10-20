import { ILoggingEntry } from "./ILoggingEntry";

export interface ILogger {
  log(entry: ILoggingEntry): void;
  error(entry: ILoggingEntry, error: Error): void;
}
