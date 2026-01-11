# 📖 Referência Rápida

## 🚀 Comandos Essenciais

```bash
# Setup inicial (primeira vez)
pnpm setup

# Desenvolvimento
pnpm dev                    # Todos os apps
pnpm dev --filter=web      # Apenas web

# Build
pnpm build                 # Build completo
pnpm build --filter=web   # Build específico

# Qualidade
pnpm validate              # Validação completa (versions + types + lint)
pnpm check-types          # Verificar tipos
pnpm lint                  # Verificar lint
pnpm format               # Formatar código

# Manutenção
pnpm clean                # Limpar node_modules e cache
pnpm dedupe               # Remover duplicações
pnpm outdated             # Ver deps desatualizadas
pnpm health-check         # Verificação de saúde
pnpm check-versions       # Verificar consistência

# UI
pnpm ui:add <component>   # Adicionar componente Shadcn
```

---

## 📦 Estrutura de Workspaces

```
apps/
├─ web/          → Aplicação Next.js principal
└─ docs/         → Documentação

packages/
├─ ui/           → Componentes UI (Radix + Shadcn)
├─ api/          → Tipos e geradores
├─ fonts/        → Fontes (Geist)
├─ tailwind-config/     → Config Tailwind
├─ eslint-config/       → Config ESLint  
└─ typescript-config/   → Config TypeScript
```

---

## 🔢 Versões Principais

| Pacote | Versão |
|--------|--------|
| React | 19.2.0 |
| Next.js | 15.5.6 |
| TypeScript | 5.9.3 |
| Tailwind CSS | 4.1.17 |
| Node.js | >= 20 |
| pnpm | >= 9.0.0 |

---

## 📥 Imports Comuns

```typescript
// Componentes UI
import { Button, Input, Dialog } from '@repo/ui'

// Utilitários UI
import { cn } from '@repo/ui'

// Hooks UI
import { useMobile } from '@repo/ui'

// Fontes
import { GeistSans, GeistMono } from '@repo/fonts'

// API Types
import type { User, Product } from '@repo/api'
```

---

## 🎯 Onde Adicionar Dependências

| Tipo | Localização | Comando |
|------|-------------|---------|
| Componente UI | `packages/ui` | `pnpm add <pkg> --filter=@repo/ui` |
| App-specific | `apps/web` | `pnpm add <pkg> --filter=web` |
| Build tool | `root` | `pnpm add -D <pkg> -w` |

---

## 🐛 Troubleshooting Rápido

```bash
# Erro de tipos
pnpm clean && pnpm install && pnpm check-types

# Erro de build
pnpm clean && pnpm build

# Versões inconsistentes
pnpm check-versions

# Dependências duplicadas
pnpm dedupe

# Cache corrompido
turbo clean && pnpm dev
```

---

## 📚 Documentação

| Arquivo | Quando Ler |
|---------|------------|
| `START_HERE.md` | Primeira vez |
| `SUMMARY.md` | Overview executivo |
| `README.md` | Setup básico |
| `.versions.md` | Antes de atualizar deps |
| `MIGRATION_GUIDE.md` | Se tiver problemas |
| `ARCHITECTURE.md` | Para entender estrutura |
| `CONTRIBUTING.md` | Antes de contribuir |

---

## ⚡ Atalhos de Desenvolvimento

```bash
# Desenvolvimento
alias mdev="pnpm dev"
alias mweb="pnpm dev --filter=web"

# Build
alias mbuild="pnpm build"
alias mbweb="pnpm build --filter=web"

# Validação
alias mcheck="pnpm validate"
alias mtypes="pnpm check-types"

# Manutenção
alias mclean="pnpm clean"
alias msetup="pnpm setup"
```

Adicione ao seu `.bashrc` ou `.zshrc`

---

## 🎨 Pattern Matching Comum

```typescript
// Componente
export function ComponentName({ prop }: Props) {
  return <div>...</div>
}

// Hook
export function useCustomHook() {
  const [state, setState] = useState()
  return { state, setState }
}

// API Call
export async function fetchData(id: string) {
  return api.get(`/data/${id}`)
}

// Type
export interface DataType {
  id: string
  name: string
}

// Zod Schema
export const schema = z.object({
  id: z.string(),
  name: z.string()
})
```

---

## 🔥 Comandos One-Liner Úteis

```bash
# Encontrar todos package.json
find . -name 'package.json' -not -path '*/node_modules/*'

# Ver tamanho das node_modules
du -sh node_modules

# Contar linhas de código
find src -name '*.tsx' -o -name '*.ts' | xargs wc -l

# Limpar tudo profundamente
find . -name 'node_modules' -o -name '.next' -o -name '.turbo' | xargs rm -rf

# Ver deps de um pacote específico
pnpm why <package-name>

# Listar todos os workspaces
pnpm list -r --depth -1
```

---

## 💡 Dicas Produtividade

1. **Use VSCode** com extensões:
   - ESLint
   - Prettier
   - TypeScript
   - Tailwind CSS IntelliSense

2. **Configure seu editor**:
   - Format on save
   - Auto import
   - Organize imports

3. **Use os scripts**:
   - `pnpm validate` antes de commitar
   - `pnpm health-check` semanalmente
   - `pnpm check-versions` ao atualizar deps

4. **Consulte docs**:
   - Dúvida de estrutura → `ARCHITECTURE.md`
   - Dúvida de versão → `.versions.md`
   - Erro na migração → `MIGRATION_GUIDE.md`

---

**Salve este arquivo para referência rápida! 🔖**


