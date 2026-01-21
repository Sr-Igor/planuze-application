import { toast } from "sonner";

/**
 * Download info interface
 */
export interface IDownloadInfo {
  buffer: ArrayBuffer | string;
  filename: string;
  mimeType: string;
}

/**
 * Download a file from an ArrayBuffer or binary string
 *
 * @param buffer - The file content as ArrayBuffer or binary string
 * @param filename - The name for the downloaded file
 * @param mimeType - The MIME type of the file (default: application/octet-stream)
 */
export const downloadFromBuffer = (
  buffer: ArrayBuffer | string,
  filename: string,
  mimeType: string = "application/octet-stream"
) => {
  try {
    let arrayBuffer: ArrayBuffer;
    if (typeof buffer === "string") {
      const binaryString = buffer;
      const bytes = new Uint8Array(binaryString.length);

      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = (binaryString.codePointAt(i) ?? 0) & 0xff;
      }

      arrayBuffer = bytes.buffer;
    } else {
      arrayBuffer = buffer;
    }

    const blob = new Blob([arrayBuffer], { type: mimeType });
    const blobUrl = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = filename;
    a.style.display = "none";

    document.body.appendChild(a);
    a.click();
    a.remove();

    URL.revokeObjectURL(blobUrl);
  } catch (error: any) {
    toast.error("Unexpected error to download file");
    console.error(`Unexpected error to download file: ${error?.message}`);
  }
};

/**
 * Extract filename and MIME type from response headers
 *
 * @param headers - Response headers object
 * @returns Object with filename and mimeType
 */
export const extractDownloadInfo = (headers: any) => {
  const contentDisposition = headers["content-disposition"] || headers["Content-Disposition"];

  let filename = "";

  if (contentDisposition) {
    const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
    if (filenameMatch?.[1]) {
      filename = filenameMatch[1].replaceAll(/['"]/g, "");
    }

    if (!filename) {
      const filenameStarMatch = contentDisposition.match(/filename\*=UTF-8''([^;\n]*)/);
      if (filenameStarMatch?.[1]) {
        filename = decodeURIComponent(filenameStarMatch[1]);
      }
    }

    if (!filename) {
      const simpleMatch = contentDisposition.match(/filename=([^;]+)/);
      if (simpleMatch?.[1]) {
        filename = simpleMatch[1].replaceAll(/['"]/g, "").trim();
      }
    }
  }

  if (!filename) throw new Error("Filename not found in Content-Disposition header");

  const mimeType = headers["content-type"] || headers["Content-Type"] || "application/octet-stream";

  return { filename, mimeType };
};

/**
 * Download a file from an Axios response with arraybuffer data
 *
 * @param response - Axios response with arraybuffer data
 */
export const downloadFromAxiosResponse = (response: any) => {
  const { filename, mimeType } = extractDownloadInfo(response.headers);
  downloadFromBuffer(response.data, filename, mimeType);
};
