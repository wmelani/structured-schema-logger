import { ILoggingEntry } from "../../ILoggingEntry";

export interface IHttpLoggingEntry extends ILoggingEntry {
  requestHeaders: {};
  requestBody?: any;
  requestUrl: string;
  requestMethod: string;
  requestBodyLength: number;
  responseBody?: any;
  responseStatus: number;
  responseDuration: number;
  referrer?: string;
}
