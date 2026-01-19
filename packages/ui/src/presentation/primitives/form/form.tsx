/**
 * Form Component Module
 *
 * Form utilities built on top of react-hook-form.
 *
 * @module presentation/primitives/form
 */

"use client";

import { Slot } from "@radix-ui/react-slot";
import {
  ComponentPropsWithoutRef,
  createContext,
  forwardRef,
  useContext,
  useId,
  useMemo,
} from "react";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
  useFormState,
} from "react-hook-form";

import { cn } from "../../../shared/utils";
import { Label } from "../label";

// ============================================================================
// Context
// ============================================================================

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = createContext<FormFieldContextValue>({} as FormFieldContextValue);

type FormItemContextValue = {
  id: string;
};

const FormItemContext = createContext<FormItemContextValue>({} as FormItemContextValue);

// ============================================================================
// Hooks
// ============================================================================

/**
 * Hook to access form field state and IDs.
 */
export function useFormField() {
  const fieldContext = useContext(FormFieldContext);
  const itemContext = useContext(FormItemContext);
  const { getFieldState } = useFormContext();
  const formState = useFormState({ name: fieldContext.name });
  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
}

// ============================================================================
// Components
// ============================================================================

/**
 * Form provider component (re-export of FormProvider from react-hook-form).
 */
const Form = FormProvider;

/**
 * Form field component.
 */
function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ ...props }: ControllerProps<TFieldValues, TName>) {
  const contextValue = useMemo(() => ({ name: props.name }), [props.name]);

  return (
    <FormFieldContext.Provider value={contextValue}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
}

export type FormItemProps = ComponentPropsWithoutRef<"div">;

/**
 * Form item container component.
 */
const FormItem = forwardRef<HTMLDivElement, FormItemProps>(({ className, ...props }, ref) => {
  const id = useId();
  const contextValue = useMemo(() => ({ id }), [id]);

  return (
    <FormItemContext.Provider value={contextValue}>
      <div ref={ref} data-slot="form-item" className={cn("grid gap-2", className)} {...props} />
    </FormItemContext.Provider>
  );
});

FormItem.displayName = "FormItem";

export type FormLabelProps = ComponentPropsWithoutRef<typeof Label>;

/**
 * Form label component.
 */
const FormLabel = forwardRef<HTMLLabelElement, FormLabelProps>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <Label
      ref={ref}
      data-slot="form-label"
      data-error={!!error}
      className={cn("data-[error=true]:text-destructive-foreground", className)}
      htmlFor={formItemId}
      {...props}
    />
  );
});

FormLabel.displayName = "FormLabel";

export type FormControlProps = ComponentPropsWithoutRef<typeof Slot>;

/**
 * Form control component.
 */
const FormControl = forwardRef<HTMLElement, FormControlProps>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

  return (
    <Slot
      ref={ref}
      data-slot="form-control"
      id={formItemId}
      aria-describedby={error ? `${formDescriptionId} ${formMessageId}` : formDescriptionId}
      aria-invalid={!!error}
      {...props}
    />
  );
});

FormControl.displayName = "FormControl";

export type FormDescriptionProps = ComponentPropsWithoutRef<"p">;

/**
 * Form description component.
 */
const FormDescription = forwardRef<HTMLParagraphElement, FormDescriptionProps>(
  ({ className, ...props }, ref) => {
    const { formDescriptionId } = useFormField();

    return (
      <p
        ref={ref}
        data-slot="form-description"
        id={formDescriptionId}
        className={cn("text-muted-foreground text-sm", className)}
        {...props}
      />
    );
  }
);

FormDescription.displayName = "FormDescription";

export type FormMessageProps = ComponentPropsWithoutRef<"p">;

/**
 * Form message component for displaying validation errors.
 */
const FormMessage = forwardRef<HTMLParagraphElement, FormMessageProps>(
  ({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error?.message) : children;

    if (!body) {
      return null;
    }

    return (
      <p
        ref={ref}
        data-slot="form-message"
        id={formMessageId}
        className={cn("text-destructive-foreground text-sm", className)}
        {...props}
      >
        {body}
      </p>
    );
  }
);

FormMessage.displayName = "FormMessage";

export { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage };
