module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    amd: true,
    node: true,
    mocha: true,
  },
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    jsx: true,
    useJSXTextNode: true,
  },
  plugins: ['@typescript-eslint', 'import', 'jest', 'react', 'prettier'],
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'plugin:jest/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react',
  ],
  rules: {
    strict: 0,
    'import/no-dynamic-require': 1,
    'import/order': 0,
    'react/jsx-filename-extension': 0,
    'import/no-dynamic-require': 1,
    'global-require': 1,
    'no-use-before-define': 0,
    'consistent-return': 0,
    'import/no-unresolved': 0,
    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': 1,
    'react/no-array-index-key': 0,
    'react/prefer-stateless-function': 1,
    'no-param-reassign': 1,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'react/prop-types': 0,
    'prefer-destructuring': 0,
    'react/destructuring-assignment': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'no-param-reassign': [
      2,
      {
        props: true,
        ignorePropertyModificationsFor: ['draft']
      },
    ],
    'import/prefer-default-export': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'no-script-url': 0,
    'prettier/prettier': [1, {
      singleQuote: true
    }],
    'import/extensions': 0,
    '@typescript-eslint/no-var-requires': 1,
    yoda: 0,
    'react/jsx-props-no-spreading': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/explicit-member-accessibility': 0,
    'import/no-extraneous-dependencies': 0,
    'react/jsx-filename-extension': ['error', {
      extensions: ['.jsx', '.tsx']
    }],
    'react/display-name': 0,
  },
  globals: {
    $: false,
    DOMAIN: false,
    API_DOMAIN: false,
    NEED_MOCK: false,
    IS_DEV: false,
    PREFIX_TARGET: false,
    NEEDTRACK: false,
    BAIDU_KEY: false,
    DEBUG_TOKEN: false,
    DEBUG_UID: false,
    CDN_DOMAIN: false,
  },
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    react: {
      version: 'detect', //Warning: React version not specified in eslint-plugin-react settings.
    },
  },
};