import { getModule, getProfile, getToken } from "@repo/cookies";
import { fingerprint } from "@repo/utils";

// import { store } from "@/store";

export async function getFile(url: string) {
  try {
    const token = getToken();
    const profileId = getProfile();
    const moduleId = getModule();
    // const profileId = getProfile() || (store.getState() as any).module.profileId;
    // const moduleId = getModule() || (store.getState() as any).module.moduleId;
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
