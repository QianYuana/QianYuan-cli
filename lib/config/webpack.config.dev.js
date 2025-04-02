import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
import path from "path";
import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import { defaultDevtool, getResolve, getLoader, getCommonPlugins } from "./common.js";
export default function applyWebpackConfig(dihogConfig, paths, argv) {
  var output = {
    filename: "bundle.js",
    // chunkFilename: `async/js/[name].[chunkhash].js`,
    // publicPath: "/",
    path: path.resolve(paths.appDir, "dist")
  };
  var debug = argv.debug;
  var env = debug ? "development" : "production";
  console.log("devServer---配置项", dihogConfig);
  return _objectSpread(_objectSpread({
    mode: "development",
    entry: dihogConfig.entry["./src/index"],
    output: output,
    cache: {
      type: "filesystem"
    },
    devtool: defaultDevtool
  }, getResolve(dihogConfig, paths)), {}, {
    module: {
      rules: getLoader(dihogConfig, paths, true)
    },
    plugins: [new webpack.ProgressPlugin()].concat(_toConsumableArray(getCommonPlugins(dihogConfig, paths, env)), [new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "async/style/[id].[contenthash:12].css"
    }), new ReactRefreshWebpackPlugin({
      overlay: false
    })]),
    // externals: dihogConfig.externals,
    devServer: {
      allowedHosts: "all",
      client: {
        overlay: false
        // progress: false,
      },
      compress: true,
      // devMiddleware: {
      //   publicPath: `/`,
      // },
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      hot: true,
      open: true,
      port: dihogConfig.devServer.port,
      // setupMiddlewares: (middlewares, devServer) => {
      //   load_proxy(null, devServer.app, dihogConfig.proxy_hostname);
      //   auth2_login(devServer.app, devServer.app, match_filepath, dihogConfig);
      //   return middlewares;
      // },
      "static": {
        directory: paths.publicPath
        // watch: {
        //   ignored: [path.resolve(process.cwd(), "./public/**/*.{html,ftl}")],
        // },
      }
    }
  });
}