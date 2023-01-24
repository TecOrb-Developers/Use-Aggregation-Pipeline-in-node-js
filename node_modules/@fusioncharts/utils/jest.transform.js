module.exports = require('babel-jest').createTransformer({
  presets: ['env'],
  plugins: ['syntax-dynamic-import']
});
