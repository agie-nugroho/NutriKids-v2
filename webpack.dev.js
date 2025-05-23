// webpack.dev.js
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    static: "./dist",
    historyApiFallback: true, // penting untuk SPA routing
    port: 8110,
    open: true,
    hot: true,
  },
});
