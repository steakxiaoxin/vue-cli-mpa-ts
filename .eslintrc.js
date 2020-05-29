// module.exports = {
//   root: true,
//   env: {
//     node: true
//   },
//   extends: [
//     "plugin:vue/essential",
//     "eslint:recommended",
//     "@vue/typescript/recommended",
//     "@vue/prettier",
//     "@vue/prettier/@typescript-eslint"
//   ],
//   parserOptions: {
//     ecmaVersion: 2020
//   },
//   rules: {
//     "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
//     "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off"
//   }
// };
module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: ['plugin:vue/essential', '@vue/prettier', '@vue/typescript'],
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
}
