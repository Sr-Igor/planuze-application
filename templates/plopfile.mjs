import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, "..");

export default function (plop) {

  plop.setPlopfilePath(projectRoot);

  plop.setHelper("eq", function (a, b) {
    return a === b;
  });

  plop.setHelper("or", function (a, b) {
    return a || b;
  });

  plop.setHelper("ne", function (a, b) {
    return a !== b;
  });

  plop.setGenerator("package", {
    description: "Create a new package in the monorepo",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Package name (without @repo/):",
        validate: (value) => {
          if (!value) return "Name is required";
          if (!/^[a-z0-9-]+$/.test(value)) {
            return "Name must contain only lowercase letters, numbers and hyphens";
          }
          return true;
        },
      },
      {
        type: "list",
        name: "type",
        message: "Package type:",
        choices: [
          { name: "TypeScript Library (without React)", value: "library" },
          { name: "React Library", value: "react" },
          { name: "Configuration (eslint, typescript, etc)", value: "config" },
        ],
      },
      {
        type: "list",
        name: "eslintConfig",
        message: "ESLint configuration:",
        choices: [
          { name: "base - For TypeScript libraries without React", value: "base" },
          { name: "react-internal - For React libraries", value: "react-internal" },
          { name: "next-js - For Next.js applications", value: "next-js" },
        ],
        default: (answers) => {
          if (answers.type === "react") return "react-internal";
          if (answers.type === "config") return "base";
          return "base";
        },
        when: (answers) => answers.type !== "config",
      },
      {
        type: "confirm",
        name: "usePathAlias",
        message: "Use path alias (#/*)?",
        default: true,
        when: (answers) => answers.type !== "config",
      },
      {
        type: "confirm",
        name: "hasExports",
        message: "Have custom exports in package.json?",
        default: false,
        when: (answers) => answers.type !== "config",
      },
    ],
    actions: (data) => {
      const templateBase = join(__dirname, "package");
      
      const actions = [
        {
          type: "add",
          path: "packages/{{kebabCase name}}/package.json",
          templateFile: join(templateBase, "package.json.hbs"),
        },
        {
          type: "add",
          path: "packages/{{kebabCase name}}/eslint.config.mjs",
          templateFile: join(templateBase, "eslint.config.mjs.hbs"),
        },
        {
          type: "add",
          path: "packages/{{kebabCase name}}/tsconfig.json",
          templateFile: join(templateBase, "tsconfig.json.hbs"),
        },
        {
          type: "add",
          path: "packages/{{kebabCase name}}/src/index.ts",
          templateFile: join(templateBase, "src", "index.ts.hbs"),
        },
      ];

      return actions;
    },
  });
}
