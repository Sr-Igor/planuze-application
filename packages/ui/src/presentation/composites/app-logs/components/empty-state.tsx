import { Clock3 } from "lucide-react";

interface EmptyStateProps {
  message?: string;
}

export const EmptyState = ({ message = "No data available" }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <Clock3 size={48} className="mb-4 text-gray-400" />
      <p className="text-sm text-gray-500 dark:text-gray-400">{message}</p>
    </div>
  );
};
