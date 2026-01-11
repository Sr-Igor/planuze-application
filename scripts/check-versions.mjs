#!/usr/bin/env node

/**
 * Script para verificar consistência de versões entre workspaces
 * Compara versões de dependências chave e reporta inconsistências
 */

import { readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Cores para terminal
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

// Workspaces para verificar
const workspaces = [
  { name: 'root', path: '' },
  { name: 'web', path: 'apps/web' },
  { name: '@repo/ui', path: 'packages/ui' },
  { name: '@repo/fonts', path: 'packages/fonts' },
  { name: '@repo/eslint-config', path: 'packages/eslint-config' }
];

// Dependências chave para verificar
const keyDependencies = [
  'react',
  'react-dom',
  'next',
  'typescript',
  'eslint',
  'prettier',
  'tailwindcss',
  '@types/react',
  '@types/react-dom',
  '@types/node',
  'lucide-react'
];

function readPackageJson(workspacePath) {
  try {
    const fullPath = join(rootDir, workspacePath, 'package.json');
    const content = readFileSync(fullPath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    return null;
  }
}

function getVersion(pkg, depName) {
  if (!pkg) return null;
  
  // Verificar em dependencies
  if (pkg.dependencies?.[depName]) {
    return pkg.dependencies[depName];
  }
  
  // Verificar em devDependencies
  if (pkg.devDependencies?.[depName]) {
    return pkg.devDependencies[depName];
  }
  
  // Verificar em peerDependencies
  if (pkg.peerDependencies?.[depName]) {
    return pkg.peerDependencies[depName];
  }
  
  return null;
}

function cleanVersion(version) {
  if (!version) return null;
  if (version.startsWith('workspace:')) return 'workspace';
  return version.replace(/^[\^~]/, '');
}

function main() {
  console.log(`${colors.cyan}🔍 Verificando consistência de versões...${colors.reset}\n`);
  
  const versionMap = new Map();
  
  // Coletar versões de todos os workspaces
  for (const dep of keyDependencies) {
    const versions = new Map();
    
    for (const workspace of workspaces) {
      const pkg = readPackageJson(workspace.path);
      const version = getVersion(pkg, dep);
      
      if (version) {
        const cleaned = cleanVersion(version);
        if (!versions.has(cleaned)) {
          versions.set(cleaned, []);
        }
        versions.get(cleaned).push(workspace.name);
      }
    }
    
    if (versions.size > 0) {
      versionMap.set(dep, versions);
    }
  }
  
  // Reportar resultados
  let hasInconsistencies = false;
  
  for (const [dep, versions] of versionMap) {
    if (versions.size > 1) {
      hasInconsistencies = true;
      console.log(`${colors.red}❌ ${dep}${colors.reset}`);
      
      for (const [version, workspaceList] of versions) {
        const workspaceNames = workspaceList.join(', ');
        console.log(`   ${colors.yellow}${version}${colors.reset} em: ${workspaceNames}`);
      }
      console.log('');
    } else if (versions.size === 1) {
      const [[version, workspaceList]] = versions;
      const count = workspaceList.length;
      console.log(`${colors.green}✅ ${dep}${colors.reset}: ${version} (${count} workspace${count > 1 ? 's' : ''})`);
    }
  }
  
  console.log('\n' + '='.repeat(60) + '\n');
  
  if (hasInconsistencies) {
    console.log(`${colors.red}⚠️  Inconsistências encontradas!${colors.reset}\n`);
    console.log('Recomendações:');
    console.log('1. Atualize as versões para serem consistentes');
    console.log('2. Consulte .versions.md para versões corretas');
    console.log('3. Execute: pnpm install após correções\n');
    process.exit(1);
  } else {
    console.log(`${colors.green}✅ Todas as versões estão consistentes!${colors.reset}\n`);
    process.exit(0);
  }
}

main();



