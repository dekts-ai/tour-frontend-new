const fs = require('fs')
module.exports = {
  devServer: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: 'all',
    client: {
      webSocketURL: 'auto://0.0.0.0:0/ws'
    }
  }
}
