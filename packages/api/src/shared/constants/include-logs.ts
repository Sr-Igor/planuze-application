/**
 * Default Prisma include configuration for audit logs relation
 *
 * This is used to include the logs relation in entities that have audit logging.
 * The logs relation points to the log__* table for each entity.
 *
 * Each log entry contains:
 * - auth_ref_api: Reference to the user who made the change via API
 * - auth_ref_integration: Reference to the integration that made the change
 * - auth_ref_manager: Reference to the admin who made the change
 *
 * @example
 * ```ts
 * // For entities WITH logs relation (e.g., client, profile, project)
 * const query = {
 *   include: {
 *     logs, // This includes the logs relation with auth references
 *     client_address: true,
 *   }
 * };
 * ```
 */
export const logs = {
  include: {
    auth_ref_api: {
      select: {
        name: true,
      },
    },
    auth_ref_integration: {
      select: {
        name: true,
      },
    },
    auth_ref_manager: {
      select: {
        id: true,
      },
    },
  },
};
