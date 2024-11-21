const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //publicPath: '/tasker/'
  devServer: {
    proxy: {
      '/api': {
        target: 'https://taskerlaravelapi.ru'
      },
    },
  },
})
