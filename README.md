# Monorepo

Monorepo moderno construído com Turborepo, pnpm, React 19, Next.js 15 e TypeScript 5.9.

## Estrutura

### Apps

- **web**: Aplicação principal Next.js 15 com internacionalização, autenticação e state management
- **docs**: Documentação (em desenvolvimento)

### Packages

- **@repo/ui**: Biblioteca de componentes UI compartilhados (Radix UI + Shadcn/ui)
- **@repo/api**: Tipos e geradores de API compartilhados
- **@repo/fonts**: Fontes customizadas (Geist)
- **@repo/tailwind-config**: Configurações compartilhadas do Tailwind CSS
- **@repo/eslint-config**: Configurações compartilhadas do ESLint
- **@repo/typescript-config**: Configurações base do TypeScript

### Stack Tecnológica

| Categoria | Tecnologias |
|-----------|-------------|
| **Framework** | React 19.2, Next.js 15.5 |
| **Linguagem** | TypeScript 5.9.3 |
| **Build** | Turbo 2.6, pnpm 9.0 |
| **Styling** | Tailwind CSS 4.1, CSS Modules |
| **UI Components** | Radix UI, Shadcn/ui |
| **State** | Redux Toolkit, Zustand, TanStack Query |
| **Forms** | React Hook Form, Zod |
| **i18n** | next-intl |
| **Editor** | Tiptap |

## Arquitetura de Dependências

### Princípios

1. **Centralização**: Versões principais definidas no root
2. **Workspace Protocol**: Dependências internas com `workspace:*`
3. **Peer Dependencies**: UI packages usam peer deps para React/Next
4. **Sem Duplicação**: Cada dependência em apenas um lugar

## Pré-requisitos

- Node.js >= 20
- pnpm >= 9.0.0

## Instalação

```bash
# Instalar dependências
pnpm install

# Verificar tipos em todos os workspaces
pnpm check-types

# Executar linter
pnpm lint
```

## Desenvolvimento

```bash
# Desenvolvimento de todos os apps
pnpm dev

# Desenvolvimento apenas do app web
pnpm dev --filter=web

# Desenvolvimento com cache limpo
pnpm clean && pnpm install && pnpm dev
```

## Build

```bash
# Build de produção
pnpm build

# Build de um workspace específico
pnpm build --filter=web

# Build com análise de bundle
pnpm build --filter=web -- --analyze
```

## Scripts Úteis

```bash
# Adicionar componente Shadcn/ui
pnpm ui:add

# Formatar código
pnpm format

# Limpar caches e node_modules
pnpm clean

# Verificar tipos sem emitir
pnpm check-types
```

## Estrutura de Pastas

```
monorepo/
├── apps/
│   ├── docs/          # App de documentação
│   └── web/           # App principal Next.js
│       ├── src/
│       │   ├── app/          # App Router
│       │   ├── components/   # Componentes específicos
│       │   ├── api/          # Chamadas de API
│       │   ├── hooks/        # Custom hooks
│       │   ├── store/        # Redux store
│       │   ├── templates/    # Templates reutilizáveis
│       │   └── utils/        # Utilitários
│       └── locales/   # Traduções (pt-BR, en-US)
├── packages/
│   ├── api/           # Tipos e geradores da API
│   ├── eslint-config/ # Configs ESLint compartilhadas
│   ├── fonts/         # Fontes customizadas
│   ├── tailwind-config/ # Config Tailwind compartilhada
│   ├── typescript-config/ # Configs TypeScript
│   └── ui/            # Biblioteca de componentes UI
│       └── src/
│           ├── components/ui/  # Componentes Shadcn
│           ├── hooks/          # Hooks compartilhados
│           └── lib/            # Utilitários UI
└── .versions.md       # Documentação de versões

```

## Gerenciamento de Dependências

### Regras

1. **Dependências UI**: Devem estar em `packages/ui`
2. **Dependências da App**: Devem estar em `apps/web`
3. **Dev Tools**: Devem estar no root para compartilhar
4. **Versões**: Sempre sincronizadas (veja `.versions.md`)

### Adicionando Dependências

```bash
# Adicionar dependência ao workspace específico
pnpm add <pacote> --filter=web

# Adicionar dev dependency ao root
pnpm add -D <pacote> -w

# Adicionar dependência UI
pnpm add <pacote> --filter=@repo/ui
```

## Manutenção

```bash
# Verificar dependências desatualizadas
pnpm outdated -r

# Atualizar dependências (interativo)
pnpm update -i -r --latest

# Remover duplicações
pnpm dedupe

# Verificar integridade
pnpm install --frozen-lockfile
```

## Troubleshooting

### Erro de tipos

```bash
pnpm clean
pnpm install
pnpm check-types
```

### Erro de cache do Turbo

```bash
turbo clean
pnpm dev
```

### Dependências conflitantes

```bash
pnpm why <pacote>
pnpm dedupe
```

## Links Úteis

- [Turborepo Docs](https://turbo.build/repo/docs)
- [pnpm Workspaces](https://pnpm.io/workspaces)
- [Next.js 15](https://nextjs.org/docs)
- [React 19](https://react.dev/blog/2024/12/05/react-19)
- [Shadcn/ui](https://ui.shadcn.com)
