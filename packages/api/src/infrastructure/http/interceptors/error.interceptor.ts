import type { AxiosError } from "axios";
import { toast } from "sonner";

import { useSignOut } from "@repo/cookies";

import { type ApiError, ResponseCodes } from "../../../core/domain/value-objects/api-response.vo";

const GENERIC_ERROR = "Connection Error";
const INTERNAL_SERVER_ERROR = "Internal Server Error";

/**
 * Custom error with additional API data
 */
export class ApiRequestError extends Error {
  public readonly data: ApiError;
  public readonly isInternal: boolean;

  constructor(message: string, data: ApiError, isInternal = false) {
    super(message);
    this.name = "ApiRequestError";
    this.data = data;
    this.isInternal = isInternal;
  }
}

export interface ErrorInterceptorOptions {
  showError?: boolean;
  hideError?: boolean;
  method?: string;
}

/**
 * Response error handler
 */
export const handleResponseError = (
  error: AxiosError<{ error?: string; code?: string }>,
  options: ErrorInterceptorOptions = {}
): never => {
  const { showError, hideError, method } = options;
  const response = error.response;
  const status = response?.status ?? 0;
  const responseData = response?.data;

  // Extract method from error config if not provided in options
  const requestMethod = method || error.config?.method?.toUpperCase() || "GET";

  // 401 - Unauthorized
  if (status === 401) {
    const { out } = useSignOut(true);
    out();
    throw new ApiRequestError("Unauthorized", {
      error: "Unauthorized",
      code: ResponseCodes.UNAUTHORIZED,
      status: 401,
      method: requestMethod,
    });
  }

  // 422 - Two-Factor Auth required
  if (status === 422 && typeof globalThis.window !== "undefined") {
    if (!globalThis.window.location.pathname.includes("/config/two_auth")) {
      globalThis.window.location.href = "/config/two_auth";
    }
    throw new ApiRequestError("Two-factor authentication required", {
      error: "Two-factor authentication required",
      code: ResponseCodes.TWO_AUTH_REQUIRED,
      status: 422,
      method: requestMethod,
    });
  }

  const errorMessage = responseData?.error || GENERIC_ERROR;
  const isGenericError = errorMessage === GENERIC_ERROR;
  const isInternalError = errorMessage === INTERNAL_SERVER_ERROR;
  const isGetMethod = requestMethod === "GET";

  // Show error toast
  const shouldShowError = (!isGetMethod && !isGenericError && !hideError) || showError;
  if (shouldShowError) {
    toast.error(errorMessage, { duration: isGenericError ? 500 : 6000 });
  }

  throw new ApiRequestError(
    errorMessage,
    {
      error: errorMessage,
      code:
        responseData?.code ??
        (isGenericError ? ResponseCodes.CONNECTION_ERROR : ResponseCodes.INTERNAL_SERVER_ERROR),
      status: status || 400,
      method: requestMethod,
      connectionError: isGenericError,
    },
    isInternalError
  );
};
