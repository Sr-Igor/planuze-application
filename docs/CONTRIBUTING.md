# Guia de Contribuição

## 🎯 Antes de Começar

1. Leia `README.md` para entender o projeto
2. Leia `ARCHITECTURE.md` para entender a estrutura
3. Leia `.versions.md` para conhecer as versões utilizadas

---

## 🛠️ Configuração do Ambiente

### Requisitos

- Node.js >= 20
- pnpm >= 9.0.0
- Git

### Setup Inicial

```bash
# 1. Clonar repositório
git clone <repo-url>
cd monorepo

# 2. Instalar dependências
pnpm install

# 3. Verificar instalação
pnpm health-check

# 4. Iniciar desenvolvimento
pnpm dev
```

---

## 📝 Workflow de Desenvolvimento

### 1. Criar Branch

```bash
# Features
git checkout -b feature/nome-da-feature

# Bug fixes
git checkout -b fix/nome-do-bug

# Refactoring
git checkout -b refactor/descricao

# Docs
git checkout -b docs/descricao
```

### 2. Desenvolvimento

```bash
# Trabalhar em workspace específico
pnpm dev --filter=web

# Verificar tipos continuamente
pnpm check-types --filter=web
```

### 3. Qualidade de Código

```bash
# Antes de commitar
pnpm format              # Formatar código
pnpm lint               # Verificar lint
pnpm check-types        # Verificar tipos
```

### 4. Commit

Seguir convenção [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Features
git commit -m "feat(web): adicionar autenticação OAuth"

# Bug fixes
git commit -m "fix(ui): corrigir padding do Button"

# Refactoring
git commit -m "refactor(api): simplificar tipos de usuário"

# Docs
git commit -m "docs: atualizar guia de instalação"

# Chore
git commit -m "chore: atualizar dependências"

# Performance
git commit -m "perf(web): otimizar carregamento de imagens"
```

**Tipos de Commit:**
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `refactor`: Refatoração
- `perf`: Melhoria de performance
- `test`: Testes
- `chore`: Manutenção
- `style`: Formatação

**Escopos:**
- `web`: apps/web
- `ui`: packages/ui
- `api`: packages/api
- `fonts`: packages/fonts
- `config`: configurações
- `root`: arquivos raiz

---

## 🧩 Adicionando Funcionalidades

### Novo Componente UI

```bash
# 1. Adicionar usando Shadcn
pnpm ui:add <component-name>

# 2. O componente será criado em packages/ui/src/components/ui/

# 3. Exportar em packages/ui/src/index.ts
export * from "./components/ui/novo-componente"

# 4. Usar na app
import { NovoComponente } from '@repo/ui'
```

### Nova Página (Next.js)

```typescript
// apps/web/src/app/[locale]/nova-rota/page.tsx
import { Button } from '@repo/ui'

export default function NovaRotaPage() {
  return (
    <div>
      <h1>Nova Rota</h1>
      <Button>Click</Button>
    </div>
  )
}
```

### Novo Hook

```typescript
// Para hooks específicos da app
// apps/web/src/hooks/use-exemplo/index.tsx

import { useState } from 'react'

export function useExemplo() {
  const [state, setState] = useState()
  
  return { state, setState }
}
```

```typescript
// Para hooks compartilhados de UI
// packages/ui/src/hooks/use-exemplo.ts

export function useExemplo() {
  // Hook reutilizável
}

// Exportar em packages/ui/src/index.ts
export * from "./hooks/use-exemplo"
```

### Nova API Call

```typescript
// apps/web/src/api/req/exemplo.ts
import { api } from '@/api/handle'

export async function getExemplo(id: string) {
  return api.get(`/exemplo/${id}`)
}

// apps/web/src/api/callers/exemplo.tsx
import { useQuery } from '@tanstack/react-query'
import { getExemplo } from '@/api/req/exemplo'

export function useExemplo(id: string) {
  return useQuery({
    queryKey: ['exemplo', id],
    queryFn: () => getExemplo(id)
  })
}
```

---

## 📦 Adicionando Dependências

### Regras de Onde Adicionar

| Tipo de Dependência | Localização | Comando |
|---------------------|-------------|---------|
| Componente UI | `packages/ui` | `pnpm add <pkg> --filter=@repo/ui` |
| Ferramenta de build | `root` | `pnpm add -D <pkg> -w` |
| Lib da aplicação | `apps/web` | `pnpm add <pkg> --filter=web` |
| Config compartilhada | `packages/*-config` | `pnpm add <pkg> --filter=@repo/*-config` |

### Antes de Adicionar

1. **Verificar se já existe** no monorepo
   ```bash
   pnpm why <nome-do-pacote>
   ```

2. **Verificar compatibilidade** com versões atuais
   ```bash
   # Ver versões em .versions.md
   cat .versions.md
   ```

3. **Escolher versão correta**
   - Preferir versões estáveis (não use `latest`)
   - Verificar compatibilidade com React 19
   - Verificar compatibilidade com Next.js 15

### Exemplo: Adicionar Nova Lib

```bash
# 1. Verificar se já existe
pnpm why axios

# 2. Adicionar ao workspace correto
pnpm add axios@^1.13.2 --filter=web

# 3. Verificar instalação
pnpm why axios

# 4. Atualizar .versions.md se for dependência importante

# 5. Testar
pnpm check-types --filter=web
```

---

## 🎨 Padrões de Código

### TypeScript

```typescript
// ✅ BOM: Tipos explícitos
interface UserData {
  id: string
  name: string
  email: string
}

function createUser(data: UserData): Promise<User> {
  return api.post('/users', data)
}

// ✅ BOM: Generics quando apropriado
function useData<T>(key: string): T | undefined {
  // ...
}

// ✅ BOM: Type guards
function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value
  )
}

// ❌ RUIM: any
function process(data: any): any {
  // ...
}
```

### React Components

```typescript
// ✅ BOM: Props interface separada
interface ButtonProps {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  children: React.ReactNode
}

export function Button({ variant = 'primary', ...props }: ButtonProps) {
  return <button {...props} />
}

// ✅ BOM: Usar forwardRef quando necessário
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return <input ref={ref} {...props} />
  }
)
Input.displayName = 'Input'

// ❌ RUIM: Props inline
export function Button({ variant, size, onClick, children }: {
  variant?: string
  size?: string
  onClick?: () => void
  children: any
}) {
  // ...
}
```

### Hooks Customizados

```typescript
// ✅ BOM: Tipagem clara
export function useUser(id: string) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  
  useEffect(() => {
    fetchUser(id)
      .then(setUser)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [id])
  
  return { user, loading, error }
}

// ✅ BOM: Retorno tipado com objeto
export function useForm() {
  // ...
  return { register, handleSubmit, errors } as const
}

// ❌ RUIM: Retorno com array
export function useForm() {
  return [register, handleSubmit, errors] // Dificulta tipagem
}
```

### Validação com Zod

```typescript
// ✅ BOM: Schema reutilizável
const userSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Mínimo 8 caracteres'),
  name: z.string().min(2, 'Mínimo 2 caracteres')
})

type UserInput = z.infer<typeof userSchema>

export function validateUser(data: unknown): UserInput {
  return userSchema.parse(data)
}

// ✅ BOM: Usar com React Hook Form
const form = useForm<UserInput>({
  resolver: zodResolver(userSchema)
})
```

---

## 🧪 Testing (A Implementar)

### Estrutura Recomendada

```
apps/web/
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   └── Header.test.tsx
│   └── hooks/
│       ├── use-auth/
│       │   ├── index.tsx
│       │   └── index.test.tsx

packages/ui/
├── src/
│   ├── components/ui/
│   │   ├── button.tsx
│   │   └── button.test.tsx
```

### Exemplo de Teste

```typescript
// button.test.tsx
import { render, screen } from '@testing-library/react'
import { Button } from './button'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })
})
```

---

## 🔍 Code Review Checklist

### Para o Autor

Antes de abrir PR:

- [ ] ✅ `pnpm check-types` passa
- [ ] ✅ `pnpm lint` passa sem warnings
- [ ] ✅ `pnpm build` gera build corretamente
- [ ] ✅ Código formatado (`pnpm format`)
- [ ] ✅ Commits seguem conventional commits
- [ ] ✅ Branch atualizada com main
- [ ] ✅ Sem console.logs desnecessários
- [ ] ✅ Sem TODOs sem issue associada
- [ ] ✅ Documentação atualizada (se necessário)

### Para o Reviewer

Verificar:

- [ ] Código segue padrões do projeto
- [ ] Tipos estão corretos
- [ ] Sem any desnecessários
- [ ] Performance considerations
- [ ] Segurança (XSS, injection, etc)
- [ ] Acessibilidade (a11y)
- [ ] Responsividade (mobile)
- [ ] Internacionalização (se aplicável)
- [ ] Error handling adequado
- [ ] Loading states adequados

---

## 🚨 Anti-Patterns

### ❌ O Que NÃO Fazer

```typescript
// ❌ Usar any
const data: any = fetchData()

// ❌ Ignorrar erros
try {
  dangerousOperation()
} catch (e) {
  // silenciosamente ignorar
}

// ❌ Props drilling excessivo
<ComponentA>
  <ComponentB data={data}>
    <ComponentC data={data}>
      <ComponentD data={data} />  // Use context ou state management
    </ComponentC>
  </ComponentB>
</ComponentA>

// ❌ Mutations diretas
state.user.name = 'novo'  // Use setState ou immer

// ❌ Dependências desatualizadas
import OldComponent from 'deprecated-lib'

// ❌ Imports relativos profundos
import { util } from '../../../../../../../utils/helper'
```

### ✅ O Que Fazer Ao Invés

```typescript
// ✅ Tipos apropriados
const data: UserData = fetchData()

// ✅ Error handling
try {
  dangerousOperation()
} catch (error) {
  logger.error('Failed to execute operation', error)
  showNotification('Erro ao processar')
}

// ✅ Context ou state management
const { data } = useAppContext()
// ou
const data = useSelector(selectData)

// ✅ Immutable updates
setState(prev => ({ ...prev, user: { ...prev.user, name: 'novo' } }))

// ✅ Usar workspace packages
import { util } from '@repo/ui/lib/utils'
```

---

## 🎨 Estilo e Formatação

### Prettier (Automático)

```bash
# Formatar tudo
pnpm format

# Formatar arquivo específico
pnpm prettier --write "apps/web/src/components/**/*.tsx"
```

### ESLint

```bash
# Verificar
pnpm lint

# Fix automático
pnpm lint --fix
```

### Convenções CSS/Tailwind

```typescript
// ✅ BOM: Usar cn() para conditional classes
import { cn } from '@repo/ui/lib/utils'

<Button className={cn(
  "base-classes",
  variant === 'primary' && "primary-classes",
  size === 'lg' && "lg-classes",
  className
)} />

// ✅ BOM: Usar CVA para variants
import { cva } from 'class-variance-authority'

const buttonVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        primary: "primary-classes",
        secondary: "secondary-classes"
      }
    }
  }
)
```

---

## 📚 Recursos Úteis

### Documentação

- [React 19 Docs](https://react.dev)
- [Next.js 15 Docs](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Radix UI Docs](https://www.radix-ui.com/primitives/docs)
- [TanStack Query Docs](https://tanstack.com/query/latest/docs/react/overview)
- [Redux Toolkit Docs](https://redux-toolkit.js.org/)

### Tools

- [TypeScript Playground](https://www.typescriptlang.org/play)
- [Regex101](https://regex101.com/)
- [Can I Use](https://caniuse.com/)
- [Bundle Phobia](https://bundlephobia.com/)

---

## ❓ FAQ

### Como adicionar um novo workspace?

```bash
# 1. Criar pasta
mkdir -p packages/novo-package

# 2. Criar package.json
cd packages/novo-package
pnpm init

# 3. Configurar package.json
# name: "@repo/novo-package"
# private: true

# 4. Adicionar ao pnpm-workspace.yaml (já está com "packages/*")

# 5. Instalar
cd ../..
pnpm install
```

### Como debugar problema de tipos?

```bash
# 1. Verificar qual workspace tem erro
pnpm check-types --filter=web 2>&1 | grep error

# 2. Verificar configuração do TypeScript
cat apps/web/tsconfig.json

# 3. Verificar se dependências estão instaladas
pnpm list @repo/ui --filter=web

# 4. Limpar e reinstalar
pnpm clean
pnpm install
pnpm check-types
```

### Como resolver conflito de versões?

```bash
# 1. Identificar conflito
pnpm why <nome-do-pacote>

# 2. Ver versões instaladas
pnpm list <nome-do-pacote> -r

# 3. Atualizar para versão consistente
# Editar package.json relevante

# 4. Reinstalar
pnpm install

# 5. Deduplicate
pnpm dedupe
```

### Como atualizar dependências?

```bash
# 1. Verificar desatualizadas
pnpm outdated -r

# 2. Atualizar interativamente
pnpm update -i -r --latest

# 3. Testar
pnpm check-types
pnpm lint
pnpm build

# 4. Atualizar .versions.md
# Documentar versões novas

# 5. Commit
git commit -m "chore: atualizar dependências"
```

---

## 🐛 Reportando Bugs

### Template de Issue

```markdown
**Descrição**
Descrição clara do bug

**Para Reproduzir**
1. Ir para '...'
2. Clicar em '...'
3. Ver erro

**Comportamento Esperado**
O que deveria acontecer

**Screenshots**
Se aplicável

**Ambiente**
- OS: [macOS/Windows/Linux]
- Node: [versão]
- pnpm: [versão]
- Browser: [se aplicável]

**Logs**
```
Colar logs relevantes
```

**Contexto Adicional**
Qualquer outra informação
```

---

## 💡 Dicas de Performance

### 1. Imports Otimizados

```typescript
// ✅ BOM: Import específico
import { Button } from '@repo/ui'

// ❌ RUIM: Import de tudo
import * as UI from '@repo/ui'
```

### 2. Lazy Loading

```typescript
// ✅ BOM: Lazy load componentes pesados
const HeavyComponent = lazy(() => import('./HeavyComponent'))

<Suspense fallback={<Loading />}>
  <HeavyComponent />
</Suspense>
```

### 3. Memoização Apropriada

```typescript
// ✅ BOM: Memoize computações caras
const sortedData = useMemo(
  () => expensiveSort(data),
  [data]
)

// ❌ RUIM: Memoize tudo
const simple = useMemo(() => a + b, [a, b])
```

---

## 🎓 Aprendizado Contínuo

### Code Review

- Participe de code reviews
- Aprenda com feedback
- Compartilhe conhecimento

### Boas Práticas

- Leia o código existente
- Siga padrões estabelecidos
- Proponha melhorias quando identificar

### Comunicação

- Seja claro e objetivo
- Documente decisões importantes
- Peça ajuda quando necessário

---

## 📞 Suporte

- **Dúvidas técnicas:** Abra issue no GitHub
- **Sugestões:** Abra discussion
- **Bugs:** Siga template de issue

---

**Obrigado por contribuir! 🚀**


