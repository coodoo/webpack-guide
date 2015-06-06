var Path = require("path");
// var webpack = require('webpack');

//
module.exports = {

  // 將來生成 bundle.js 
  entry: {
    bundle: [ "./client/app.js"]
  },

  // 主要是啟動 babel-loader
  module: {

    loaders: [
      {
        test: /\.jsx?$/,
        exclude: [ /node_modules/, /vendor/ ],
        loaders: [ 'babel-loader' ]
      },

      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }
    ],

    noParse: ['react', 'jquery', 'bootstrap']
  },

  output: {
    path: Path.resolve(__dirname, "./build"),

    // 有 multiple entry point 時，這裏一定要用變數寫法，不然多個產出 js file 會彼此覆寫
    filename: "[name].js",
  },

  // 生成 sourcemaps
  // 這是給 webpack-dev-server 看的參數
  // 一般生成 production 檔案時會用 webpack -p 就不會吐出 sourcemaps
  devtool: 'eval', //'#source-map'

  // 這是 webpack-dev-server 會看的 config
  // 有加這段的話，平常在 cli 跑 $ webpack-dev-server 時就不需另外加 --content-base .build/ 這參數
  devServer: {

    // 要寫絕對路徑
    contentBase: Path.resolve(__dirname, "./build"),

    // 下面三個永遠存在
    filename: '[name].js',
    publicPath: '/',
    outputPath: '/',

    // 啟動 livereload 功能
    // 等於是 cli 時有無下 --inline 參數
    inline: true,

    // webpack-dev-middleware options
    quiet: true,  // 設為 true 即不會顯示太多 debug 訊息，讓 console 乾淨一點
    noInfo: true,
    lazy: false,  // false 是啟動 watch mode，有變化即自動編譯
    stats: { colors: true, cached: false, cachedAssets: false },

  }

};
