import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";

import { readdir, readFile, stat } from "node:fs/promises";
import { join } from "node:path";

import { routing } from "./routing";

function getLocalesPath(): string {
  const cwd = process.cwd();

  if (cwd.includes("apps/web")) {
    return join(cwd, "..", "..", "packages", "language", "locales");
  }

  return join(cwd, "locales");
}

const localesPath = getLocalesPath();

function fixPlaceholders(obj: unknown): unknown {
  if (typeof obj === "string") return obj.replaceAll(/{{\s*(.*?)\s*}}/g, "{$1}");
  if (Array.isArray(obj)) return obj.map((item) => fixPlaceholders(item));
  if (typeof obj === "object" && obj !== null) {
    const result: Record<string, any> = {};
    for (const key of Object.keys(obj)) {
      result[key] = fixPlaceholders((obj as Record<string, any>)[key]);
    }
    return result;
  }
  return obj;
}

async function loadMessages(
  locale: string,
  relativePath: string = ""
): Promise<Record<string, any>> {
  const messages: Record<string, any> = {};

  try {
    const currentPath = join(localesPath, locale, relativePath);
    const items = await readdir(currentPath);

    for (const item of items) {
      const itemPath = join(currentPath, item);
      const itemStat = await stat(itemPath);

      if (itemStat.isDirectory()) {
        const subPath = relativePath ? join(relativePath, item) : item;
        messages[item] = await loadMessages(locale, subPath);
      } else if (item.endsWith(".json")) {
        const fileName = item.replace(".json", "");
        const filePath = join(currentPath, item);
        const fileContent = await readFile(filePath, "utf-8");
        messages[fileName] = fixPlaceholders(JSON.parse(fileContent));
      }
    }
  } catch (error) {
    console.warn(`Erro ao carregar mensagens de: ${locale}/${relativePath}`, error);
  }

  return messages;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  const messages = await loadMessages(locale);

  return {
    locale,
    messages,
  };
});
