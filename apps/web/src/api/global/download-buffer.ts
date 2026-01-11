import { toast } from "sonner";

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
        bytes[i] = binaryString.charCodeAt(i) & 0xff;
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

export const extractDownloadInfo = (headers: any) => {
  const contentDisposition = headers["content-disposition"] || headers["Content-Disposition"];

  let filename = "";

  if (contentDisposition) {
    const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
    if (filenameMatch && filenameMatch[1]) {
      filename = filenameMatch[1].replaceAll(/['"]/g, "");
    }

    if (!filename) {
      const filenameStarMatch = contentDisposition.match(/filename\*=UTF-8''([^;\n]*)/);
      if (filenameStarMatch && filenameStarMatch[1]) {
        filename = decodeURIComponent(filenameStarMatch[1]);
      }
    }

    if (!filename) {
      const simpleMatch = contentDisposition.match(/filename=([^;]+)/);
      if (simpleMatch && simpleMatch[1]) {
        filename = simpleMatch[1].replaceAll(/['"]/g, "").trim();
      }
    }
  }

  if (!filename) throw new Error("Filename not found in Content-Disposition header");

  const mimeType = headers["content-type"] || headers["Content-Type"] || "application/octet-stream";

  return { filename, mimeType };
};

export interface IDownloadInfo {
  buffer: ArrayBuffer | string;
  filename: string;
  mimeType: string;
}

export const downloadFromAxiosResponse = (response: any) => {
  const { filename, mimeType } = extractDownloadInfo(response.headers);
  downloadFromBuffer(response.data, filename, mimeType);
};
