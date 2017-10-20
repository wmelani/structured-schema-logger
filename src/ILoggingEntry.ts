export interface ILoggingEntry {
  message?: string;
  requestId?: string;
  componentId?: string;
  schema: string;
  severity: "debug" | "trace" | "warn" | "error" | "info";
}
