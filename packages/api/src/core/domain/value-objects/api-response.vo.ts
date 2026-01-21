/**
 * Standard API response
 */
export interface ApiResponse<T> {
  data: T;
  message?: string;
  code?: string;
}

/**
 * API error response
 */
export interface ApiError {
  error: string;
  code?: string;
  status: number;
  details?: Record<string, unknown>;
}

/**
 * Known response codes
 */
export const ResponseCodes = {
  SUCCESS: "success",
  PARTIAL_MANY: "partial_many",
  CONNECTION_ERROR: "connection_error",
  INTERNAL_SERVER_ERROR: "internal_server_error",
  UNAUTHORIZED: "unauthorized",
  FORBIDDEN: "forbidden",
  NOT_FOUND: "not_found",
  VALIDATION_ERROR: "validation_error",
  TWO_AUTH_REQUIRED: "two_auth_required",
} as const;

export type ResponseCode = (typeof ResponseCodes)[keyof typeof ResponseCodes];
