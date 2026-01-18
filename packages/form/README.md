# @repo/form

Form library with clean, sustainable and scalable architecture, following SOLID principles and Clean Architecture.

## 🎯 Goals

- **Clean Architecture**: Clear separation of responsibilities in layers
- **SOLID**: Rigorous application of SOLID principles
- **Scalable**: Easy to add new field types without modifying existing code
- **Sustainable**: Organized, testable and maintainable code
- **Type-Safe**: TypeScript in all layers

## 📋 Status da Implementação

### ✅ Concluído

1. **Estrutura Base**
   - ✅ Estrutura de diretórios completa (core, application, infrastructure, presentation, shared)
   - ✅ Configuração do package.json
   - ✅ Configuração do tsconfig.json
   - ✅ Configuração do eslint

2. **Core Domain Layer**
   - ✅ Interfaces (IField, IFieldComponent, IValidator, IFormatter)
   - ✅ Entities (FieldEntity, FormEntity)
   - ✅ Value Objects (FieldConfigVO, ValidationConfigVO)

3. **Application Layer**
   - ✅ Services (ValidationService, FormStateService)
   - ✅ Use Cases (CreateFormUseCase, GetInitialValueUseCase, RenderFieldUseCase)

4. **Infrastructure Layer**
   - ✅ Adapters (ValidatorAdapter, ReactHookFormAdapter)
   - ✅ Factories (ComponentFactory, FieldFactory)

5. **Presentation Layer**
   - ✅ Componentes Base (FieldContainer, BaseInput)
   - ✅ Hooks (useFormList, useValidator)
   - ✅ Componente Form
   - ✅ Componentes migrados: Input, Textarea

6. **Shared Layer**
   - ✅ Types (Field, FormProps, Select types, Editor types)
   - ✅ Utils/Formatters (CEP, CPF, CNPJ, Phone)

7. **Exports e API Pública**
   - ✅ Index.ts principal com todos os exports
   - ✅ Compatibilidade com exports antigos

### 🚧 Em Progresso / Pendente

1. **Componentes de Campo Restantes** (26 componentes)
   - ⏳ Avatar
   - ⏳ Bank
   - ⏳ Calendar
   - ⏳ CalendarRange
   - ⏳ Cep
   - ⏳ Cities
   - ⏳ Cnpj
   - ⏳ Country
   - ⏳ Cpf
   - ⏳ Currency
   - ⏳ DaysOfMonth
   - ⏳ DaysOfWeek
   - ⏳ DaysOfYear
   - ⏳ Editor
   - ⏳ Icons
   - ⏳ Money
   - ⏳ Numeric
   - ⏳ Percentage
   - ⏳ Phone
   - ⏳ Select (Simple, Checkbox, Infinity variants)
   - ⏳ States
   - ⏳ Tags
   - ⏳ Switch
   - ⏳ Checkbox

## 🏗️ Arquitetura

### Clean Architecture

The library follows Clean Architecture principles with the following layers:

```
src/
├── core/                    # Domain layer (Clean Arch)
│   ├── domain/             # Entities, Value Objects, Interfaces
│   ├── application/        # Use cases and services
│   └── infrastructure/     # Adapters and factories
├── presentation/            # Presentation layer (React)
│   ├── components/         # React components
│   └── hooks/              # React hooks
└── shared/                  # Shared code
    ├── types/              # TypeScript types
    └── utils/              # Utilities
```

### SOLID Principles

1. **Single Responsibility Principle (SRP)**
   - Each class/file has a single responsibility
   - Ex: `ValidationService` only validates, `FormStateService` only manages state

2. **Open/Closed Principle (OCP)**
   - Easy to add new field types without modifying existing code
   - `ComponentFactory` allows registration of new components

3. **Liskov Substitution Principle (LSP)**
   - Common interfaces allow component substitution
   - `IFieldComponent` ensures compatibility

4. **Interface Segregation Principle (ISP)**
   - Context-specific interfaces (IFieldWithOptions, IFieldWithRequest, etc.)
   - Avoids "fat" interfaces

5. **Dependency Inversion Principle (DIP)**
   - Dependencies on abstractions, not implementations
   - Adapters for external libraries

## 📦 Uso

### Exemplo Básico

```typescript
import { useFormList, Form } from '@repo/form';

const MyForm = () => {
  const { Form, hook, isDirty, isError } = useFormList({
    fields: [
      {
        name: 'email',
        field: 'input',
        label: 'Email',
        required: true,
      },
    ],
    schema: z.object({
      email: z.string().email(),
    }),
  });

  return <Form hook={hook} fields={fields} />;
};
```

## 🔄 Component Migration

To migrate a component:

1. Create the component in `src/presentation/components/fields/[name]/`
2. Implement `IFieldComponentProps`
3. Register in `ComponentFactory` in `component-registry.ts`
4. Add exports in `index.ts`

## 🚀 How to Add a New Component

1. **Create the component** in `src/presentation/components/fields/[name]/`
   ```typescript
   export function MyField<FormType extends FieldValues>({
     name,
     control,
     ...rest
   }: IFieldComponentProps<FormType>) {
     // Implementation
   }
   ```

2. **Register in ComponentFactory** in `component-registry.ts`
   ```typescript
   ComponentFactory.register('my_field', MyField);
   ```

3. **Done!** The component will be automatically available in `Form`

## 📝 Notes

- This is a complete rewrite focused on a new and sustainable structure
- There is no compatibility with the old version - this is a new API
- All components must follow the `IFieldComponentProps` pattern
