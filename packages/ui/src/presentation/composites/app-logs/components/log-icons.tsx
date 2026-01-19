import {
  Clock3,
  ClockArrowDown,
  ClockArrowUp,
  ClockFading,
  ClockPlus,
  Trash2Icon,
} from "lucide-react";

import type { LogAction } from "../types";

export const logIcons: Record<LogAction, React.ReactNode> = {
  CREATE: <ClockPlus size={18} className="text-green-500" />,
  UPDATE: <ClockArrowUp size={18} className="text-blue-500" />,
  DELETE: <ClockArrowDown size={18} className="text-red-500" />,
  INDEX: <ClockFading size={18} className="text-yellow-500" />,
  SHOW: <Clock3 size={18} className="text-purple-500" />,
  TRASH: <Trash2Icon size={18} className="text-gray-500" />,
  RESTORE: <ClockArrowDown size={18} className="text-green-500" />,
};
