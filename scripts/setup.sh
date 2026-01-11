#!/bin/bash

# Script de setup inicial para novos desenvolvedores
# Configura o ambiente e valida a instalação

set -e

# Cores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo ""
echo "╔════════════════════════════════════════╗"
echo "║   Setup do Monorepo - Bem-vindo! 🚀   ║"
echo "╔════════════════════════════════════════╗"
echo ""

# Função para print com cor
print_step() {
    echo -e "${BLUE}▶ $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# 1. Verificar Node.js
print_step "1/7 Verificando Node.js..."
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -ge 20 ]; then
    print_success "Node.js v$(node -v) ✓"
else
    print_error "Node.js >= 20 é necessário. Versão atual: v$(node -v)"
    echo ""
    echo "Instale Node.js 20+ em: https://nodejs.org/"
    exit 1
fi
echo ""

# 2. Verificar pnpm
print_step "2/7 Verificando pnpm..."
if command -v pnpm &> /dev/null; then
    PNPM_VERSION=$(pnpm -v | cut -d'.' -f1)
    if [ "$PNPM_VERSION" -ge 9 ]; then
        print_success "pnpm v$(pnpm -v) ✓"
    else
        print_error "pnpm >= 9 é necessário. Versão atual: v$(pnpm -v)"
        echo ""
        echo "Atualize pnpm: npm install -g pnpm@latest"
        exit 1
    fi
else
    print_error "pnpm não está instalado"
    echo ""
    echo "Instale pnpm: npm install -g pnpm"
    exit 1
fi
echo ""

# 3. Limpar instalações anteriores
print_step "3/7 Limpando instalações anteriores..."
if [ -d "node_modules" ]; then
    print_warning "Removendo node_modules..."
    rm -rf node_modules
    find . -name 'node_modules' -type d -prune -exec rm -rf '{}' + 2>/dev/null || true
    print_success "Limpeza concluída"
else
    print_success "Nada para limpar"
fi
echo ""

# 4. Instalar dependências
print_step "4/7 Instalando dependências..."
print_warning "Isso pode levar alguns minutos..."
if pnpm install; then
    print_success "Dependências instaladas com sucesso"
else
    print_error "Falha ao instalar dependências"
    exit 1
fi
echo ""

# 5. Verificar tipos
print_step "5/7 Verificando tipos TypeScript..."
if pnpm check-types 2>&1 | grep -q "error"; then
    print_warning "Alguns erros de tipo foram encontrados"
    print_warning "Isso é esperado se você acabou de migrar"
    print_warning "Execute: pnpm check-types para ver detalhes"
else
    print_success "Tipos verificados com sucesso"
fi
echo ""

# 6. Verificar lint
print_step "6/7 Verificando lint..."
if pnpm lint 2>&1 | grep -q "error\|warning"; then
    print_warning "Alguns problemas de lint foram encontrados"
    print_warning "Execute: pnpm lint para ver detalhes"
else
    print_success "Lint verificado com sucesso"
fi
echo ""

# 7. Verificar versões
print_step "7/7 Verificando consistência de versões..."
if node scripts/check-versions.mjs; then
    print_success "Versões consistentes"
else
    print_warning "Algumas inconsistências de versão encontradas"
    print_warning "Consulte .versions.md para versões corretas"
fi
echo ""

# Resumo final
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
print_success "Setup concluído com sucesso! 🎉"
echo ""
echo "Próximos passos:"
echo ""
echo "  1. Ler documentação:"
echo "     ${BLUE}cat README.md${NC}"
echo ""
echo "  2. Iniciar desenvolvimento:"
echo "     ${BLUE}pnpm dev${NC}"
echo ""
echo "  3. Ou desenvolver workspace específico:"
echo "     ${BLUE}pnpm dev --filter=web${NC}"
echo ""
echo "  4. Verificar saúde do sistema:"
echo "     ${BLUE}pnpm health-check${NC}"
echo ""
echo "Documentação disponível em:"
echo "  • README.md - Overview"
echo "  • ARCHITECTURE.md - Arquitetura"
echo "  • CONTRIBUTING.md - Como contribuir"
echo "  • .versions.md - Versões"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
print_success "Bom desenvolvimento! 💻✨"
echo ""



