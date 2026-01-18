# @repo/form

Form library with clean, sustainable and scalable architecture, following SOLID principles and Clean Architecture.

## 🎯 Goals

- **Clean Architecture**: Clear separation of responsibilities in layers
- **SOLID**: Rigorous application of SOLID principles
- **Scalable**: Easy to add new field types without modifying existing code
- **Sustainable**: Organized, testable and maintainable code
- **Type-Safe**: TypeScript in all layers

## 📋 Implementation Status

### ✅ Completed

1. **Base Structure**
   - ✅ Complete directory structure (core, presentation, shared)
   - ✅ package.json configuration
   - ✅ tsconfig.json configuration
   - ✅ eslint configuration

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
   - ✅ Base Components (FieldContainer, BaseInput, BaseSelect, BaseEditor, BaseTags)
   - ✅ Hooks (useFormList, useValidator, useSimpleData, useInfinity, useCheckbox, useTags, useTiptapEditor)
   - ✅ Form Component
   - ✅ Editor Module (Hashtag, Mention extensions)
   - ✅ Editor Context (EditorLinks)
   - ✅ Editor Extensions (CustomImage)
   - ✅ Editor Configuration

6. **Shared Layer**
   - ✅ Types (Field, FormProps, Select types, Editor types, Tags types)
   - ✅ Utils/Formatters (CEP, CPF, CNPJ, Phone)
   - ✅ Form Utilities (submitForm, hookValidate, html utils)
   - ✅ Constants (EditorSettings)

7. **Field Components** (29 components implemented)
   - ✅ Input
   - ✅ Textarea
   - ✅ CEP
   - ✅ CPF
   - ✅ CNPJ
   - ✅ Phone
   - ✅ Numeric
   - ✅ Percentage
   - ✅ Money
   - ✅ Currency
   - ✅ Country
   - ✅ State
   - ✅ City
   - ✅ Bank
   - ✅ Icon
   - ✅ Calendar
   - ✅ CalendarRange
   - ✅ DaysOfMonth
   - ✅ DaysOfWeek
   - ✅ DaysOfYear
   - ✅ Avatar
   - ✅ Switch
   - ✅ Checkbox
   - ✅ SimpleSelect
   - ✅ SimpleInfinitySelect
   - ✅ CheckboxSelect
   - ✅ CheckboxInfinitySelect
   - ✅ Tags
   - ✅ Editor

8. **Public API**
   - ✅ Main index.ts with all exports
   - ✅ Component exports (raw components and controllers)
   - ✅ Type exports
   - ✅ Utility exports

## 🏗️ Architecture

### Clean Architecture

The library follows Clean Architecture principles with the following layers:

```
src/
├── core/                           # Core layer (Clean Architecture)
│   ├── domain/                     # Domain layer
│   │   ├── entities/               # Domain entities
│   │   │   ├── field.entity.ts
│   │   │   └── form.entity.ts
│   │   ├── interfaces/             # Domain interfaces
│   │   │   ├── component.interface.ts
│   │   │   ├── field.interface.ts
│   │   │   ├── formatter.interface.ts
│   │   │   └── validator.interface.ts
│   │   └── value-objects/          # Value objects
│   │       ├── field-config.vo.ts
│   │       └── validation-config.vo.ts
│   ├── application/                # Application layer
│   │   ├── services/               # Application services
│   │   │   ├── form-state.service.ts
│   │   │   └── validation.service.ts
│   │   └── use-cases/              # Use cases
│   │       ├── field/
│   │       │   └── render-field.use-case.tsx
│   │       └── form/
│   │           ├── create-form.use-case.ts
│   │           └── get-initial-value.use-case.ts
│   └── infrastructure/             # Infrastructure layer
│       ├── adapters/                # External library adapters
│       │   ├── react-hook-form.adapter.ts
│       │   └── validator.adapter.ts
│       └── factories/              # Factories
│           ├── component.factory.ts
│           └── field.factory.ts
├── presentation/                    # Presentation layer (React)
│   ├── components/                  # React components
│   │   ├── base/                    # Base/reusable components
│   │   │   ├── container/           # FieldContainer
│   │   │   ├── input/               # BaseInput
│   │   │   ├── select/              # BaseSelect components
│   │   │   ├── editor/             # BaseEditor components
│   │   │   └── tags/                # BaseTags components
│   │   ├── fields/                  # Field components (29 components)
│   │   │   ├── input/
│   │   │   ├── textarea/
│   │   │   ├── cep/
│   │   │   ├── cpf/
│   │   │   ├── cnpj/
│   │   │   ├── phone/
│   │   │   ├── numeric/
│   │   │   ├── percentage/
│   │   │   ├── money/
│   │   │   ├── currency/
│   │   │   ├── country/
│   │   │   ├── state/
│   │   │   ├── city/
│   │   │   ├── bank/
│   │   │   ├── icon/
│   │   │   ├── calendar/
│   │   │   ├── calendar-range/
│   │   │   ├── days_of_month/
│   │   │   ├── days_of_week/
│   │   │   ├── days_of_year/
│   │   │   ├── avatar/
│   │   │   ├── switch/
│   │   │   ├── checkbox/
│   │   │   ├── select/              # Select variants
│   │   │   │   ├── simple/
│   │   │   │   ├── simple-infinity/
│   │   │   │   ├── checkbox/
│   │   │   │   └── checkbox-infinity/
│   │   │   ├── tags/
│   │   │   ├── editor/
│   │   │   └── component-registry.ts
│   │   └── form/                    # Form component
│   ├── hooks/                       # React hooks
│   │   ├── use-form-list.hook.tsx
│   │   ├── use-validator.hook.tsx
│   │   ├── select/                  # Select hooks
│   │   │   ├── use-simple-data.hook.ts
│   │   │   ├── use-infinity.hook.ts
│   │   │   ├── use-checkbox.hook.ts
│   │   │   └── use-checkbox-handlers.hook.ts
│   │   ├── tags/                    # Tags hooks
│   │   │   └── use-tags.hook.ts
│   │   └── editor/                  # Editor hooks
│   │       ├── use-tiptap-editor.hook.ts
│   │       ├── use-editor-state.hook.ts
│   │       ├── use-editor-actions.hook.ts
│   │       ├── use-editor-events.hook.ts
│   │       ├── use-modal-configs.hook.ts
│   │       └── use-menu-options.hook.tsx
│   ├── modules/                     # Feature modules
│   │   └── editor/                  # Editor modules
│   │       ├── hashtag/             # Hashtag extension
│   │       └── mention/              # Mention extension
│   ├── contexts/                    # React contexts
│   │   └── editor-links.context.tsx
│   ├── extensions/                  # Tiptap extensions
│   │   └── editor/
│   │       └── custom-image.extension.ts
│   └── config/                      # Configuration
│       └── editor/
│           └── extensions.config.ts
└── shared/                          # Shared code
    ├── types/                        # TypeScript types
    │   ├── field.types.ts
    │   ├── select.types.ts
    │   ├── editor.types.ts
    │   └── tags.types.ts
    ├── utils/                        # Utilities
    │   ├── formatters/               # Formatters
    │   │   ├── cep.formatter.ts
    │   │   ├── cpf.formatter.ts
    │   │   ├── cnpj.formatter.ts
    │   │   └── phone.formatter.ts
    │   ├── submit-form.utils.ts
    │   ├── hook-validate.utils.ts
    │   └── html.utils.ts
    └── constants/                    # Constants
        └── editor-settings.constant.ts
```

### SOLID Principles

1. **Single Responsibility Principle (SRP)**
   - Each class/file has a single responsibility
   - Ex: `ValidationService` only validates, `FormStateService` only manages state
   - Each field component has its own directory with controller and export components

2. **Open/Closed Principle (OCP)**
   - Easy to add new field types without modifying existing code
   - `ComponentFactory` allows registration of new components
   - New components can be added by registering in `component-registry.ts`

3. **Liskov Substitution Principle (LSP)**
   - Common interfaces allow component substitution
   - `IFieldComponent` ensures compatibility
   - All field components implement the same interface

4. **Interface Segregation Principle (ISP)**
   - Context-specific interfaces (IFieldWithOptions, IFieldWithRequest, etc.)
   - Avoids "fat" interfaces
   - Separate interfaces for different concerns

5. **Dependency Inversion Principle (DIP)**
   - Dependencies on abstractions, not implementations
   - Adapters for external libraries (React Hook Form, Zod, Validator)
   - Factories for component creation

## 📦 Usage

### Basic Example

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

### Using Raw Components

```typescript
import { Input, SimpleSelect, Calendar } from '@repo/form';

// Use components directly without form context
<Input value={value} onChange={setValue} />
<SimpleSelect options={options} value={value} onChange={setValue} />
<Calendar date={date} setDate={setDate} />
```

### Using Controllers (with React Hook Form)

```typescript
import { InputController, SelectController } from '@repo/form';
import { useForm } from 'react-hook-form';

const MyComponent = () => {
  const { control } = useForm();

  return (
    <>
      <InputController name="email" control={control} />
      <SelectController name="country" control={control} options={options} />
    </>
  );
};
```

## 🔄 Component Structure

Each field component follows a consistent structure:

```
field-name/
├── field-name.component.tsx      # Controller component (with React Hook Form)
├── field-name-export.component.tsx # Raw component (standalone)
├── field-name-export.ts           # Export file
└── index.ts                        # Barrel export
```

- **Controller Component**: Integrates with React Hook Form, uses `Controller` internally
- **Export Component**: Standalone component that can be used without form context
- **Export File**: TypeScript export file for better tree-shaking

## 🚀 How to Add a New Component

1. **Create the component directory** in `src/presentation/components/fields/[name]/`

2. **Create the controller component** (`[name].component.tsx`):
   ```typescript
   export function MyField<FormType extends FieldValues>({
     name,
     control,
     ...rest
   }: IFieldComponentProps<FormType>) {
     return (
       <Controller
         control={control}
         name={name}
         render={({ field, fieldState }) => (
           <FieldContainer name={name} error={fieldState.error?.message} {...rest}>
             {/* Your component implementation */}
           </FieldContainer>
         )}
       />
     );
   }
   ```

3. **Create the export component** (`[name]-export.component.tsx`):
   ```typescript
   export function MyField({
     value,
     onChange,
     ...rest
   }: IMyFieldProps) {
     // Standalone implementation
   }
   ```

4. **Register in ComponentFactory** in `component-registry.ts`:
   ```typescript
   import { MyField } from './my-field/my-field.component';
   
   ComponentFactory.register('my_field', MyField);
   ```

5. **Add exports** in `src/index.ts`:
   ```typescript
   export { MyField } from './presentation/components/fields/my-field/my-field-export.component';
   export { MyField as MyFieldController } from './presentation/components/fields/my-field/my-field-export.component';
   ```

6. **Done!** The component will be automatically available in `Form` and can be used standalone

## 📚 Public API

### Hooks
- `useFormList` - Main hook for form management
- `useValidator` - Hook for validation

### Components
- `Form` - Main form component
- `FieldContainer` - Base container for fields

### Field Components (Raw)
- `Input`, `Textarea`, `Cep`, `Cpf`, `Cnpj`, `Phone`
- `Numeric`, `Percentage`, `Money`, `Currency`
- `Country`, `State`, `City`, `Bank`, `Icon`
- `Calendar`, `CalendarRange`
- `DaysOfMonth`, `DaysOfWeek`, `DaysOfYear`
- `Avatar`, `Switch`, `Checkbox`
- `SimpleSelect`, `SimpleInfinitySelect`
- `CheckboxSelect`, `CheckboxInfinitySelect`
- `Tags`, `Editor`

### Controllers
All field components are also exported as controllers (e.g., `InputController`, `SelectController`)

### Types
- `Field`, `UseFormListProps`, `FormProps`, `IUseFormListReturn`
- `IOption`, `ISelectProps`, `ISimpleSelectProps`, `ICheckboxSelectProps`, `ISimpleInfinityProps`
- `EditorProps`, `MenuBarProps`, `InsertModalProps`
- `ISelectedTag`, `ITagsProps`

### Utils
- `formatCep`, `removeCepMask`
- `formatCpf`, `removeCpfMask`
- `formatCnpj`, `removeCnpjMask`
- `formatPhone`, `removePhoneMask`
- `submitForm` - Process form data by removing unchanged values
- `hookValidate` - Validate multiple forms and process their data
- `isHtmlEmpty`, `normalizeHtml` - HTML utilities

## 📝 Notes

- This library follows Clean Architecture and SOLID principles
- All components are type-safe with TypeScript
- Components can be used both within forms and standalone
- The library uses React Hook Form for form state management
- Validation supports both Zod schemas and @deviobr/validator
- Editor component uses Tiptap with custom extensions (Hashtag, Mention, CustomImage)
