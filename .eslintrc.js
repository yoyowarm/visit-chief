const path = require("path")

module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "settings": {
      "import/resolver": {
        "webpack": {
          "config" : {
            "resolve": {
              "alias": {
                "src": path.resolve(__dirname, 'src'),
                "assets": path.resolve(__dirname, 'src/assets'),
                "api": path.resolve(__dirname, 'src/api'),
                "utils": path.resolve(__dirname, 'src/utils')
              }
            }
          }
        }
      }
    }
  },
  globals: {
    'CONFIG': true
  }
}
