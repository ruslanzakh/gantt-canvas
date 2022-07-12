module.exports = {
 
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "tsconfig.json",
        sourceType: "module",
    },
    plugins: [
        "@typescript-eslint",
        "prettier"
    ],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
    ],
    root: true,
    env: {
        browser: true,
        es2021: true
    },
    ignorePatterns: ["node_modules/*", "dist/*", "*.test.js"],
    rules: {
        "prefer-const": "off",
        "@typescript-eslint/ban-ts-comment": "off",
    },
 
};
