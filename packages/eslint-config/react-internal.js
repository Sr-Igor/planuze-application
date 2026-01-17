import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

import { config as baseConfig } from "./base.js";

/**
 * A custom ESLint configuration for libraries that use React.
 *
 * @type {import("eslint").Linter.Config[]} */
export const config = [
  ...baseConfig,
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  importPlugin.flatConfigs.recommended,
  pluginReact.configs.flat.recommended,
  {
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
  },
  {
    plugins: {
      "react-hooks": pluginReactHooks,
    },
    settings: { react: { version: "detect" } },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      // React scope no longer necessary with new JSX transform.
      "no-unused-vars": "off",
      "react/react-in-jsx-scope": "off",
      "react-hooks/exhaustive-deps": "off",
      "react/display-name": "off",
      "react/prop-types": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "import/no-unresolved": "off",
      "import/no-named-as-default": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "react/no-unescaped-entities": "off",
      "react/no-unknown-property": "off",
      "tailwindcss/no-unnecessary-arbitrary-value": "off",
      "tailwindcss/classnames-order": "off",
      "import/named": "off",
      "import/no-named-as-default-member": "off",
      "newline-before-return": "off",
      "import/namespace": "off",
      "react-hooks/exhaustive-deps": "off",
    },
  },
];
