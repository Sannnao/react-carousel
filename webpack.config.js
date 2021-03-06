const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = (env) => {
  const common = {
    entry: './src/index.js',
    output: {
      filename: 'main.bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: ['file-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/index.html'),
      }),
      new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    ],
  }

  const dev = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      contentBase: path.resolve(__dirname, 'dist'),
      port: 9000,
      hot: true,
      open: true,
    },
  };

  const prod = {
    mode: 'production'
  }

  if (env.production) {
    return {...common, ...prod};
  } else if (env.development) {
    common.plugins.push(new ReactRefreshWebpackPlugin());
    return {...common, ...dev}
  }
};
