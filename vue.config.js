const path = require('path');

const development = process.env.NODE_ENV === 'development';

module.exports = {
  publicPath: './',
  outputDir: 'docs',
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, 'src'),
      }
    },
  },
  // TODO: 그다지 사용할 일이 없어 보이지만 만약 많이 사용하게 된다면 주석풀기
  // css: {
  //   loaderOptions: {
  //     sass: {
  //       additionalData: `
  //         @import "~@/scss/mixins";
  //         @import "~@/scss/variables";
  //       `,
  //     },
  //   },
  // },
};
