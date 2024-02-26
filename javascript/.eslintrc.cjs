function getConfig(ruleStruct, keyName, defaultReturn) {
  if (!Object.keys(ruleStruct).includes(keyName)) {
    throw new Error(`${keyName} is not present in object`);
  }

  if (!ruleStruct.isEnabled) {
    return defaultReturn;
  }

  return ruleStruct[keyName];
}

const StandardConfig = {
  isEnabled: true,
  rules: {
    "sort-imports": ["error", { ignoreDeclarationSort: true }],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "no-use-before-define": ["off"],
    camelcase: ["error", { properties: "never", ignoreDestructuring: true }],
  },
};

// npm i -d eslint-plugin-unicorn
const UnicornConfig = {
  isEnabled: true,
  extends: ["plugin:unicorn/recommended"],
  rules: {
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

// npm i -d eslint-plugin-import
const ImportsPlugin = {
  isEnabled: false,
  extends: ["plugin:import/typescript", "plugin:import/errors", "plugin:import/warnings"],
  rules: {
    "import/newline-after-import": ["error"],
  },
};

// npm i -d eslint-plugin-unused-imports
const UnusedImportsConfig = {
  isEnabled: false,
  plugins: ["unused-imports"],
  rules: {
    "unused-imports/no-unused-imports": "error",
  },
};

// npm i -d typescript typescript-eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
const TypescriptConfig = {
  isEnabled: false,
  plugins: ["@typescript-eslint"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./tsconfig.json"], // extend config when plugin:@typescript-eslint is installed
  },
  rules: {
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-empty-function": ["error" /*, { allow: ["arrowFunctions"] }*/],
    "@typescript-eslint/strict-boolean-expressions": "error",
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: {
          attributes: false,
        },
      },
    ],
    "@typescript-eslint/explicit-function-return-type": ["error", { allowExpressions: true }],
  },
};

// npm i -d eslint-plugin-react
const ReactConfig = {
  isEnabled: false,
  extends: ["plugin:react/recommended"],
};

// npm i -d eslint-plugin-react-hooks
const ReactHooksConfig = {
  isEnabled: false,
  extends: ["plugin:react-hooks/recommended"],
};

// npm i -d eslint-plugin-prettier eslint-config-prettier
const PrettierConfig = {
  isEnabled: false,
  extends: ["prettier"],
};

const FinalConfig = {
  env: {
    browser: true,
    es2021: true,
  },
  plugins: [
    ...getConfig(TypescriptConfig, "plugins", []),
    ...getConfig(UnusedImportsConfig, "plugins", []),
  ],
  extends: [
    "eslint:recommended",
    ...getConfig(UnicornConfig, "extends", []),
    ...getConfig(ImportsPlugin, "extends", []),
    ...getConfig(TypescriptConfig, "extends", []),
    ...getConfig(ReactConfig, "extends", []),
    ...getConfig(ReactHooksConfig, "extends", []),
    ...getConfig(PrettierConfig, "extends", []),
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
  parser: getConfig(TypescriptConfig, "parser"),
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ...getConfig(TypescriptConfig, "parserOptions", {}),
  },

  ignorePatterns: ["dist/**"],
  rules: {
    ...getConfig(StandardConfig, "rules", {}),
    ...getConfig(ImportsPlugin, "rules", {}),
    ...getConfig(UnusedImportsConfig, "rules", {}),
    ...getConfig(TypescriptConfig, "rules", {}),
    ...getConfig(UnicornConfig, "rules", {}),
  },
};

module.exports = FinalConfig;
