import type { EndpointBody, EndpointParams } from "@repo/types";

import { typedRequest } from "../../../../infrastructure/http/axios-client";

// =============================================================================
// Vectorize Types
// =============================================================================

export type VectorizeUpdateParams = EndpointParams<"/api/private/vectorize/update">;
export type VectorizeUpdateBody = EndpointBody<"/api/private/vectorize/update">;
export type VectorizeDestroyParams = EndpointParams<"/api/private/vectorize/destroy">;
export type VectorizeDestroyBody = EndpointBody<"/api/private/vectorize/destroy">;

/**
 * Vectorize (AI) endpoints
 */
export const vectorizeEndpoint = {
  /**
   * Update vectorization for a file
   */
  update: (params: VectorizeUpdateParams, body: VectorizeUpdateBody) =>
    typedRequest<void>()(
      { route: "/api/private/vectorize/update", params, body },
      { showSuccess: true }
    ),

  /**
   * Remove vectorization for a file
   */
  destroy: (params: VectorizeDestroyParams, body: VectorizeDestroyBody) =>
    typedRequest<void>()(
      { route: "/api/private/vectorize/destroy", params, body },
      { showSuccess: true }
    ),
};

// Direct function exports for backwards compatibility
export const vectorizeUpdate = vectorizeEndpoint.update;
export const vectorizeDestroy = vectorizeEndpoint.destroy;
