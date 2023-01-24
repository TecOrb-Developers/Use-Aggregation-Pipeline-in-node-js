const path = require('path'),
  getConfig = (target = 'web') => {
    return {
      target,
      entry: './src/index.js',
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: target === 'node'
          ? 'datastore.node.js'
          : 'datastore.js',
        library: 'DataStore',
        libraryTarget: 'umd',
        libraryExport: 'default'
      },
      module: {
        rules: [{
          test: /\.js$/,
          include: /node_modules\/ramda/,
          use: {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              cacheDirectory: true,
              plugins: ['syntax-dynamic-import'],
              presets: [['env', { modules: false }]]
            }
          }
        }]
      },
      mode: 'none'
    };
  },
  NODE_CONFIG = getConfig('node'),
  BROWSER_CONFIG = getConfig('web');

module.exports = [NODE_CONFIG, BROWSER_CONFIG];
