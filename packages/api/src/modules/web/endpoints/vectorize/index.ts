import { handleRequest } from "../../../../infrastructure/http/axios-client";

/**
 * Vectorize (AI) endpoints
 */
export const vectorizeEndpoint = {
  /**
   * Update vectorization for a file
   */
  update: async (file: string, body: any) => {
    return handleRequest(
      "PUT",
      `/api/private/vectorize/update`,
      body,
      { params: { file } },
      { showSuccess: true }
    );
  },

  /**
   * Remove vectorization for a file
   */
  destroy: async (file: string, body: any) => {
    return handleRequest(
      "DELETE",
      `/api/private/vectorize/destroy`,
      body,
      { params: { file } },
      { showSuccess: true }
    );
  },
};

// Direct function exports for backwards compatibility
export const vectorizeUpdate = vectorizeEndpoint.update;
export const vectorizeDestroy = vectorizeEndpoint.destroy;
