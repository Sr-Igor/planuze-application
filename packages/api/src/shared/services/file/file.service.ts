import { fingerprint } from "@repo/utils";

import { getModule, getProfile, getToken } from "../../../../../cookies/src";

/**
 * Get a file from a URL as a Blob with authentication headers
 *
 * @param url - The URL to fetch from
 * @returns The file as a Blob or null if failed
 */
export async function getFile(url: string): Promise<Blob | null> {
  try {
    const token = getToken();
    const profileId = getProfile();
    const moduleId = getModule();
    const device = await fingerprint();
    if (!device) return null;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "x-device": device,
        "x-profile": profileId ?? "",
        "x-module": moduleId ?? "",
      },
    });

    if (!response.ok) return null;

    const blob = await response.blob();

    return blob;
  } catch {
    return null;
  }
}
