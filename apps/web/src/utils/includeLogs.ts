export const logs = {
    include: {
        auth_ref_api: {
            select: {
                name: true
            }
        },
        auth_ref_integration: {
            select: {
                name: true
            }
        },
        auth_ref_manager: {
            select: {
                id: true
            }
        }
    }
};
