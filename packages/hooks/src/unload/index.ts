import { useEffect } from "react";

export const useUnload = (dep: boolean, callback?: (dep: boolean) => void) => {
  useEffect(() => {
    callback?.(dep);
    window.onbeforeunload = function (e) {
      if (dep) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    return () => {
      window.onbeforeunload = null;
    };
  }, [dep]);
};
