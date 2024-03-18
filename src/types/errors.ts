/**
 * A representation of validation errors received from the back end.
 */
export type ValidationErrors<T = any> = {
  [K in keyof T]?: string[];
};

export interface ErrorResponseData {
  errors?: ValidationErrors;
}

export class FetchError extends Error {
  readonly isFetchError = true;

  response: Response;

  constructor(response: Response) {
    super(`Response status: ${response.status}`);
    this.response = response;
  }
}

export const isFetchError = (error: any): error is FetchError =>
  !!error.isFetchError;
