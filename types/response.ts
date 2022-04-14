export interface ResponseMessage {
  ok?: boolean;
  message?: string;
  data?: Record<string, unknown> | Record<string, unknown>[];
}
