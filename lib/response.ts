import { BaseResponse, MetaData } from "@/types/IResponse";

export const createSuccessResponse = <T>(
  data: T,
  meta?: MetaData,
  statusCode: number = 200
): BaseResponse<T> => ({
  data,
  error: null,
  meta,
  status: "success",
  statusCode,
});

export const createErrorResponse = <T = null>(
  message: string,
  statusCode: number = 400,
  code?: string,
  details?: T
): BaseResponse<null> => ({
  data: null,
  error: {
    message,
    ...(code && { code }),
    ...(details && { details }),
  },
  status: "error",
  statusCode,
});
