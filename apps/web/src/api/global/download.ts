import { fingerprint } from "@repo/utils";

import { getModule } from "@/hooks/cookies/module";
import { getProfile } from "@/hooks/cookies/profile";
import { getToken } from "@/hooks/cookies/token";
import { store } from "@/store";

export async function downloadFile(url: string, filename: string) {
  try {
    const token = getToken();
    const profileId = getProfile() || (store.getState() as any).module.profileId;
    const moduleId = getModule() || (store.getState() as any).module.moduleId;
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
