module.exports = {
  extends: [
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  ignorePatterns: [".eslintrc.js", "tailwind.config.js"],
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: ["import", "react", "@typescript-eslint"],
  rules: {
    "max-len": 0,
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: true,
      },
    ],
    "react/require-default-props": [
      "error",
      {
        // "forbidDefaultForRequired": true
        functions: "defaultArguments",
      },
    ],
  },
};
