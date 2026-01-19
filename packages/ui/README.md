# @repo/ui

A scalable and maintainable UI component library built with **SOLID principles** and **Clean Architecture** patterns.

## Architecture Overview

This library follows Clean Architecture principles, organizing code into distinct layers with clear responsibilities:

```
src/
├── core/                    # Domain Layer
│   ├── interfaces/          # Component contracts (ISP)
│   ├── types/               # Domain types
│   └── value-objects/       # Immutable value objects
│
├── application/             # Application Layer
│   ├── hooks/               # Reusable logic hooks (SRP)
│   └── services/            # Business logic services
│
├── infrastructure/          # Infrastructure Layer
│   ├── adapters/            # External dependency wrappers (DIP)
│   ├── factories/           # Component/variant factories (OCP)
│   └── providers/           # Context providers
│
├── presentation/            # Presentation Layer
│   ├── primitives/          # Base components (Button, Input, etc.)
│   ├── composites/          # Combined components (Card, Modal)
│   └── patterns/            # Complex UI patterns (DataTable)
│
└── shared/                  # Shared Utilities
    ├── constants/           # Design tokens
    ├── utils/               # Helper functions
    └── types/               # Shared types
```

## SOLID Principles Applied

### Single Responsibility (SRP)
Each component, hook, and module has one specific responsibility:
- Hooks handle logic
- Variants handle styling
- Components handle rendering

### Open/Closed (OCP)
Components are open for extension via:
- Variant system (add new variants without modifying components)
- Composition patterns (combine components freely)
- Slot pattern (render as different elements)

### Liskov Substitution (LSP)
All components can be substituted:
- Primitives can be replaced by composites
- Native elements via `asChild` prop
- Consistent prop interfaces

### Interface Segregation (ISP)
Interfaces are small and focused:
- `ILoadableComponent` - loading state only
- `IDisableableComponent` - disabled state only
- `ISlottableComponent` - slot behavior only

### Dependency Inversion (DIP)
High-level modules don't depend on low-level modules:
- Adapters wrap external libraries (Radix, etc.)
- Easy to swap implementations
- Testable in isolation

## Installation

```bash
pnpm add @repo/ui
```

## Usage

### Basic Component Usage

```tsx
import { Button } from "@repo/ui";

function MyComponent() {
  return (
    <Button variant="default" size="lg">
      Click me
    </Button>
  );
}
```

### Available Button Variants

```tsx
// Visual variants
<Button variant="default">Default</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Size variants
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="icon"><IconComponent /></Button>
```

### With Loading State

```tsx
import { Button } from "@repo/ui";

function SaveButton({ onSave }) {
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    await onSave();
    setLoading(false);
  };

  return (
    <Button onClick={handleSave} loading={loading}>
      Save
    </Button>
  );
}
```

### With Icons

```tsx
import { Button } from "@repo/ui";
import { PlusIcon, ArrowRightIcon } from "lucide-react";

// Left icon
<Button leftIcon={<PlusIcon />}>Add Item</Button>

// Right icon
<Button rightIcon={<ArrowRightIcon />}>Continue</Button>

// Both icons
<Button leftIcon={<PlusIcon />} rightIcon={<ArrowRightIcon />}>
  Action
</Button>
```

### Polymorphic Components (asChild)

```tsx
import { Button } from "@repo/ui";
import Link from "next/link";

// Button styled as a link
function NavButton() {
  return (
    <Button asChild variant="ghost">
      <Link href="/dashboard">Go to Dashboard</Link>
    </Button>
  );
}
```

### Using Design Tokens

```tsx
import { cn, SIZE_TOKENS, SPACING_TOKENS } from "@repo/ui";

function CustomComponent({ className }) {
  return (
    <div
      className={cn("rounded-md", className)}
      style={{
        height: SIZE_TOKENS.lg,
        padding: SPACING_TOKENS[4],
      }}
    >
      Content
    </div>
  );
}
```

### Custom Hooks

```tsx
import { useControllableState } from "@repo/ui";

function CustomInput({ value, defaultValue, onChange }) {
  const [internalValue, setValue] = useControllableState({
    value,
    defaultValue: defaultValue ?? "",
    onChange,
  });

  return (
    <input
      value={internalValue}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
```

## Creating New Components

### 1. Define Types (`component.types.ts`)

```tsx
import { ISlottableComponent, ILoadableComponent } from "@repo/ui";

export interface MyComponentProps
  extends ISlottableComponent,
    ILoadableComponent {
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
}
```

### 2. Define Variants (`component.variants.ts`)

```tsx
import { cva } from "@repo/ui";

export const myComponentVariants = cva(
  "base-classes here",
  {
    variants: {
      variant: {
        default: "variant-default-classes",
        outline: "variant-outline-classes",
      },
      size: {
        sm: "size-sm-classes",
        md: "size-md-classes",
        lg: "size-lg-classes",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);
```

### 3. Create Component (`component.tsx`)

```tsx
"use client";

import { forwardRef } from "react";
import { Slot, cn } from "@repo/ui";
import { MyComponentProps } from "./component.types";
import { myComponentVariants } from "./component.variants";

export const MyComponent = forwardRef<HTMLDivElement, MyComponentProps>(
  ({ className, variant, size, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";

    return (
      <Comp
        ref={ref}
        className={cn(myComponentVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);

MyComponent.displayName = "MyComponent";
```

### 4. Export (`index.ts`)

```tsx
export { MyComponent } from "./component";
export type { MyComponentProps } from "./component.types";
export { myComponentVariants } from "./component.variants";
```

## Component Categories

### Primitives
Low-level, single-purpose components:
- `Button` - Interactive button with variants and loading state
- `IconButton` - Icon-only button with required aria-label

### Composites
Combined primitives for common patterns:
- Coming soon: Card, Modal, Dropdown, etc.

### Patterns
Complex, opinionated UI solutions:
- Coming soon: DataTable, SearchCombobox, etc.

## Exports

### Components
```tsx
import { Button, IconButton } from "@repo/ui";
```

### Hooks
```tsx
import {
  useControllableState,
  useControllableBooleanState,
  useSlotChildren,
  useCompoundComponent,
} from "@repo/ui";
```

### Utilities
```tsx
import { cn, Slot, Slottable, cva } from "@repo/ui";
```

### Types
```tsx
import type {
  ButtonProps,
  ButtonVariant,
  ButtonSize,
  Size,
  ColorIntent,
  ILoadableComponent,
  ISlottableComponent,
} from "@repo/ui";
```

### Constants
```tsx
import {
  SIZE_TOKENS,
  SPACING_TOKENS,
  RADIUS_TOKENS,
  Z_LAYER_TOKENS,
  ANIMATION_DURATION_TOKENS,
  BREAKPOINT_TOKENS,
} from "@repo/ui";
```

## File Naming Conventions

- `*.types.ts` - Type definitions
- `*.variants.ts` - CVA variant configurations
- `*.tsx` - React components
- `*.hook.ts` - Custom hooks
- `*.constant.ts` - Constants and tokens
- `*.adapter.tsx` - External library adapters
- `*.factory.tsx` - Factory functions
- `*.vo.ts` - Value objects

## Contributing

When adding new components:

1. **Follow the layer structure** - Place code in the appropriate layer
2. **Apply SOLID principles** - Keep responsibilities clear and focused
3. **Document in English** - All comments and documentation in English
4. **Export properly** - Add exports to the appropriate index files
5. **Include types** - Always export TypeScript types
6. **Use the naming conventions** - Follow the established file naming patterns

## License

Private - Internal use only.
