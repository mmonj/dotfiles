module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:unicorn/recommended"],
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
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  // ignorePatterns: ["dist/**", "dist-dev/**"],

  // parser: "@typescript-eslint/parser",
  // parserOptions: {
  //   project: ["./tsconfig.json"],
  // },
  // plugins: ["@typescript-eslint", "unused-imports"],

  plugins: ["unicorn"],
  rules: {
    // "sort-imports": ["error", { ignoreDeclarationSort: true }],
    "linebreak-style": ["error", "windows"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "import/newline-after-import": ["error"],

    /*
     *
     Begin Unicorn rule overrides
     *
     * */
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
