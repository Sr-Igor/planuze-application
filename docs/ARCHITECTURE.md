# Arquitetura do Monorepo

## 🏗️ Visão Geral

Este monorepo segue uma arquitetura modular baseada em workspaces do pnpm com Turborepo para otimização de builds.

---

## 📁 Estrutura de Diretórios

```
monorepo/
│
├── apps/                          # Aplicações
│   ├── docs/                      # Documentação (Nextra)
│   └── web/                       # App principal Next.js
│       ├── public/               
│       │   ├── images/           # Imagens estáticas
│       │   └── svg/              # SVGs
│       ├── locales/              # Traduções i18n
│       │   ├── en-US/
│       │   └── pt-BR/
│       ├── scripts/              # Scripts de build/dev
│       └── src/
│           ├── app/              # Next.js App Router
│           │   └── [locale]/    # Rotas com i18n
│           ├── api/              # Lógica de API
│           │   ├── callers/     # React Query hooks
│           │   ├── req/         # Request builders
│           │   └── hooks/       # Hooks customizados
│           ├── components/       # Componentes específicos da app
│           │   ├── controllers/ # Componentes de controle
│           │   ├── dnd/         # Drag and drop
│           │   ├── form/        # Componentes de formulário
│           │   └── table/       # Componentes de tabela
│           ├── hooks/           # Hooks React customizados
│           ├── i18n/            # Configuração i18n
│           ├── lib/             # Utilitários
│           ├── providers/       # React Providers
│           ├── store/           # Redux store
│           ├── templates/       # Templates reutilizáveis
│           └── types/           # Tipos TypeScript
│
├── packages/                      # Pacotes compartilhados
│   ├── api/                      # @repo/api
│   │   ├── generator/           # Geradores de tipos
│   │   └── index.ts
│   │
│   ├── ui/                       # @repo/ui
│   │   └── src/
│   │       ├── components/ui/   # Componentes Shadcn
│   │       ├── hooks/           # Hooks compartilhados
│   │       ├── lib/             # Utilitários UI
│   │       └── index.ts         # Exports principais
│   │
│   ├── fonts/                    # @repo/fonts
│   │   └── src/
│   │       ├── typography/      # Arquivos de fonte
│   │       └── index.ts
│   │
│   ├── tailwind-config/          # @repo/tailwind-config
│   │   └── base.css
│   │
│   ├── eslint-config/            # @repo/eslint-config
│   │   ├── base.js
│   │   ├── next.js
│   │   └── react-internal.js
│   │
│   └── typescript-config/        # @repo/typescript-config
│       ├── base.json
│       ├── nextjs.json
│       └── react-library.json
│
├── scripts/                       # Scripts do monorepo
│   └── health-check.sh
│
├── .npmrc                        # Configurações pnpm
├── .versions.md                  # Documentação de versões
├── CHANGELOG.md                  # Log de mudanças
├── MIGRATION_GUIDE.md            # Este arquivo
├── package.json                  # Root package
├── pnpm-workspace.yaml           # Workspaces config
└── turbo.json                    # Turbo config
```

---

## 🔄 Fluxo de Dependências

```mermaid
graph TD
    A[apps/web] --> B[@repo/ui]
    A --> C[@repo/fonts]
    A --> D[@repo/api]
    
    B --> E[React 19.2]
    B --> F[Radix UI]
    B --> G[Lucide React]
    
    A --> H[Next.js 15.5]
    A --> I[Redux Toolkit]
    A --> J[TanStack Query]
    
    K[Root] --> L[TypeScript 5.9.3]
    K --> M[ESLint 9.39]
    K --> N[Prettier 3.6]
    K --> O[Turbo 2.6]
```

---

## 📦 Responsabilidades dos Packages

### @repo/ui

**Responsabilidade:** Componentes UI reutilizáveis

**Contém:**
- Componentes Radix UI wrapper
- Componentes Shadcn/ui
- Hooks de UI (useMobile, etc)
- Utilitários de estilo (cn)

**Exporta:**
```typescript
// Componentes
export { Button } from './components/ui/button'
export { Input } from './components/ui/input'
// ... todos os componentes

// Utilitários
export { cn } from './lib/utils'

// Hooks
export { useMobile } from './hooks/use-mobile'
```

**Peer Dependencies:**
- react ^19.2.0
- react-dom ^19.2.0

### @repo/api

**Responsabilidade:** Tipos e geradores de API

**Contém:**
- Tipos gerados do Prisma
- Tipos de endpoints
- Geradores de código

**Exporta:**
```typescript
// Tipos principais
export type * from './generator/types'

// Endpoints
export * from './generator/endpoints'
```

### @repo/fonts

**Responsabilidade:** Fontes customizadas

**Contém:**
- Geist (Sans & Mono)
- Configurações de fonte

**Exporta:**
```typescript
export { GeistSans, GeistMono } from './index'
```

### @repo/tailwind-config

**Responsabilidade:** Configurações Tailwind compartilhadas

**Contém:**
- Tema base
- Configurações de animação
- Cores e tokens de design

### @repo/eslint-config

**Responsabilidade:** Regras de lint compartilhadas

**Exporta:**
- `base.js`: Regras base
- `next.js`: Regras para Next.js
- `react-internal.js`: Regras para React libraries

### @repo/typescript-config

**Responsabilidade:** Configurações TypeScript compartilhadas

**Exporta:**
- `base.json`: Config base rigorosa
- `nextjs.json`: Config para Next.js apps
- `react-library.json`: Config para React libraries

---

## 🎯 Padrões de Código

### Imports

**Ordem recomendada:**
```typescript
// 1. React e libs externas
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

// 2. Workspace packages
import { Button, Input } from '@repo/ui'
import { GeistSans } from '@repo/fonts'

// 3. Internos absolutos
import { api } from '@/api'
import { useAuth } from '@/hooks/auth'

// 4. Relativos
import { Header } from './header'
import type { Props } from './types'
```

### Nomenclatura

```typescript
// Componentes: PascalCase
export function ButtonPrimary() {}

// Hooks: camelCase com prefixo 'use'
export function useAuthStatus() {}

// Tipos: PascalCase
export type UserProfile = {}

// Constantes: UPPER_SNAKE_CASE
export const API_BASE_URL = ''

// Funções utilitárias: camelCase
export function formatCurrency() {}
```

### Estrutura de Componentes

```typescript
// ComponentName.tsx
import type { ComponentProps } from './types'

interface ComponentNameProps extends ComponentProps {
  // Props específicas
}

export function ComponentName({ ...props }: ComponentNameProps) {
  // Hooks
  const [state, setState] = useState()
  
  // Handlers
  const handleClick = () => {}
  
  // Render
  return <div>...</div>
}

// Se houver sub-componentes
ComponentName.Header = function Header() {}
ComponentName.Footer = function Footer() {}
```

---

## 🔐 Boas Práticas

### 1. Gerenciamento de Estado

```typescript
// ✅ BOM: State local para UI
const [isOpen, setIsOpen] = useState(false)

// ✅ BOM: Zustand para state compartilhado leve
const theme = useThemeStore(state => state.theme)

// ✅ BOM: Redux para state complexo da app
const user = useSelector(selectUser)

// ✅ BOM: TanStack Query para server state
const { data } = useQuery({ queryKey: ['users'], queryFn: fetchUsers })

// ❌ RUIM: Redux para tudo
// ❌ RUIM: Props drilling excessivo
```

### 2. Type Safety

```typescript
// ✅ BOM: Tipos explícitos
interface User {
  id: string
  name: string
  email: string
}

function getUser(id: string): User {
  // ...
}

// ❌ RUIM: any
function getUser(id: any): any {
  // ...
}

// ✅ BOM: Validação com Zod
const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email()
})

type User = z.infer<typeof userSchema>
```

### 3. Performance

```typescript
// ✅ BOM: Memoização quando necessário
const expensiveValue = useMemo(() => {
  return heavyComputation(data)
}, [data])

// ✅ BOM: Callbacks estáveis
const handleClick = useCallback(() => {
  doSomething(id)
}, [id])

// ❌ RUIM: Memoização desnecessária
const simple = useMemo(() => value * 2, [value])
```

### 4. Imports de Workspace

```typescript
// ✅ BOM: Usar workspace packages
import { Button } from '@repo/ui'
import { api } from '@repo/api'

// ❌ RUIM: Importar diretamente dos node_modules
import { Button } from '@radix-ui/react-button'
```

---

## 🧪 Testing Strategy

### Unit Tests
- Componentes UI: packages/ui
- Hooks: apps/web/src/hooks
- Utilitários: apps/web/src/utils

### Integration Tests
- Fluxos da aplicação: apps/web
- API calls: apps/web/src/api

### E2E Tests
- Jornadas do usuário: apps/web/e2e (a implementar)

---

## 🚀 Deployment

### Build Pipeline

```bash
# 1. Verificações
pnpm check-types
pnpm lint

# 2. Build
pnpm build

# 3. Test (quando implementado)
pnpm test

# 4. Deploy
# (configurar CI/CD)
```

### Environment Variables

Estrutura recomendada:

```bash
# apps/web/.env.local
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_WS_URL=

# apps/web/.env.production
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_WS_URL=
```

---

## 📚 Recursos Adicionais

- Consulte `.versions.md` para versões exatas
- Consulte `CHANGELOG.md` para histórico de mudanças
- Consulte `MIGRATION_GUIDE.md` para guia de migração


