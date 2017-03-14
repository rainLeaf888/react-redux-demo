/*
* @Author: kyy
* @Date:   2017-03-07 10:58:23
* @Last Modified by:   kyy
* @Last Modified time: 2017-03-07 15:12:58
*/
var path = require("path");
var webpack = require("webpack");
var SRC_PATH = path.normalize(__dirname + "/../src");
var OUT_PUT_PATH = path.normalize(__dirname + "/../dist");

function main() {
  let entryFileUrl = "./boot/viewport.js";
  const config = {
    context: SRC_PATH, // 根目或绝对路径
    entry: entryFileUrl, // 入口
    output: { // 输出
      filename: "[name].bundle.js",
      path: OUT_PUT_PATH // 绝对路径
    },
    module: {
      rules: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: SRC_PATH,
        use: "babel-loader"
      }, {
        test: /\.css$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }]
      }, {
        test: /\.(gif|png|svg|jpe?g)(\?.*)?$/,
        use: "url-loader",
        query: {
          limit: 10240, //10k下图片data url
          name: "image/[hash].[ext]"
        }
      }]
    },
    plugins: [
      new webpack.BannerPlugin({banner: 'Banner build', raw: true, entryOnly: true}),
      /*new webpack.UglifyJsPlugin({
        sourceMap: true
      })*/
    ],
    debug: true,
    devtool: "source-map"
  };
}
module.exports = main;