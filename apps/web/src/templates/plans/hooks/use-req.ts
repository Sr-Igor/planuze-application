import { useBilling, useSubscription } from "@repo/api/web";

export const useReq = () => {
  const { upgrade, portal } = useSubscription({
    enabledIndex: false,
    callbacks: {
      portal: {
        onSuccess: (data) => (window.location.href = data.url),
      },
      upgrade: {
        onSuccess: (data) => (window.location.href = data.url),
      },
    },
  });

  const { checkout, test } = useBilling({
    callbacks: {
      checkout: {
        onSuccess: (data) => (window.location.href = data.url),
      },

      test: {
        onSuccess: (data) => (window.location.href = data.url),
      },
    },
  });

  return {
    portal,
    checkout,
    upgrade,
    test,
  };
};
