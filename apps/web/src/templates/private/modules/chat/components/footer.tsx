import { Send } from "lucide-react";
import { toast } from "sonner";

import { useLang } from "@repo/language/hooks";
import { Button, cn, Textarea } from "@repo/ui";

export interface IFooterProps {
  question?: string;
  setQuestion: React.Dispatch<React.SetStateAction<string | undefined>>;
  setLocalMessages: React.Dispatch<React.SetStateAction<any[]>>;
  onSend: () => void;
  disabled?: boolean;
  show: boolean;
}
export const Footer = ({
  question,
  setQuestion,
  setLocalMessages,
  onSend,
  disabled,
  show,
}: IFooterProps) => {
  const t = useLang();

  const onSendMessage = () => {
    if (!question?.trim() || disabled) return;
    setLocalMessages((prev) => [
      ...prev,
      {
        id: `${Date.now()}`,
        sender: "user",
        message: question,
        createdAt: new Date().toISOString(),
      },
    ]);
    onSend();
    setQuestion("");
  };

  return (
    <form
      className={cn(
        "flex w-full items-center gap-2 border-t border-gray-700 px-2 py-2 transition-all duration-300 sm:px-4 sm:py-4",
        !show && "mb-[-100px]"
      )}
      onSubmit={(e) => {
        e.preventDefault();
        onSendMessage();
      }}
    >
      <Textarea
        placeholder={t.chat("placeholder") || "Digite sua mensagem..."}
        className="h-9 min-w-0 flex-1 resize-none border-gray-700 text-xs sm:h-10 sm:text-sm"
        rows={1}
        maxLength={2000}
        style={{
          minHeight: "40px",
          maxHeight: "80px",
        }}
        value={question}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSendMessage();
          }
        }}
        onChange={(e) => {
          const value = e.target.value;
          if (value.length >= 2000) toast.info(t.helper("maxLength"));

          setQuestion(e.target.value);
        }}
        disabled={disabled}
      />
      <Button
        onClick={() => {
          onSendMessage();
        }}
        disabled={disabled || !question?.trim()}
        aria-label={t.chat("send")}
        title={t.chat("send")}
        className={
          disabled
            ? "h-9 w-9 cursor-not-allowed opacity-60 sm:h-10 sm:w-10"
            : "h-9 w-9 sm:h-10 sm:w-10"
        }
        size="icon"
      >
        <Send className="h-4 w-4 sm:h-5 sm:w-5" />
      </Button>
    </form>
  );
};
