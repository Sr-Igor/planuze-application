#!/bin/bash

# Script de verificação de saúde do monorepo
# Executa checks para garantir que tudo está configurado corretamente

set -e

echo "🔍 Verificando saúde do monorepo..."
echo ""

# Cores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Função para print com cor
print_status() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✅ $2${NC}"
    else
        echo -e "${RED}❌ $2${NC}"
        return 1
    fi
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# 1. Verificar versão do Node
echo "1. Verificando versão do Node.js..."
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -ge 20 ]; then
    print_status 0 "Node.js >= 20 (v$(node -v))"
else
    print_status 1 "Node.js precisa ser >= 20 (atual: v$(node -v))"
fi
echo ""

# 2. Verificar versão do pnpm
echo "2. Verificando versão do pnpm..."
PNPM_VERSION=$(pnpm -v | cut -d'.' -f1)
if [ "$PNPM_VERSION" -ge 9 ]; then
    print_status 0 "pnpm >= 9 (v$(pnpm -v))"
else
    print_status 1 "pnpm precisa ser >= 9 (atual: v$(pnpm -v))"
fi
echo ""

# 3. Verificar se node_modules existe
echo "3. Verificando instalação de dependências..."
if [ -d "node_modules" ]; then
    print_status 0 "node_modules existe"
else
    print_status 1 "node_modules não encontrado. Execute: pnpm install"
fi
echo ""

# 4. Verificar tipagens
echo "4. Verificando tipos TypeScript..."
if pnpm check-types 2>&1 | grep -q "error"; then
    print_status 1 "Erros de tipagem encontrados"
else
    print_status 0 "Tipagens OK"
fi
echo ""

# 5. Verificar duplicações
echo "5. Verificando dependências duplicadas..."
DUPLICATES=$(pnpm dedupe --check 2>&1 || true)
if echo "$DUPLICATES" | grep -q "Already up-to-date"; then
    print_status 0 "Sem duplicações"
else
    print_warning "Possíveis duplicações detectadas. Execute: pnpm dedupe"
fi
echo ""

# 6. Verificar estrutura de workspaces
echo "6. Verificando workspaces..."
WORKSPACES=$(pnpm list -r --depth -1 --json 2>/dev/null | grep -c "name" || echo "0")
if [ "$WORKSPACES" -gt 5 ]; then
    print_status 0 "$WORKSPACES workspaces detectados"
else
    print_warning "Menos workspaces que o esperado"
fi
echo ""

# 7. Verificar arquivos de configuração
echo "7. Verificando arquivos de configuração..."
CONFIG_FILES=("turbo.json" "pnpm-workspace.yaml" ".npmrc" "tsconfig.json")
MISSING=0

for file in "${CONFIG_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✓ $file"
    else
        echo "  ✗ $file - FALTANDO"
        MISSING=$((MISSING + 1))
    fi
done

if [ $MISSING -eq 0 ]; then
    print_status 0 "Todos os arquivos de config presentes"
else
    print_status 1 "$MISSING arquivo(s) de config faltando"
fi
echo ""

# 8. Resumo
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 Resumo da Verificação"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Para corrigir problemas, execute:"
echo ""
echo "  # Reinstalar dependências"
echo "  pnpm clean && pnpm install"
echo ""
echo "  # Remover duplicações"
echo "  pnpm dedupe"
echo ""
echo "  # Verificar tipos"
echo "  pnpm check-types"
echo ""
echo "✨ Verificação concluída!"



