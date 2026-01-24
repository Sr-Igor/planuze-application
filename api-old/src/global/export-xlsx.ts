import api from '..';
import { downloadFromAxiosResponse } from './download-buffer';

export const exporteXlsx = async (url: string, filters: any) => {
    try {
        const response = await api.get(url, {
            params: filters,
            responseType: 'arraybuffer',
            headers: {
                Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            }
        });

        downloadFromAxiosResponse(response);

        return { success: true };
    } catch (error) {
        console.error('Export error:', error);
        throw error;
    }
};
