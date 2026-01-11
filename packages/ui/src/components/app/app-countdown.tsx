//Libs
import { addMinutes } from "date-fns";
import { useTimer } from "react-timer-hook";

export interface IAppCountdown extends React.HTMLAttributes<HTMLSpanElement> {
  date: Date;
  expire: number;
  onExpire: () => void;
}

export const AppCountdown = ({ date, expire, onExpire = () => {}, ...rest }: IAppCountdown) => {
  const { seconds, minutes } = useTimer({
    expiryTimestamp: addMinutes(date, expire),
    onExpire,
  });

  return (
    <span {...rest}>
      <span>{minutes?.toString()?.padStart(2, "0") || "00"}</span>:
      <span>{seconds?.toString()?.padStart(2, "0") || "00"}</span>
    </span>
  );
};
