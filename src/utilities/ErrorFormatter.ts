export interface IErrorFields {
    "error-line-number"?: number;
    "error-column-number"?: number;
    "error-stack-trace"?: string;
    "error-message"?: string;
    "error-type"?: string;
    "error-file-name"?: string;
}
export default class ErrorFormatter {
  public static format(error: Error): IErrorFields {
    if (!error) {
      return {};
    }

    //TODO: This doesn't handle the remaining IErrorFields
    return <IErrorFields>{
      "error-message": error.message ? error.message : null,
      "error-stack-trace": error.stack ? error.stack : null,
      "error-type": error.name ? error.name : null
    };
  }
}
