import path from "path";
import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import {
  defaultDevtool,
  getResolve,
  getLoader,
  getCommonPlugins,
} from "./common.js";

export default function applyWebpackConfig(dihogConfig, paths, argv) {
  const output = {
    filename: `bundle.js`,
    // chunkFilename: `async/js/[name].[chunkhash].js`,
    // publicPath: "/",
    path: path.resolve(paths.appDir, "dist"),
  };
  const { debug } = argv;
  const env = debug ? "development" : "production";
  console.log("devServer---配置项", dihogConfig);
  return {
    mode: "development",
    entry: dihogConfig.entry["./src/index"],
    output,
    cache: {
      type: "filesystem",
    },
    devtool: defaultDevtool,
    ...getResolve(dihogConfig, paths),
    module: {
      rules: getLoader(dihogConfig, paths, true),
    },
    plugins: [
      new webpack.ProgressPlugin(),
      ...getCommonPlugins(dihogConfig, paths, env),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "async/style/[id].[contenthash:12].css",
      }),
      new ReactRefreshWebpackPlugin({ overlay: false }),
    ],
    // externals: dihogConfig.externals,
    devServer: {
      allowedHosts: "all",
      client: {
        overlay: false,
        // progress: false,
      },
      compress: true,
      // devMiddleware: {
      //   publicPath: `/`,
      // },
      headers: { "Access-Control-Allow-Origin": "*" },
      hot: true,
      open: true,
      port: dihogConfig.devServer.port,
      // setupMiddlewares: (middlewares, devServer) => {
      //   load_proxy(null, devServer.app, dihogConfig.proxy_hostname);
      //   auth2_login(devServer.app, devServer.app, match_filepath, dihogConfig);
      //   return middlewares;
      // },
      static: {
        directory: paths.publicPath,
        // watch: {
        //   ignored: [path.resolve(process.cwd(), "./public/**/*.{html,ftl}")],
        // },
      },
    },
  };
}
