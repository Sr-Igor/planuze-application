/**
 * InputOTP Component Module
 *
 * One-time password input component.
 *
 * @module presentation/primitives/input-otp
 */

"use client";

import { OTPInput, OTPInputContext } from "input-otp";
import { MinusIcon } from "lucide-react";
import { ComponentPropsWithoutRef, forwardRef, useContext } from "react";

import { cn } from "../../../shared/utils";

// ============================================================================
// Root Components
// ============================================================================

export type InputOTPProps = ComponentPropsWithoutRef<typeof OTPInput> & {
  containerClassName?: string;
};

const InputOTP = forwardRef<React.ElementRef<typeof OTPInput>, InputOTPProps>(
  ({ className, containerClassName, ...props }, ref) => (
    <OTPInput
      ref={ref}
      data-slot="input-otp"
      containerClassName={cn("flex items-center gap-2 has-disabled:opacity-50", containerClassName)}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  )
);

InputOTP.displayName = "InputOTP";

// ============================================================================
// Group & Slot
// ============================================================================

export type InputOTPGroupProps = ComponentPropsWithoutRef<"div">;

const InputOTPGroup = forwardRef<HTMLDivElement, InputOTPGroupProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="input-otp-group"
      className={cn("flex items-center", className)}
      {...props}
    />
  )
);

InputOTPGroup.displayName = "InputOTPGroup";

export type InputOTPSlotProps = ComponentPropsWithoutRef<"div"> & {
  index: number;
};

const InputOTPSlot = forwardRef<HTMLDivElement, InputOTPSlotProps>(
  ({ index, className, ...props }, ref) => {
    const inputOTPContext = useContext(OTPInputContext);
    const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

    return (
      <div
        ref={ref}
        data-slot="input-otp-slot"
        data-active={isActive}
        className={cn(
          "border-input relative flex h-9 w-9 items-center justify-center border-y border-r text-sm shadow-xs transition-all outline-none",
          "first:rounded-l-md first:border-l last:rounded-r-md",
          "data-[active=true]:border-ring data-[active=true]:ring-ring/50 data-[active=true]:z-10 data-[active=true]:ring-[3px]",
          "data-[active=true]:aria-invalid:ring-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40",
          "aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive",
          className
        )}
        {...props}
      >
        {char}
        {hasFakeCaret && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
          </div>
        )}
      </div>
    );
  }
);

InputOTPSlot.displayName = "InputOTPSlot";

// ============================================================================
// Separator
// ============================================================================

export type InputOTPSeparatorProps = ComponentPropsWithoutRef<"div">;

const InputOTPSeparator = forwardRef<HTMLDivElement, InputOTPSeparatorProps>(
  ({ ...props }, ref) => (
    <div ref={ref} data-slot="input-otp-separator" aria-hidden="true" {...props}>
      <MinusIcon />
    </div>
  )
);

InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot };
