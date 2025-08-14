import path from 'path';
import packZip from "./pack-zip.js";

export default (env, options) => {
  const { mode = 'development' } = options;
  const rules = [
    {
      test: /\.(ttf)/,
      type: 'asset/resource',
    },
    {
      test: /\.js$/,
      type: 'javascript/auto',
      exclude: /node_modules/,
      use: ['html-tag-js/jsx/tag-loader.js', 'babel-loader'],
    },
    {
      test: /\.(sa|sc|c)ss$/,
      use: [
        'raw-loader',
        'postcss-loader',
        'sass-loader',
      ],
    }
  ];

  const main = {
    mode,
    entry: {
      main: './src/main.js',
      worker: './src/worker.js',
    },
    devServer: {
      // serve plugin.zip from root folder
      static: ".",
      port: 5500,
      hot: false,
      liveReload: false,
    },
    output: {
      path: path.resolve('dist'),
      filename: '[name].js',
      chunkFilename: '[name].js',
    },
    module: {
      rules,
    },
    plugins: [
      {
        apply: (compiler) => {
          compiler.hooks.afterDone.tap("pack-zip", packZip);
        },
      },
    ],
  };

  return [main];
}