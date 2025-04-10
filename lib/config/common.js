import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
import fs from "fs";
import p from "path";
import webpack from "webpack";
import CopyWebpackPlugin from "copy-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import getCSSLoader from "../utils/getCSSLoader.js";
import stringifyDefine from "../utils/stringifyDefine.js";
import getBabelOptions from "../utils/getBabelOptions.js";
import { cpus } from "os";
import { createRequire } from "module";
var require = createRequire(import.meta.url);
export var defaultDevtool = "eval-cheap-module-source-map";
export function getLoader(dihogConfig, paths, debug) {
  var babelOptions = getBabelOptions(dihogConfig, debug);
  var styleExclude = [paths.appNodeModules];
  var cssLoader = getCSSLoader(dihogConfig, debug);
  var styleLoader = debug ? "style-loader" : {
    loader: MiniCssExtractPlugin.loader
  };
  var lessVars = _objectSpread({}, dihogConfig.theme);

  // if (dihogConfig.djTheme) {
  //   // antd3.0升级样式覆盖
  //   lessVars = Object.assign(
  //     {
  //       "font-size-base": "12px",
  //       "font-size-lg": "14px",
  //       "blue-6": "#3771ff",
  //       "btn-height-base": "28px",
  //       "btn-height-lg": "28px",
  //       "input-height-base": "28px",
  //       "input-height-lg": "28px",
  //       "btn-shadow": "0 0 0 transparent",
  //       "btn-primary-shadow": "0 0 0 transparent",
  //       "btn-text-shadow": "0 0 0 transparent",
  //       "pagination-item-size": "28px",
  //       "text-color": "black",
  //       "padding-sm": "8px",
  //       "font-family":
  //         '"Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif',
  //     },
  //     dihogConfig.theme,
  //   );
  // if (dihogConfig.djTable !== false) {
  //   lessVars = {
  //     ...lessVars,
  //     ...{
  //       "input-height-lg": "28px",
  //       "table-header-bg": "rgb(120, 120, 157)",
  //       "table-header-color": "white",
  //       "table-row-hover-bg": "#D0DFFF",
  //       "table-padding-vertical": "8px",
  //       "table-padding-horizontal": "5px",
  //       "table-border-radius-base": "0px"
  //     }
  //   };
  // }
  // }
  return [
  //处理静态文件
  //添加mjs的过滤处理，antd4.x中使用了compute-scroll-into-view/dist/index.mjs的文件
  {
    exclude: [/\.(html|ejs)$/, /\.(js|jsx|mjs|cjs)$/, /\.(css|less|scss)$/, /\.json$/, /\.svg$/, /\.tsx?$/],
    // use: [{loader:"happypack/loader?id=happy_static"}],
    type: "asset",
    // 使用 asset 来处理
    parser: {
      dataUrlCondition: {
        maxSize: 3 * 1024 // 文件小于 3KB 使用 Data URL
      }
    },
    generator: {
      filename: "static/[name].[contenthash:8][ext][query]" // 生成的文件名
    }
  },
  //处理js|jsx文件
  {
    test: /\.(js|jsx)$/,
    include: [paths.appSrc],
    exclude: /node_modules/,
    use: [{
      loader: "thread-loader",
      options: {
        worker: cpus().length - 1 || 1
      }
    }, {
      loader: "babel-loader",
      options: babelOptions
    }]
  }, {
    test: /\.(ts|tsx)$/,
    include: [paths.appSrc],
    exclude: /node_modules/,
    use: [{
      loader: "thread-loader",
      options: {
        worker: cpus().length - 1 || 1
      }
    }, {
      loader: "babel-loader",
      options: babelOptions
    }, {
      loader: "ts-loader",
      options: {
        transpileOnly: true,
        happyPackMode: true
      }
    }]
  },
  //处理css，less，scss文件
  {
    test: /\.css$/,
    exclude: /node_modules/,
    use: [styleLoader].concat(_toConsumableArray(cssLoader.own))
  }, {
    test: /\.less$/,
    exclude: /node_modules/,
    use: [styleLoader].concat(_toConsumableArray(cssLoader.own), [{
      loader: "less-loader",
      options: {
        lessOptions: {
          modifyVars: lessVars,
          javascriptEnabled: true
        }
      }
    }])
  }, {
    test: /\.css$/,
    include: /node_modules/,
    use: [styleLoader].concat(_toConsumableArray(cssLoader.nodeModules))
  }, {
    test: /\.less$/,
    include: /node_modules/,
    use: [styleLoader].concat(_toConsumableArray(cssLoader.nodeModules), [{
      loader: "less-loader",
      options: {
        lessOptions: {
          modifyVars: lessVars,
          javascriptEnabled: true
        }
      }
    }])
  }, {
    test: /\.s[ac]ss$/i,
    // 匹配 .scss 或 .sass 文件
    use: [].concat(process.env === "production" ? [MiniCssExtractPlugin.loader,
    // 生产环境使用 MiniCssExtractPlugin.loader 替代 style-loader
    // 将 CSS 转化成 CommonJS 模块
    "css-loader",
    // 将 Sass 编译成 CSS
    "sass-loader"] : ["style-loader",
    // 将 JS 字符串生成为 style 节点
    "css-loader",
    // 将 Sass 编译成 CSS
    "sass-loader"])
  },
  // 处理 HTML 文件
  // {
  //   test: /\.html$/,
  //   type: "asset/resource", // 使用 asset/resource 来处理静态文件
  //   generator: {
  //     filename: "[name].[ext]", // 保持文件名和扩展名
  //   },
  // },

  // 处理 SVG 文件
  {
    test: /\.(png|svg|jpg|jpeg|gif)$/i,
    type: "asset/resource" // 使用 asset/resource 来处理静态文件
    // generator: {
    //   filename: "static/[name].[contenthash:8].[ext]", // 使用 contenthash 生成唯一的文件名
    // },
  }];
}
export function getResolve(dihogConfig, paths) {
  var alias = Object.keys(dihogConfig.alias || {}).reduce(function (total, next) {
    var finalPath = paths.resolveApp(dihogConfig.alias[next]);
    if (fs.existsSync(finalPath) || fs.existsSync("".concat(finalPath, ".js")) || fs.existsSync(p.resolve(finalPath, "index.js"))) {
      return _objectSpread(_objectSpread({}, total), {}, _defineProperty({}, next, finalPath));
    } else {
      return _objectSpread(_objectSpread({}, total), {}, _defineProperty({}, next, dihogConfig.alias[next]));
    }
  }, {});

  // if (dihogConfig.djDialog) {
  //   Object.assign(alias, {
  //     "antd/lib/modal": "@dianplusjs/dp-components/dist/esm/dialog",
  //   });
  // }

  return {
    resolve: {
      modules: ["node_modules", paths.appNodeModules, paths.ownNodeModules],
      extensions: [].concat(_toConsumableArray(dihogConfig.extraResolveExtensions || []), [".web.js", ".web.jsx", ".web.ts", ".web.tsx", ".js", ".json", ".jsx", ".ts", ".tsx"]),
      fallback: {
        crypto: require.resolve("crypto-browserify"),
        vm: require.resolve("vm-browserify"),
        stream: require.resolve("stream-browserify"),
        tty: require.resolve("tty-browserify")
      },
      alias: alias
    },
    resolveLoader: {
      modules: ["node_modules", paths.appNodeModules, paths.ownNodeModules]
    }
  };
}
export function getCommonPlugins(dihogConfig, paths, env) {
  var plugins = [];
  var define = {
    // "process.env.NODE_ENV": JSON.stringify(env)
  };
  if (dihogConfig.define) {
    define = _objectSpread(_objectSpread({}, define), stringifyDefine(dihogConfig.define));
  }
  if (dihogConfig.ignoreMomentLocale) {
    plugins.push(new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/
    }));
  }
  plugins.push(new webpack.DefinePlugin(define));
  plugins.push(new HtmlWebpackPlugin({
    template: p.resolve(paths.publicPath, "index.html"),
    // 确保路径正确
    filename: "index.html",
    templateParameters: {
      publicPath: env === "production" ? "../bundle.js" : p.resolve(paths.appSrc, "index.js") // 自定义参数
    },
    inject: "body" // 确保脚本注入到 body 中
  }));
  plugins.push(new CopyWebpackPlugin({
    patterns: [{
      from: paths.publicPath,
      to: paths.outputPath,
      globOptions: {
        ignore: ["**/index.html"] // 忽略 index.html 文件
      }
    }]
  }));
  // if (dihogConfig.djReactPatch) {
  //   plugins.push(
  //     new webpack.ProvidePlugin({
  //       $djcreateElement: "zord/lib/h",
  //     }),
  //   );
  // }
  // if (dihogConfig.djTheme) {
  //   //antd4.x以后base.less的使用方式发生变化，此全局替换方法已失效
  //   plugins.push(
  //     new webpack.NormalModuleReplacementPlugin(
  //       /antd[\/\\]lib[\/\\]style[\/\\]core[\/\\]base\.less/,
  //       (opt) => {
  //         console.log("替换antd base.less!!!");
  //         const request = opt.request.split("!");
  //         request.pop();
  //         const newPath = p.resolve(__dirname, "../replaces/base.less");
  //         // console.log('newPath', newPath)
  //         request.push(newPath);
  //         opt.request = request.join("!");
  //       },
  //     ),
  //   );
  // }
  return plugins;
}