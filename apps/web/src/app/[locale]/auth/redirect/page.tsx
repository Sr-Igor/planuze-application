"use client";

//React && Hooks
import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { useLang } from "@repo/language/hooks";
import { LoaderTemplate } from "@repo/templates";

import { useUserSet } from "@/hooks/user-set";

export default function LoginPage() {
  const route = useRouter();

  const t = useLang();

  const { setter } = useUserSet();

  useEffect(() => {
    const navElement = document.getElementById("global-nav-element");
    if (navElement) navElement.style.opacity = "0";

    getUser();

    return () => {
      if (navElement) navElement.style.opacity = "1";
    };
  }, []);

  const getUser = async () => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_REDIRECT_URL!, {
        credentials: "include",
      });

      const data = await res.json();
      const user = data.data;
      if (!user) route.push(`/auth/error?error=${t.error("error_user_not_found")}`);
      setter(user);
    } catch (error) {
      console.error(error);
      route.push(`/auth/error?error=${t.error("error_register")}`);
    }
  };

  return <LoaderTemplate />;
}
