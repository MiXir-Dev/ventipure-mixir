export type SubmitContactEvent = {
  httpMethod: string;
  body?: string;
};

export type SubmitContactResponse = {
  statusCode: number;
  headers?: Record<string, string>;
  body?: string;
};

export declare function handler(
  event: SubmitContactEvent,
): Promise<SubmitContactResponse>;
