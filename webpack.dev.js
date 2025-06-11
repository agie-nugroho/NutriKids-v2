// webpack.dev.js
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    allowedHosts: 'all',
    host: '0.0.0.0',  
    static: "./dist",
    historyApiFallback: true, 
    port: 8110,
    open: true,
    hot: true,
  },
});
