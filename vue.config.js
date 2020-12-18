const webpack = require('webpack');
const path = require('path');

module.exports = {
  css: {
    sourceMap: false,
    requireModuleExtension: true,
    loaderOptions: {
      css: {
        localsConvention: 'camelCaseOnly'
      },
      scss: {
        additionalData: `@import "~@/styles/mixin.scss";`
      }
    }
  },
  configureWebpack: {
    devtool: "source-map",
    plugins: [
      new webpack.DefinePlugin({
        APP_ENV: JSON.stringify(process.env.APP_ENV) || JSON.stringify('development')
      })
    ]
  },

  chainWebpack: config => {
    config.module
      .rule('svg')
      .exclude.add(path.resolve(__dirname, './src/icons'))
      .end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(path.resolve(__dirname, './src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end();
  }
};
