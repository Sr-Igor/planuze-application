/**
 * Manager Module
 *
 * This module contains endpoints and hooks specific to the
 * admin app (manager). It uses a different API prefix
 * (/api/admin) than the web module (/api/private).
 *
 * The structure follows the same pattern as the web module:
 * - endpoints/ - CRUD endpoint definitions
 * - hooks/ - React hooks for endpoint consumption
 */

// Endpoints
export * from "./endpoints";

// Hooks
export * from "./hooks";
