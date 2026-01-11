import { config } from "@repo/eslint-config/base";

/** @type {import("eslint").Linter.Config} */
export default [
  ...config,
  {
    ignores: ["scripts/**/*.mjs"],
  },
  {
    rules: {
      "prefer-regex-literals": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];
