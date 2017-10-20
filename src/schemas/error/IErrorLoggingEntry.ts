import { ILoggingEntry } from "../../ILoggingEntry";

export interface IErrorLoggingEntry extends ILoggingEntry {
  "stack-trace": string;
  "line-number": string;
  "error-message": string;
  "error-type": string;
}
