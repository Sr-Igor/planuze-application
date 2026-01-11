import { FormattedValue } from "../types";
import { isHtmlContent, stripHtmlTags } from "./html-processor";

export const formatDisplayValue = <T>(
  field: keyof T | undefined,
  value: any,
  maxLength: number = 50,
  displayValue: (field: keyof T | undefined, value: any) => string
): FormattedValue => {
  const fullValue = displayValue(field, value);
  const isHtml = isHtmlContent(fullValue);

  let processedValue = fullValue;
  if (isHtml) {
    processedValue = stripHtmlTags(fullValue);
  }

  let display = processedValue;
  if (processedValue.length > maxLength) {
    const truncated = processedValue.substring(0, maxLength);
    const lastSpaceIndex = truncated.lastIndexOf(" ");

    if (lastSpaceIndex > maxLength * 0.7) {
      display = truncated.substring(0, lastSpaceIndex) + "...";
    } else {
      display = truncated + "...";
    }
  }

  return {
    display,
    full: processedValue,
    isHtml,
  };
};
