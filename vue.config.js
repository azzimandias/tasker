const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //publicPath: '/tasker/'
  devServer: {
    proxy: {
      '/': {
        target: 'https://taskerlaravelapi.ru'
      },
    },
  },
})
