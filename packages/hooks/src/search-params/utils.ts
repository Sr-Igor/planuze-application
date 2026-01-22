import { ReadonlyURLSearchParams } from "next/navigation";

import { z } from "zod";

export const paginationSchema = z.object({
  search: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  orderKey: z.string().default("createdAt"),
  orderValue: z.enum(["asc", "desc"]).default("desc"),
});

export const baseFilterSchema = z.object({
  search: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  orderKey: z.string().default("createdAt"),
  orderValue: z.enum(["asc", "desc"]).default("desc"),
});

export type PaginationParams = z.infer<typeof paginationSchema>;
export type BaseFilterParams = z.infer<typeof baseFilterSchema>;

export class SearchParamsUtils {
  static serialize(params: Record<string, any>): URLSearchParams {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        searchParams.set(key, String(value));
      }
    });

    return searchParams;
  }

  static deserialize(
    searchParams: ReadonlyURLSearchParams | URLSearchParams
  ): Record<string, string> {
    const params: Record<string, string> = {};

    for (const [key, value] of searchParams.entries()) {
      params[key] = value;
    }

    return params;
  }

  static parseWithSchema<T>(
    searchParams: ReadonlyURLSearchParams | URLSearchParams,
    schema: z.ZodSchema<T>
  ): T {
    const params = this.deserialize(searchParams);
    const result = schema.safeParse(params);

    if (result.success) {
      return result.data;
    }

    return schema.parse({});
  }

  static merge(
    current: ReadonlyURLSearchParams | URLSearchParams,
    updates: Record<string, any>,
    replaceAll = false
  ): URLSearchParams {
    const searchParams = replaceAll
      ? new URLSearchParams()
      : new URLSearchParams(current.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === undefined || value === "") {
        searchParams.delete(key);
      } else {
        searchParams.set(key, String(value));
      }
    });

    return searchParams;
  }

  static remove(
    current: ReadonlyURLSearchParams | URLSearchParams,
    keys: string[]
  ): URLSearchParams {
    const searchParams = new URLSearchParams(current.toString());

    keys.forEach((key) => {
      searchParams.delete(key);
    });

    return searchParams;
  }

  static createUrl(pathname: string, params: Record<string, any>): string {
    const searchParams = this.serialize(params);
    const queryString = searchParams.toString();

    return queryString ? `${pathname}?${queryString}` : pathname;
  }
}

export const defaultPaginationParams: PaginationParams = {
  page: 1,
  limit: 10,
  orderKey: "createdAt",
  orderValue: "desc",
};

export const baseFilterParams: BaseFilterParams = {
  page: 1,
  limit: 10,
  orderKey: "createdAt",
  orderValue: "desc",
};
