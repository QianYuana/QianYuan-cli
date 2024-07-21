const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const version = require("./package.json").version;

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.js", // 项目入口文件
  output: {
    filename: "bundle.js", // 打包后的文件名
    path: path.resolve(__dirname, "dist"), // 打包后的目录
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // 正则表达式，匹配.js文件
        exclude: /node_modules/, // 排除node_modules目录
        use: {
          loader: "babel-loader", // 使用babel-loader
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      //打包html
      template: path.resolve(__dirname, 'public', 'index.html'),
      filename: "index.html",
      templateParameters: {
        publicPath:
          process.env === "production" ? "../bundle.js" : "../index.js",
      },
      inject: 'body'  // 确保脚本注入到 body 中
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "public"),
          to: path.resolve(__dirname, "public"),
          globOptions: {
            ignore: ["*/index.html"], // 忽略 index.html 文件
          },
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    hot: true,
    port: 9000,
  },
};
