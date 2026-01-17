# Templates - Package Generator

This directory contains Plop.js templates to generate new packages in the monorepo.

## Usage

To create a new package, run:

```bash
pnpm plop:package
```

The generator will ask some questions:

1. **Package name**: Name without the `@repo/` prefix (e.g., `my-package`)
2. **Package type**: 
   - TypeScript Library (without React)
   - React Library
   - Configuration (eslint, typescript, etc)
3. **ESLint configuration**: Choose between `base`, `react-internal`, or `next-js`
4. **Use path alias (#/*)**: Whether the package should use the `#` alias for internal imports
5. **Have custom exports**: Whether the package.json should have a custom `exports` section

## Generated files

The generator creates the following structure:

```
packages/{package-name}/
├── package.json
├── tsconfig.json
├── eslint.config.mjs
└── src/
    └── index.ts
```

## Templates

The templates are located in `templates/package/` and use Handlebars to generate files based on user responses.
