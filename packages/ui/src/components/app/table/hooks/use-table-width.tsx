import { useEffect, useState } from "react";

export function useWindowWidth() {
  const [w, setW] = useState(typeof window === "undefined" ? 0 : window.innerWidth);

  useEffect(() => {
    const onResize = () => setW(window.innerWidth);
    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, []);

  return w;
}
