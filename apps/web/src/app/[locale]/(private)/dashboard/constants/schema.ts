import { z } from 'zod';

export const schema = z.object({
    project_id: z.string().optional(),
    project_version_id: z.string().optional(),
    work_type_id: z.string().optional(),
    cost_center_id: z.string().optional(),
    owner_id: z.string().optional(),
    start_date: z.string().optional(),
    end_date: z.string().optional(),
    project_tab: z.enum(['summary', 'projects', 'costs', 'analyses']).optional(),
    personal_tab: z.enum(['general', 'projects']).optional(),
    projectIds: z.string().optional(),
    convert_currency: z.string().optional()
});
