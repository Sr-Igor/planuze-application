export const isHtmlContent = (value: any): boolean => {
  if (typeof value !== "string") return false;

  const htmlTagRegex = /<[^>]+>/;
  return htmlTagRegex.test(value);
};

export const stripHtmlTags = (html: string): string => {
  return html
    .replace(/<br\s*\/?>/gi, " ") // Converte <br> e <br/> em espaço
    .replace(/<\/p>/gi, " ") // Converte </p> em espaço
    .replace(/<\/div>/gi, " ") // Converte </div> em espaço
    .replace(/<\/h[1-6]>/gi, " ") // Converte </h1> até </h6> em espaço
    .replace(/<\/li>/gi, " ") // Converte </li> em espaço
    .replace(/<\/td>/gi, " ") // Converte </td> em espaço
    .replace(/<\/th>/gi, " ") // Converte </th> em espaço
    .replace(/\n/g, " ") // Converte quebras de linha em espaço
    .replace(/\r/g, " ") // Converte retorno de carro em espaço
    .replace(/<[^>]*>/g, "") // Remove todas as tags HTML restantes
    .replace(/&nbsp;/g, " ") // Substitui &nbsp; por espaço
    .replace(/&amp;/g, "&") // Decodifica &amp;
    .replace(/&lt;/g, "<") // Decodifica &lt;
    .replace(/&gt;/g, ">") // Decodifica &gt;
    .replace(/&quot;/g, '"') // Decodifica &quot;
    .replace(/&#39;/g, "'") // Decodifica &#39;
    .replace(/&apos;/g, "'") // Decodifica &apos;
    .replace(/\s+/g, " ") // Substitui múltiplos espaços por um único espaço
    .trim();
};
