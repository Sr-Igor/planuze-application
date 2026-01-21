import { getDefaultClient } from "../../../infrastructure/http/axios-client";
import { downloadFromAxiosResponse } from "../file/download-buffer.service";

/**
 * Export data to XLSX format and trigger download
 *
 * @param url - The API endpoint URL
 * @param filters - Query filters to apply
 * @returns Success status object
 */
export const exportXlsx = async (url: string, filters: any) => {
  try {
    const client = getDefaultClient();
    const response = await client.get(url, {
      params: filters,
      responseType: "arraybuffer",
      headers: {
        Accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    });

    downloadFromAxiosResponse(response);

    return { success: true };
  } catch (error) {
    console.error("Export error:", error);
    throw error;
  }
};
