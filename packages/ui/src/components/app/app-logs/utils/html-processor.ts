export const isHtmlContent = (value: any): boolean => {
  if (typeof value !== "string") return false;

  const htmlTagRegex = /<[^>]+>/;
  return htmlTagRegex.test(value);
};

export const stripHtmlTags = (html: string): string => {
  return html
    .replaceAll(/<br\s*\/?>/gi, " ") // Converte <br> e <br/> em espaço
    .replaceAll(/<\/p>/gi, " ") // Converte </p> em espaço
    .replaceAll(/<\/div>/gi, " ") // Converte </div> em espaço
    .replaceAll(/<\/h[1-6]>/gi, " ") // Converte </h1> até </h6> em espaço
    .replaceAll(/<\/li>/gi, " ") // Converte </li> em espaço
    .replaceAll(/<\/td>/gi, " ") // Converte </td> em espaço
    .replaceAll(/<\/th>/gi, " ") // Converte </th> em espaço
    .replaceAll(/\n/g, " ") // Converte quebras de linha em espaço
    .replaceAll(/\r/g, " ") // Converte retorno de carro em espaço
    .replaceAll(/<[^>]*>/g, "") // Remove todas as tags HTML restantes
    .replaceAll(/&nbsp;/g, " ") // Substitui &nbsp; por espaço
    .replaceAll(/&amp;/g, "&") // Decodifica &amp;
    .replaceAll(/&lt;/g, "<") // Decodifica &lt;
    .replaceAll(/&gt;/g, ">") // Decodifica &gt;
    .replaceAll(/&quot;/g, '"') // Decodifica &quot;
    .replaceAll(/&#39;/g, "'") // Decodifica &#39;
    .replaceAll(/&apos;/g, "'") // Decodifica &apos;
    .replaceAll(/\s+/g, " ") // Substitui múltiplos espaços por um único espaço
    .trim();
};
