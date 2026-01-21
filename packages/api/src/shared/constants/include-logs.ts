/**
 * Default Prisma include for audit logs
 * Used to include basic auth reference info in API responses
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
