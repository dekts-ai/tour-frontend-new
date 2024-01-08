const fs = require('fs')
module.exports = {
  devServer: {
    host: 'localhost',
    port: 5500,
    https: {
      key: fs.readFileSync('./certs/localhost-key.pem'),
      cert: fs.readFileSync('./certs/localhost.pem'),
    },
    allowedHosts: "all",

    // proxy: {
    //     '^/api': {
    //       target: 'http://localhost:1337',
    //       changeOrigin: true
    //     },
    //   }

  }
}