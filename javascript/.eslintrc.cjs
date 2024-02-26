module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  plugins: [
    // "@typescript-eslint", // npm i -d typescript-eslint
    // "unused-imports", // npm i -d eslint-plugin-unused-imports
  ],
  extends: [
    "eslint:recommended",
    "plugin:unicorn/recommended", // npm i -d eslint-plugin-unicorn

    // "plugin:react/recommended", // npm i -d eslint-plugin-react
    // "plugin:react-hooks/recommended",

    // "plugin:@typescript-eslint/recommended", // npm i -d typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin
    // "plugin:@typescript-eslint/recommended-requiring-type-checking",

    // "prettier", // npm i -d eslint-plugin-prettier eslint-config-prettier

    // "plugin:import/typescript", // npm i -d eslint-plugin-import
    // "plugin:import/errors",
    // "plugin:import/warnings",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  // parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    // project: ["./tsconfig.json"], // extend config when plugin:@typescript-eslint is installed
  },

  ignorePatterns: ["dist/**"],
  rules: {
    "sort-imports": ["error", { ignoreDeclarationSort: true }],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "no-use-before-define": ["off"],
    camelcase: ["error", { properties: "never", ignoreDestructuring: true }],
    // "import/newline-after-import": ["error"],

    // "unused-imports/no-unused-imports": "error",

    // "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    // "@typescript-eslint/explicit-module-boundary-types": "off",
    // "@typescript-eslint/no-non-null-assertion": "off",
    // "@typescript-eslint/no-empty-function": ["error" /*, { allow: ["arrowFunctions"] }*/],
    // "@typescript-eslint/strict-boolean-expressions": "error",
    // "@typescript-eslint/no-misused-promises": [
    //   "error",
    //   {
    //     checksVoidReturn: {
    //       attributes: false,
    //     },
    //   },
    // ],
    // "@typescript-eslint/explicit-function-return-type": ["error", { allowExpressions: true }],

    "unicorn/consistent-destructuring": "off",
    "unicorn/custom-error-definition": "off",
    "unicorn/no-array-for-each": "off",
    "unicorn/no-keyword-prefix": "off",
    "no-negated-condition": "off",
    "no-nested-ternary": "off",
    "unicorn/no-null": "off",
    "unicorn/no-static-only-class": "off",
    "unicorn/no-unused-properties": "off",
    "unicorn/prefer-dom-node-text-content": "off",
    "unicorn/prefer-json-parse-buffer": "off",
    "unicorn/prefer-query-selector": "off",
    "unicorn/prevent-abbreviations": "off",
    // Turned off because we can't distinguish `widow.postMessage` and `{Worker,MessagePort,Client,BroadcastChannel}#postMessage()`
    // See #1396
    "unicorn/require-post-message-target-origin": "off",
    "unicorn/string-content": "off",
  },
};
