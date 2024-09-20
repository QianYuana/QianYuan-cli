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
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i, // 匹配 .scss 或 .sass 文件
        use: [].concat(
          process.env === "production"
            ? [
                MiniCssExtractPlugin.loader, // 生产环境使用 MiniCssExtractPlugin.loader 替代 style-loader
                // 将 CSS 转化成 CommonJS 模块
                "css-loader",
                // 将 Sass 编译成 CSS
                "sass-loader",
              ]
            : [
                "style-loader", // 将 JS 字符串生成为 style 节点
                "css-loader",
                // 将 Sass 编译成 CSS
                "sass-loader",
              ]
        ),
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource", // webpack 5 推荐的方式，替代 file-loader
        // 或者使用 file-loader
        // use: [
        //   {
        //     loader: 'file-loader',
        //     options: {
        //       name: '[name].[ext]', // 输出文件的名称
        //       outputPath: 'images/', // 输出目录
        //       publicPath: 'src/assets/images/', // 公开 URL 路径
        //     },
        //   },
        // ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
    alias: {
      public: path.resolve(__dirname, "public/"),
      untils: path.resolve(__dirname, "src/untils"),
      sassBase: path.resolve(__dirname, "src/untils/sass/base"),
      appStore: path.resolve(__dirname, "src/store"),
      components: path.resolve(__dirname, "src/components"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      //打包html
      template: path.resolve(__dirname, "public", "index.html"),
      filename: "index.html",
      templateParameters: {
        publicPath:
          process.env === "production" ? "../bundle.js" : "../index.js",
      },
      inject: "body", // 确保脚本注入到 body 中
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "public"),
          to: path.resolve(__dirname, "dist/public"),
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
    // 禁用错误遮罩层
    client: {
      overlay: false,
    },
    // 或者自定义错误遮罩层
    //  overlay: {
    //    errors: true,
    //    warnings: false,
    //  },
    compress: true,
    hot: true,
    port: 9000,
  },
};
