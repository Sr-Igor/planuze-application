import { config } from "@repo/eslint-config/base";

export default [
  ...config,
  {
    ignores: ["scripts/**/*.mjs", "dist/**/*", "node_modules/**/*"],
  },
  {
    rules: {
      "prefer-regex-literals": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];
