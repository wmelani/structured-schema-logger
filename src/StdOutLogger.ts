import { ILogger } from "./ILogger";
import { ILoggingEntry } from "./ILoggingEntry";
import { EOL } from "os";
import ErrorFormatter from "./utilities/ErrorFormatter";

/***
 * A Default logger that can be used for logging to STD err/out. Useful for an application that uses std-out redirect
 * such as a docker container.
 */
export default class StdOutLogger implements ILogger {
  error(entry: ILoggingEntry, error: Error): void {
    const errorData = ErrorFormatter.format(error);

    const newEntry = {
      // before to allow overriding of schema
      schema: "error",
      ...errorData,
      ...entry,
      // last to force override of error
      severity: "error"
    };
    this.log(<ILoggingEntry>newEntry);
  }
  constructor(private readonly defaults = {}) {}
  log(entry: ILoggingEntry): void {
    const metadata = {
      time: new Date()
    };
    const message = { ...metadata, ...this.defaults, ...entry };
    const messageJson = JSON.stringify(message);
    const line = `${messageJson}${EOL}`;

    if (entry.severity === "error") {
      process.stderr.write(line);
    }
    process.stdout.write(line);
  }
}
