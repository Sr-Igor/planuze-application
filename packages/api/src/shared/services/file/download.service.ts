import { fingerprint } from "@repo/utils";

import { getModule, getProfile, getToken } from "../../../../../cookies/src";

/**
 * Download a file from a URL with authentication headers
 *
 * @param url - The URL to download from
 * @param filename - The name for the downloaded file
 * @param store - Optional Redux store for fallback profile/module IDs
 */
export async function downloadFile(url: string, filename: string, store?: { getState: () => any }) {
  try {
    const token = getToken();
    const profileId = getProfile() || store?.getState()?.module?.profileId;
    const moduleId = getModule() || store?.getState()?.module?.moduleId;
    const device = await fingerprint();
    if (!device) return;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "x-device": device,
        "x-profile": profileId ?? "",
        "x-module": moduleId ?? "",
      },
    });
    if (!res.ok) throw new Error("Failed to download file");

    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();

    URL.revokeObjectURL(blobUrl);
  } catch (err) {
    console.error(err);
    throw err;
  }
}
