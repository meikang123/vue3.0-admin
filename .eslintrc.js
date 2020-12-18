const path = require('path');

module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
  },
  env: {
    browser: true,
    node: true
  },
  plugins: [
    '@typescript-eslint',
  ],
  root: true,
  settings: {
    'import/resolver': {
      webpack: {
        config: path.join(__dirname, './node_modules/@vue/cli-service/webpack.config.js')
      }
    }
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    'airbnb-base'
  ],
  rules: {
    'import/extensions': ['error', 'always', {
      js: 'never',
      ts: 'never',
      tsx: 'never'
    }],
    'no-unused-vars': 'off',
    'object-curly-newline': 'off',
    'symbol-description': 'off',
    "global-require": 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-extra-label': 'error', // 禁用不必要的标签
    'default-case': 'error', // switch 必须写 default
    'no-empty-function': 'error', // 禁止空函数
    'no-useless-return': 'error', // 禁止多于的 return
    'block-spacing': 'error', // 括号/花括号前后有空格
    'brace-style': 'error', // 定义函数 花括号之后换行
    'camelcase': 'off',
    'indent': ['error', 2, { 'SwitchCase': 1 }], // 两个空格的缩进
    'no-unneeded-ternary': 'error', // 禁止可以表达为更简单结构的三元操作符
    'space-before-function-paren': 'error', // 禁止方法左括号前有空格
    'space-infix-ops': 'error', // 运算符周围需要空格
    'arrow-parens': ['error','as-needed'], // 箭头函数参数必须使用括号圈起来
    'no-confusing-arrow': ['error', { allowParens: true }], // 禁止在可能与比较操作符相混淆的地方使用箭头函数
    'no-duplicate-imports': 'off', // 禁止重复 import
    'no-var': 'error', // 强制使用 let / const 替换 var
    'object-shorthand': ['error', 'always'], // 使用简写 例: foo: { x: x }  ==>  foo: { x }
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }], // 除了 for 循环 其他地方
    'no-unused-expressions': 'off',
    'no-shadow': 'off',
    'class-methods-use-this': 'off',
    'comma-dangle': ['error', 'never'],
    'no-trailing-spaces': ['error', {'skipBlankLines': true}],
    'vue/html-self-closing': 'off',
    'vue/one-component-per-file': 'off',
    'vue/max-attributes-per-line': ['error', {
      singleline: 8,
      multiline: {
        max: 8,
        allowFirstLine: false,
      },
    }],
    'prefer-object-spread': 'off',
    'vue/require-default-prop': 'off',
    'vue/require-prop-types': 'off',
    'vue/name-property-casing': 'off',
    'vue/no-deprecated-v-on-native-modifier': 'off',
    'vue/attributes-order': 'off',
    'no-param-reassign': 'off',
    'consistent-return': 'off',
    "no-case-declarations": 'off',
    'max-len': 'off',
    'no-bitwise': 'off',
    'import/prefer-default-export': 'off',
    'no-use-before-define': 'off',
    'no-underscore-dangle': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'import/no-named-as-default': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off'
  }
};
