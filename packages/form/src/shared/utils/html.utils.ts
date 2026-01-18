/**
 * HTML utility functions
 */

/**
 * Remove all HTML tags from a string and return only the text
 * @param html - HTML string
 * @returns Clean text without HTML tags
 */
export const stripHtmlTags = (html: string): string => {
    if (!html) return '';

    // Remove all HTML tags
    const text = html.replaceAll(/<[^>]*>/g, '');

    // Remove extra whitespace and line breaks
    return text.replaceAll(/\s+/g, ' ').trim();
};

/**
 * Check if HTML content is empty (no significant text)
 * @param html - HTML string
 * @returns true if empty, false otherwise
 */
export const isHtmlEmpty = (html?: string | null): boolean => {
    if (!html) return true;

    // Check if it's just common empty tags
    if (isHtmlEmptyTags(html)) return true;

    const cleanText = stripHtmlTags(html);

    // Consider empty if there's no text or only spaces/line breaks
    return cleanText === '' || cleanText.length === 0;
};

/**
 * Check if HTML content contains only empty tags (like <p></p>)
 * @param html - HTML string
 * @returns true if contains only empty tags, false otherwise
 */
export const isHtmlEmptyTags = (html: string): boolean => {
    if (!html) return true;

    // Remove common empty tags and variations
    const cleaned = html
        .replaceAll(/<p><\/p>/g, '')
        .replaceAll(/<p><br\s*\/?><\/p>/g, '')
        .replaceAll(/<p>\s*<\/p>/g, '')
        .replaceAll(/<br\s*\/?>/g, '')
        .replaceAll(/<div><\/div>/g, '')
        .replaceAll(/<span><\/span>/g, '')
        .replaceAll(/<p><br><\/p>/g, '')
        .replaceAll(/\s+/g, '')
        .trim();

    return cleaned === '';
};

export const normalizeHtml = (html: string | null): string => {
    if (!html) return '';
    return html.replaceAll(/\s+/g, ' ').trim();
};
