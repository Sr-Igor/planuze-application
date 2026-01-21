import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";
import { toast } from "sonner";

import { callEndpoint, type Routes } from "@repo/types";

import type {
  IHttpClient,
  RequestConfig,
} from "../../core/domain/interfaces/http-client.interface";
import { authInterceptor } from "./interceptors/auth.interceptor";
import {
  type ErrorInterceptorOptions,
  handleResponseError,
} from "./interceptors/error.interceptor";
import { headersInterceptor } from "./interceptors/headers.interceptor";

/**
 * Configuration for HTTP client creation
 */
export interface AxiosClientConfig {
  baseURL?: string;
  timeout?: number;
}

/**
 * Request options
 */
export interface RequestOptions extends ErrorInterceptorOptions {
  showSuccess?: boolean;
  successMessage?: string;
}

/**
 * Creates a configured HTTP client instance based on Axios
 */
export const createAxiosClient = (config?: AxiosClientConfig): AxiosInstance => {
  const baseURL = config?.baseURL ?? process.env.NEXT_PUBLIC_API_URL;

  const instance = axios.create({
    baseURL,
    timeout: config?.timeout ?? 240000,
  });

  // Request interceptors
  instance.interceptors.request.use(
    async (axiosConfig) => {
      let config = await authInterceptor(axiosConfig);
      config = await headersInterceptor(config);
      return config;
    },
    (error) => {
      toast.error("Error connecting to server");
      return Promise.reject(error);
    }
  );

  return instance;
};

/**
 * Default singleton HTTP client
 */
let defaultClient: AxiosInstance | null = null;

export const getDefaultClient = (): AxiosInstance => {
  if (!defaultClient) {
    defaultClient = createAxiosClient();
  }
  return defaultClient;
};

/**
 * Executes an HTTP request with error and success handling
 */
export const handleRequest = async <T>(
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  url: string,
  body?: unknown,
  config?: AxiosRequestConfig,
  options?: RequestOptions
): Promise<T> => {
  const client = getDefaultClient();
  const { showSuccess, successMessage, showError, hideError } = options ?? {};

  // Validation: GET cannot have body
  if (method === "GET" && body) {
    throw new Error("Body is not allowed in GET method");
  }

  // Parse body (converts undefined to null)
  const isFormData = config?.headers?.["Content-Type"] === "multipart/form-data";
  const parsedBody =
    !isFormData && body && typeof body === "object"
      ? Object.fromEntries(
          Object.entries(body).map(([key, value]) => [key, value === undefined ? null : value])
        )
      : body;

  try {
    let response;

    switch (method) {
      case "GET":
        response = await client.get(url, config);
        break;
      case "POST":
        response = await client.post(url, parsedBody, config);
        break;
      case "PUT":
        response = await client.put(url, parsedBody, config);
        break;
      case "DELETE":
        response = await client.delete(url, config);
        break;
      case "PATCH":
        response = await client.patch(url, parsedBody, config);
        break;
    }

    const isPartial = response?.data?.code === "partial_many";
    const message = response?.data?.message || successMessage;

    if (showSuccess && message) {
      isPartial ? toast.warning(message) : toast.success(message);
    }

    return response?.data?.data as T;
  } catch (error: any) {
    handleResponseError(error, { showError, hideError, method });
    throw error; // TypeScript needs this
  }
};

/**
 * IHttpClient implementation using Axios
 */
export const axiosHttpClient: IHttpClient = {
  get: <T>(url: string, config?: RequestConfig) =>
    handleRequest<T>("GET", url, undefined, config as AxiosRequestConfig),

  post: <T>(url: string, body?: unknown, config?: RequestConfig) =>
    handleRequest<T>("POST", url, body, config as AxiosRequestConfig),

  put: <T>(url: string, body?: unknown, config?: RequestConfig) =>
    handleRequest<T>("PUT", url, body, config as AxiosRequestConfig),

  delete: <T>(url: string, config?: RequestConfig) =>
    handleRequest<T>("DELETE", url, undefined, config as AxiosRequestConfig),

  patch: <T>(url: string, body?: unknown, config?: RequestConfig) =>
    handleRequest<T>("PATCH", url, body, config as AxiosRequestConfig),
};

// =============================================================================
// Typed Request using callEndpoint
// =============================================================================

/**
 * Arguments type for typedRequest - extracts from callEndpoint Args type
 */
type TypedRequestArgs<R extends Routes> = Parameters<typeof callEndpoint<R>>[0];

/**
 * Extended options for typedRequest including axios config
 */
export interface TypedRequestOptions extends RequestOptions {
  /**
   * Custom axios config (headers, etc.)
   */
  axiosConfig?: AxiosRequestConfig;
  /**
   * Transform body before sending (e.g., for FormData)
   */
  transformBody?: (body: unknown) => unknown;
}

/**
 * Executes a typed HTTP request using callEndpoint for route validation.
 *
 * This function provides compile-time type safety for API routes, ensuring that:
 * - The route exists in the API specification
 * - Required params are provided
 * - Query parameters match the expected type
 * - Body matches the expected type (when applicable)
 *
 * @example
 * ```ts
 * // Simple GET request
 * const data = await typedRequest<MyType>()({
 *   route: "/api/private/chat/index",
 *   query: { limit: "10" }
 * });
 *
 * // POST request with body
 * const result = await typedRequest<ResultType>()({
 *   route: "/api/private/chat/messages",
 *   body: { question: "Hello", features: "general" }
 * });
 *
 * // Request with params
 * const item = await typedRequest<ItemType>()({
 *   route: "/api/private/chat/show",
 *   params: { id: "123" }
 * });
 *
 * // Request with FormData
 * const user = await typedRequest<UserType>()({
 *   route: "/api/private/user/update",
 *   params: { id: "123" },
 *   body: formData
 * }, {
 *   axiosConfig: { headers: { "Content-Type": "multipart/form-data" } },
 *   transformBody: (body) => setFormData(body, ["avatar"])
 * });
 * ```
 */
export const typedRequest = <T>() => {
  return async <R extends Routes>(
    args: TypedRequestArgs<R>,
    options?: TypedRequestOptions
  ): Promise<T> => {
    const result = callEndpoint(args);
    let body = "body" in result ? result.body : undefined;

    // Apply body transformation if provided (e.g., for FormData)
    if (body && options?.transformBody) {
      body = options.transformBody(body);
    }

    const { axiosConfig, transformBody, ...requestOptions } = options ?? {};

    return handleRequest<T>(
      result.method,
      result.url,
      body,
      axiosConfig,
      requestOptions
    );
  };
};
