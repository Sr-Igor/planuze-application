/* eslint-disable */
import { flatEndpoints, Routes, RouteConfig } from "./endpoints";

/* -------------------------------------------------
 * Tipos utilitários para construir a chamada
 * -------------------------------------------------*/

// Args<R>      – define exatamente quais campos precisam
//                (ou podem) ser passados para cada rota.
type Args<R extends Routes> =
  { route: R } &
  (RouteConfig<R> extends { params: infer P } ? { params: P } : {}) &
  (RouteConfig<R> extends { query?: infer Q } ? { query?: Q } : {}) &
  (RouteConfig<R> extends { body:  infer B } ? { body:  B } :
   RouteConfig<R> extends { body?: infer B } ? { body?: B } : {});

// ReturnCall<R> – estrutura que a função devolve.
//                 Inclui "body" apenas quando existir na rota.
type ReturnCall<R extends Routes> =
  RouteConfig<R> extends { body:  infer B } ? { url: string; method: RouteConfig<R>["method"]; body:  B } :
  RouteConfig<R> extends { body?: infer B } ? { url: string; method: RouteConfig<R>["method"]; body?: B } :
  { url: string; method: RouteConfig<R>["method"] };

/* -------------------------------------------------
 * Utilitário: serializa objetos em query-string
 * -------------------------------------------------*/
function buildQueryString(params: Record<string, any>, prefix?: string): string {
  const query: string[] = [];
  for (const key in params) {
    if (!Object.prototype.hasOwnProperty.call(params, key)) continue;
    const value       = params[key];
    const prefixedKey = prefix ? `${prefix}[${encodeURIComponent(key)}]` : encodeURIComponent(key);
    if (value === null || value === undefined) continue;
    if (value !== null && typeof value === "object") {
      query.push(buildQueryString(value, prefixedKey));
    } else {
      query.push(`${prefixedKey}=${encodeURIComponent(String(value))}`);
    }
  }
  return query.join("&");
}

/* -------------------------------------------------
 * callEndpoint
 * -------------------------------------------------*/
export function callEndpoint<R extends Routes>(args: Args<R>): ReturnCall<R> {
  const { route, params, query, body } = args as any;
  //@ts-ignore
  const { method } = flatEndpoints[route];

  if (
    query &&
    "include" in query && "select" in query &&
    Object.keys(query.include ?? {}).length > 0 &&
    Object.keys(query.select  ?? {}).length > 0
  ) {
    throw new Error("You can't use include and select at the same time");
  }

  /* ---------- Montagem da URL ---------- */
  let url: string = route;

  if (params) {
    url += "/" + Object.values(params).map((v) => encodeURIComponent(String(v))).join("/");
  }

  if (query) {
    url += "?" + buildQueryString(query);
  }

  return { url, method, body } as ReturnCall<R>;
}

/* -------------------------------------------------
 * Fim do arquivo gerado automaticamente
 * -------------------------------------------------*/
