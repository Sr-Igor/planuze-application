"use client";

import { useEffect, useState, useCallback, useRef } from "react";

import { addMinutes, differenceInSeconds } from "date-fns";

export interface AppCountdownProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Start date for the countdown
   */
  date: Date;
  /**
   * Expiration time in minutes
   */
  expire: number;
  /**
   * Callback when the countdown expires
   */
  onExpire?: () => void;
  /**
   * Custom format function for the countdown display
   */
  formatDisplay?: (minutes: number, seconds: number) => React.ReactNode;
}

interface CountdownState {
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

const useCountdown = (
  expiryDate: Date,
  onExpire?: () => void
): CountdownState => {
  const [state, setState] = useState<CountdownState>(() => {
    const diff = differenceInSeconds(expiryDate, new Date());
    if (diff <= 0) {
      return { minutes: 0, seconds: 0, isExpired: true };
    }
    return {
      minutes: Math.floor(diff / 60),
      seconds: diff % 60,
      isExpired: false,
    };
  });

  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  const calculateTimeLeft = useCallback(() => {
    const diff = differenceInSeconds(expiryDate, new Date());
    if (diff <= 0) {
      return { minutes: 0, seconds: 0, isExpired: true };
    }
    return {
      minutes: Math.floor(diff / 60),
      seconds: diff % 60,
      isExpired: false,
    };
  }, [expiryDate]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newState = calculateTimeLeft();
      setState(newState);

      if (newState.isExpired) {
        clearInterval(interval);
        onExpireRef.current?.();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [calculateTimeLeft]);

  return state;
};

export const AppCountdown = ({
  date,
  expire,
  onExpire,
  formatDisplay,
  ...rest
}: AppCountdownProps) => {
  const expiryDate = addMinutes(date, expire);
  const { minutes, seconds } = useCountdown(expiryDate, onExpire);

  const defaultFormat = (mins: number, secs: number) => (
    <>
      <span>{mins.toString().padStart(2, "0")}</span>
      {":"}
      <span>{secs.toString().padStart(2, "0")}</span>
    </>
  );

  return (
    <span {...rest}>
      {formatDisplay ? formatDisplay(minutes, seconds) : defaultFormat(minutes, seconds)}
    </span>
  );
};

AppCountdown.displayName = "AppCountdown";
