/* eslint-disable no-useless-computed-key */

const { override, addWebpackAlias, addBabelPlugins } = require('customize-cra');
const path = require('path');
module.exports = override(
  ...addBabelPlugins([
    '@babel/plugin-proposal-logical-assignment-operators',
    { allowNamespaces: true }
  ]),
  addWebpackAlias({
    ['@']: path.resolve(__dirname, './src')
  }),
);
