import { ResponseMessage } from "types/response";

export const responseObjectWrapper = (
  status: boolean,
  message: string,
  body?: Record<string, unknown> | Record<string, unknown>[] | undefined
) => {
  const result: ResponseMessage = {
    ok: status,
    data: body,
    message: message,
  };
  return result;
};
