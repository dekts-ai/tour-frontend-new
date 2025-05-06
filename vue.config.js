const fs = require('fs')
module.exports = {
  chainWebpack: config => {
    config.plugin('define').tap(args => {
      args[0].__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = JSON.stringify(false);
      args[0].__VUE_PROD_DEVTOOLS__ = JSON.stringify(false);
      args[0].__VUE_OPTIONS_API__ = JSON.stringify(true); // Set to false if using only Composition API
      return args;
    });
  },
  // // uncommemnt to run in ssl on loncal
  // devServer: {
  //   host: 'localhost',
  //   port: 5500,
  //   https: {
  //     key: fs.readFileSync('./certs/localhost-key.pem'),
  //     cert: fs.readFileSync('./certs/localhost.pem'),
  //   },
  //   allowedHosts: "all",
  // }
}