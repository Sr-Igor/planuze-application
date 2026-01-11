import { BaseTableItem, TableColumn } from "../types/index";

/**
 * Acessa uma propriedade aninhada em um objeto usando notação de ponto
 * @param obj Objeto a ser acessado
 * @param path Caminho da propriedade (ex: "user.name", "address.city")
 * @returns Valor da propriedade ou undefined
 */
export function getNestedValue(obj: any, path: string): any {
  if (!obj || !path) return undefined;

  return path.split(".").reduce((current, key) => {
    if (current && typeof current === "object" && key in current) {
      return current[key];
    }
    return undefined;
  }, obj);
}

/**
 * Formata um valor para exibição na tabela
 * @param value Valor a ser formatado
 * @returns Valor formatado ou '-' se vazio
 */
export function formatCellValue(value: any): string {
  if (value === null || value === undefined || value === "") {
    return "-";
  }

  if (typeof value === "boolean") {
    return value ? "Sim" : "Não";
  }

  if (typeof value === "number") {
    return value.toLocaleString("pt-BR");
  }

  if (typeof value === "object") {
    if (value instanceof Date) {
      return value.toLocaleDateString("pt-BR");
    }
    return JSON.stringify(value);
  }

  return String(value);
}

/**
 * Calcula a largura de uma coluna baseada em seu conteúdo
 * @param column Configuração da coluna
 * @param data Dados da tabela
 * @returns Largura calculada em pixels
 */
export function calculateColumnWidth<T extends BaseTableItem>(
  column: TableColumn<T>,
  data: T[]
): number {
  const minWidth = 100;
  const maxWidth = 400;
  const charWidth = 8; // Aproximação de largura por caractere

  // Largura do título
  const titleWidth = column.title.length * charWidth + 40; // 40px para padding e ícones

  // Largura do conteúdo
  const maxContentLength = Math.max(
    ...data.slice(0, 100).map((item) => {
      // Amostra de 100 itens para performance
      const value = getNestedValue(item, column.accessor);
      const formattedValue = column.formatValue
        ? String(column.formatValue(item))
        : formatCellValue(value);
      return String(formattedValue).length;
    })
  );

  const contentWidth = maxContentLength * charWidth + 20; // 20px para padding

  const calculatedWidth = Math.max(titleWidth, contentWidth);

  return Math.min(Math.max(calculatedWidth, minWidth), maxWidth);
}

/**
 * Gera classes CSS baseadas na variante da tabela
 * @param variant Variante da tabela
 * @param size Tamanho da tabela
 * @returns String com classes CSS
 */
export function getTableVariantClasses(
  variant: "default" | "striped" | "bordered" = "default",
  size: "sm" | "md" | "lg" = "md"
): {
  table: string;
  header: string;
  row: string;
  cell: string;
} {
  const sizeClasses = {
    sm: {
      cell: "h-10 px-2 text-xs",
      header: "h-10 px-2 text-xs font-medium",
    },
    md: {
      cell: "h-12 px-3 text-sm",
      header: "h-12 px-3 text-sm font-medium",
    },
    lg: {
      cell: "h-14 px-4 text-base",
      header: "h-14 px-4 text-base font-medium",
    },
  };

  const variantClasses = {
    default: {
      table: "border-collapse",
      header: "bg-muted/50",
      row: "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      cell: "",
    },
    striped: {
      table: "border-collapse",
      header: "bg-muted/50",
      row: "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted odd:bg-muted/25",
      cell: "",
    },
    bordered: {
      table: "border-collapse border",
      header: "bg-muted/50 border-b",
      row: "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      cell: "border-r last:border-r-0",
    },
  };

  return {
    table: variantClasses[variant].table,
    header: `${variantClasses[variant].header} ${sizeClasses[size].header}`,
    row: variantClasses[variant].row,
    cell: `${variantClasses[variant].cell} ${sizeClasses[size].cell}`,
  };
}

/**
 * Debounce para filtros de busca
 * @param func Função a ser executada
 * @param wait Tempo de espera em ms
 * @returns Função com debounce
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Gera um ID único para elementos da tabela
 * @param prefix Prefixo do ID
 * @param ...parts Partes adicionais do ID
 * @returns ID único
 */
export function generateTableId(prefix: string, ...parts: (string | number)[]): string {
  return [prefix, ...parts].join("-").replace(/\s+/g, "-").toLowerCase();
}

/**
 * Verifica se o dispositivo é mobile
 * @param breakpoint Breakpoint em pixels
 * @returns true se for mobile
 */
export function isMobile(breakpoint: number = 768): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth < breakpoint;
}

/**
 * Converte breakpoint em classes Tailwind
 * @param breakpoint Breakpoint em pixels
 * @returns Classe Tailwind correspondente
 */
export function getBreakpointClass(breakpoint: number): string {
  const breakpoints = {
    640: "sm:",
    768: "md:",
    1024: "lg:",
    1280: "xl:",
    1536: "2xl:",
  };

  const closest = Object.keys(breakpoints)
    .map(Number)
    .sort((a, b) => Math.abs(breakpoint - a) - Math.abs(breakpoint - b))[0];

  return breakpoints[closest as keyof typeof breakpoints] || "";
}
