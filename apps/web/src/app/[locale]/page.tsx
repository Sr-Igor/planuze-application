"use client";

import { useEffect } from "react";

import { usePathname, useRouter } from "next/navigation";

import { getToken } from "@repo/cookies";

export default function Home() {
  const { replace } = useRouter();
  const path = usePathname();

  useEffect(() => {
    const token = getToken();
    if (token) replace(`/dashboard`);
    else replace(`/auth/login?callbackUrl=${path}`);
  }, []);

  return <></>;
}
