/**
 * Check if a value contains HTML content
 */
export const isHtmlContent = (value: unknown): boolean => {
  if (typeof value !== "string") return false;

  const htmlTagRegex = /<[^>]+>/;
  return htmlTagRegex.test(value);
};

/**
 * Strip HTML tags from a string
 */
export const stripHtmlTags = (html: string): string => {
  return html
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/p>/gi, " ")
    .replace(/<\/div>/gi, " ")
    .replace(/<\/h[1-6]>/gi, " ")
    .replace(/<\/li>/gi, " ")
    .replace(/<\/td>/gi, " ")
    .replace(/<\/th>/gi, " ")
    .replace(/\n/g, " ")
    .replace(/\r/g, " ")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
};
