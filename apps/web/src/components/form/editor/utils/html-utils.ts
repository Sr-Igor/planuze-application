/**
 * Remove todas as tags HTML de uma string e retorna apenas o texto
 * @param html - String HTML
 * @returns Texto limpo sem tags HTML
 */
export const stripHtmlTags = (html: string): string => {
  if (!html) return "";

  // Remove todas as tags HTML
  const text = html.replaceAll(/<[^>]*>/g, "");

  // Remove espaços em branco extras e quebras de linha
  return text.replaceAll(/\s+/g, " ").trim();
};

/**
 * Verifica se o conteúdo HTML está vazio (sem texto significativo)
 * @param html - String HTML
 * @returns true se estiver vazio, false caso contrário
 */
export const isHtmlEmpty = (html?: string | null): boolean => {
  if (!html) return true;

  // Verifica se é apenas tags vazias comuns
  if (isHtmlEmptyTags(html)) return true;

  const cleanText = stripHtmlTags(html);

  // Considera vazio se não há texto ou apenas espaços/quebras de linha
  return cleanText === "" || cleanText.length === 0;
};

/**
 * Verifica se o conteúdo HTML contém apenas tags vazias (como <p></p>)
 * @param html - String HTML
 * @returns true se contém apenas tags vazias, false caso contrário
 */
export const isHtmlEmptyTags = (html: string): boolean => {
  if (!html) return true;

  // Remove tags vazias comuns e variações
  const cleaned = html
    .replaceAll(/<p><\/p>/g, "")
    .replaceAll(/<p><br\s*\/?><\/p>/g, "")
    .replaceAll(/<p>\s*<\/p>/g, "")
    .replaceAll(/<br\s*\/?>/g, "")
    .replaceAll(/<div><\/div>/g, "")
    .replaceAll(/<span><\/span>/g, "")
    .replaceAll(/<p><br><\/p>/g, "")
    .replaceAll(/\s+/g, "")
    .trim();

  return cleaned === "";
};

export const normalizeHtml = (html: string | null): string => {
  if (!html) return "";
  return html.replaceAll(/\s+/g, " ").trim();
};
