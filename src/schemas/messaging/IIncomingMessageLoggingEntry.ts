import { ILoggingEntry } from "../../ILoggingEntry";

export interface IIncomingMessageLoggingEntry extends ILoggingEntry {
  "message-topic": string;
  "message-value": any;
  "message-offset"?: number;
  ack: boolean;
}
