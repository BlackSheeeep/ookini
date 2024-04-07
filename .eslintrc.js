// 仅 commit 时会用
const commitRules = {
  "no-alert": 2,
  "no-debugger": 2,
  "no-console": [
    "error",
    {
      allow: ["warn", "error"],
    },
  ],
  "no-unused-vars": 2,
};

module.exports = {
  root: true,
  parserOptions: {
    project: "./tsconfig.json",
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  globals: {
    React: true,
    ReactDOM: true,
    _: true,
    m: true,
    moment: true,
    mobx: true,
    RUNTIME_NODE_ENV: true,
    RUNTIME_STATIC_DIR: true,
    RUNTIME_APP_NAME: true,
    sessionWorker: true,
  },
  rules: {
    "@typescript-eslint/consistent-type-assertions": 0,
    "@typescript-eslint/member-ordering": 0, // 关闭对类中排序的强制要求
    "prefer-destructuring": 0, // 关闭对结构赋值的强制要求
    // @typescript-eslint/naming-convention 暂不针对 CodeCC 做更改
    // "@typescript-eslint/naming-convention": [
    //   2,
    //   {
    //     selector: "variable",
    //     format: ["camelCase", "PascalCase", "UPPER_CASE"],
    //   },
    //   { selector: "function", format: ["camelCase", "PascalCase"] },
    //   { selector: "typeLike", format: ["PascalCase"] },
    //   {
    //     selector: "enumMember",
    //     format: ["UPPER_CASE", "camelCase", "PascalCase"],
    //   },
    //   { selector: "enum", format: ["UPPER_CASE", "PascalCase"] },
    // ],
    "@typescript-eslint/no-misused-promises": 0,
    // "@typescript-eslint/prefer-optional-chain": 1, // 首选可选连，改为 warning
    // tencent 的 prettier 配置是旧版本的，有些字段已经废弃了，参考其配置后这里直接做个覆盖即可
    // "prettier/prettier": [
    //   "error",
    //   {},
    //   {
    //     fileInfoOptions: {
    //       withNodeModules: false,
    //     },
    //   },
    // ],
    // 测试分支暂时关闭检查
    ...(process.env.ESLINT_ENV === "commit"
      ? commitRules
      : {
          "no-alert": 1,
          "no-debugger": 1,
          "no-console": [
            1,
            {
              allow: ["warn", "error"],
            },
          ],
          "no-unused-vars": 1,
        }),
  },
  env: {
    browser: true,
    node: true,
  },
  settings: {
    react: {
      version: require("./package.json").dependencies.react,
    },
  },
};
