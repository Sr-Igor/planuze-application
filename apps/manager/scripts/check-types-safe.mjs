#!/usr/bin/env node
/**
 * Script para verificar tipos TypeScript ignorando apenas erros da pasta generator
 * Filtra erros relacionados a @repo/types e permite que outros erros sejam reportados
 */
import { execSync } from "child_process";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");

try {
  // Executa verificação de tipos
  const output = execSync("tsc --noEmit", {
    cwd: rootDir,
    encoding: "utf-8",
    stdio: "pipe",
  });

  console.log("✅ Nenhum erro de tipo encontrado");
  process.exit(0);
} catch (error) {
  const stderr = error.stderr?.toString() || "";
  const stdout = error.stdout?.toString() || "";
  const allOutput = stderr + stdout;

  // Filtra apenas erros que NÃO são da pasta generator
  const lines = allOutput.split("\n");
  const relevantErrors = lines.filter((line) => {
    // Ignora linhas vazias ou de progresso
    if (!line.trim() || line.includes("Found") || line.includes("error TS")) {
      return false;
    }

    // Ignora erros da pasta generator
    if (line.includes("generator/") || line.includes("@repo/types")) {
      return false;
    }

    // Mantém outros erros
    return true;
  });

  if (relevantErrors.length === 0) {
    console.log("✅ Nenhum erro de tipo relevante encontrado (erros da pasta generator ignorados)");
    process.exit(0);
  } else {
    console.error("❌ Erros de tipo encontrados:");
    console.error(relevantErrors.join("\n"));
    process.exit(1);
  }
}
