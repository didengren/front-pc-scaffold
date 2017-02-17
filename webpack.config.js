const webpack = require('webpack');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var path = require('path');
var fs = require('fs');
var srcDir = path.resolve(process.cwd(), 'src');

//获取多页面的每个入口文件，用于配置中的entry
function getEntry() {
    var jsPath = path.resolve(srcDir, 'assets/js');
    var dirs = fs.readdirSync(jsPath);
    var matchs = [], files = {};
    dirs.forEach(function (item) {
        matchs = item.match(/(.+)\.js$/);
        console.log(matchs);
        if (matchs) {
            files[matchs[1]] = path.resolve(srcDir, 'assets/js', item);
        }
    });
    console.log(JSON.stringify(files));
    return files;
}

module.exports = {
  entry: getEntry(),
  output: {
    path: path.join(__dirname, "./dist/js/"),
    publicPath: "./dist/js/",
    filename: '[name].js'
  },

  //申明外部依赖
  externals: {
    jquery: "window.$"
  },

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),//用来检测相似的文件或者文件中重复的内容，然后将这些冗余在output中消除掉
    new webpack.optimize.UglifyJsPlugin({
     compress: {
       warnings: false,
     },
     output: {
       comments: false,
     },
    }),//压缩和丑化

    //使jquery变成全局变量，不用require导入jquery
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),//直接定义第三方库

    // new CommonsChunkPlugin({
    //   name: "commons",
    //   // chunk名

    //   filename: "commons.js",
    //   // 生成的文件名

    //    minChunks: 2,
    //   // 最小引用次数，一个依赖最少被引入这个次数才会被加到公共的chunk中

    //   chunks: ["bootstrap", "index", "main"]
    //   // 指定这个chunk是由哪些页面构成的
    // })//定义公共chunk

  ]
};