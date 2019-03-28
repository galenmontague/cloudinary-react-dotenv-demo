// webpack plugins
const SplitChunksPlugin = require('webpack/lib/optimize/SplitChunksPlugin');
const Dotenv = require('dotenv-webpack');

// Want this to be one of the first things run in the run time cycle
// We are requiring this to be available in every part of the app (this is the first page and will always load first)
// Require means "must be run", import just makes it available to the page it is placed on.

module.exports = {
  entry: {
    app: ['./src/bootstrap.js'],
    vendor: './src/vendor.js',
  },

  resolve: {
    extensions: ['.js', '.scss'],

    modules: ['node_modules'],
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },

      {
        type: 'javascript/auto',
        test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
          publicPath: '/',
        },
      },

      {
        test: /\.(mp4|webm)$/,
        loader: 'url?limit=10000',
      },
    ],
  },

  plugins: [
    new Dotenv(),
    new SplitChunksPlugin({
      name: ['app', 'vendor'],
      minChunks: Infinity,
    }),
  ],
};
