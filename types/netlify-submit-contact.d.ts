declare module "./netlify/functions/submit-contact.js" {
  export type SubmitContactEvent = {
    httpMethod: string;
    body?: string;
  };

  export type SubmitContactResult = {
    statusCode: number;
    headers?: Record<string, string>;
    body?: string;
  };

  export function handler(event: SubmitContactEvent): Promise<SubmitContactResult>;
}
