import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Função para ler recursivamente uma estrutura de pastas
function readDirectoryStructure(dirPath, relativePath = "") {
  const structure = {
    files: [],
    directories: {},
  };

  try {
    const items = fs.readdirSync(dirPath);

    for (const item of items) {
      const itemPath = path.join(dirPath, item);
      const stat = fs.statSync(itemPath);

      if (stat.isDirectory()) {
        const subPath = relativePath ? `${relativePath}/${item}` : item;
        structure.directories[item] = readDirectoryStructure(itemPath, subPath);
      } else if (item.endsWith(".json")) {
        const fileName = item.replace(".json", "");
        structure.files.push({
          name: fileName,
          translationKey: relativePath ? `${relativePath}.${fileName}` : fileName,
        });
      }
    }
  } catch (error) {
    console.warn(`Erro ao ler diretório: ${dirPath}`, error.message);
  }

  return structure;
}

// Função para gerar os tipos TypeScript
function generateTypes(structure) {
  let types = "";

  // Gera LangKeys (arquivos do nível raiz)
  const rootKeys = structure.files.map((file) => `'${file.name}'`);
  const directoryKeys = Object.keys(structure.directories).map((dir) => `'${dir}'`);
  const allLangKeys = [...rootKeys, ...directoryKeys];

  types += `export type LangKeys =\n`;
  types += allLangKeys.map((key) => `    | ${key}`).join("\n");
  types += ";\n\n";

  // Gera PageKeys (arquivos dentro do diretório 'page', se existir)
  if (structure.directories.page && structure.directories.page.files.length > 0) {
    const pageKeys = structure.directories.page.files.map((file) => `'${file.name}'`);
    types += `export type PageKeys =\n`;
    types += pageKeys.map((key) => `    | ${key}`).join("\n");
    types += ";\n\n";
  }

  return types;
}

// Função para gerar o código do hook
function generateHookCode(structure) {
  let rootTranslations = [];
  let subTranslations = {};

  // Processa arquivos no nível raiz
  structure.files.forEach((file) => {
    // navBar usa useTranslations diretamente, outros usam parser
    if (file.name === "navBar") {
      rootTranslations.push(`        ${file.name}: useTranslations('${file.translationKey}')`);
    } else {
      rootTranslations.push(`        ${file.name}: parser('${file.translationKey}')`);
    }
  });

  // Processa diretórios e seus arquivos
  Object.entries(structure.directories).forEach(([dirName, dirStructure]) => {
    const dirTranslations = [];

    dirStructure.files.forEach((file) => {
      const translationKey = `${dirName}.${file.name}`;
      dirTranslations.push(`        ${file.name}: parser('${translationKey}')`);
    });

    subTranslations[dirName] = dirTranslations;
  });

  // Gera o código do hook
  let hookCode = `export const useLang = () => {
    const parser = (key: string) => {
        const t = useTranslations(key);

        return (value: string, options?: Record<string, any>) => {
            let item = value;

            item = t(value, options);
            const isEquals = item === (key ? \`\${key}.\${value}\` : value);
            if (isEquals) item = (item.split('.').pop() || '')?.replaceAll('_', ' ');
            return item;
        };
    };

    const rootTranslations = {
${rootTranslations.join(",\n")}
    };`;

  // Adiciona traduções de subdiretórios
  Object.entries(subTranslations).forEach(([dirName, translations]) => {
    if (translations.length > 0) {
      hookCode += `

    const ${dirName}Translations = {
${translations.join(",\n")}
    };`;
    }
  });

  hookCode += `

    return {
        ...rootTranslations`;

  Object.keys(subTranslations).forEach((dirName) => {
    if (subTranslations[dirName].length > 0) {
      hookCode += `,
        ${dirName}: ${dirName}Translations`;
    }
  });

  hookCode += `
    };
};
`;

  return hookCode;
}

// Função principal
function generateTranslations() {
  const packageRoot = path.resolve(__dirname, "..");
  const localesPath = path.join(packageRoot, "locales", "pt-BR");
  const hooksPath = path.join(packageRoot, "src", "hook", "index.ts");
  const typesPath = path.join(packageRoot, "src", "types.ts");

  console.log("🔍 Analisando estrutura de traduções...");
  const structure = readDirectoryStructure(localesPath);

  console.log("🎯 Gerando tipos TypeScript...");
  const types = generateTypes(structure);

  console.log("🚀 Gerando hook useLang...");
  const hookCode = generateHookCode(structure);

  // Monta o arquivo completo do hook
  const fullHookCode = `import { useTranslations } from 'next-intl';

${hookCode}`;

  // Escreve os arquivos
  fs.writeFileSync(hooksPath, fullHookCode, "utf8");
  fs.writeFileSync(typesPath, types, "utf8");

  console.log("✅ Hook useLang e tipos gerados com sucesso!");
  console.log(`📝 Hook: ${hooksPath}`);
  console.log(`📝 Tipos: ${typesPath}`);

  // Mostra resumo do que foi encontrado
  console.log("\n📊 Resumo:");
  console.log(`• Arquivos no nível raiz: ${structure.files.length}`);
  Object.entries(structure.directories).forEach(([dirName, dirStruct]) => {
    console.log(`• Arquivos em ${dirName}/: ${dirStruct.files.length}`);
  });

  // Mostra tipos gerados
  console.log("\n🎯 Tipos gerados:");
  const langKeysCount = structure.files.length + Object.keys(structure.directories).length;
  console.log(`• LangKeys: ${langKeysCount} items`);
  if (structure.directories.page) {
    console.log(`• PageKeys: ${structure.directories.page.files.length} items`);
  }
}

// Executa o script
generateTranslations();
