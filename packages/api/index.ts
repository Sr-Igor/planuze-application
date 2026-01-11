// Exporta a função principal para fazer chamadas de API
export { callEndpoint } from "./generator";

// Exporta todos os tipos de entidades (action, company, user, etc.)
export * from "./generator/types";

// Exporta tipos de rotas e endpoints
export type { Routes, RouteConfig, Endpoints } from "./generator/endpoints";
