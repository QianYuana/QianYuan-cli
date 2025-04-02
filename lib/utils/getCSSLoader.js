import _defineProperty from "@babel/runtime/helpers/defineProperty";
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
import autoprefixer from "autoprefixer";
export default function getCSSLoaders(config, isDebug) {
  var own = [];
  var nodeModules = [];
  var noCSSModules = [];
  var baseCSSOptions = {
    importLoaders: 1,
    sourceMap: isDebug
  };
  if (config.disableCSSModules) {
    own.push({
      loader: "css-loader",
      options: baseCSSOptions
    });
  } else {
    own.push({
      loader: "css-loader",
      options: _objectSpread(_objectSpread({}, baseCSSOptions), {}, {
        modules: {
          // 开启CSS Modules
          namedExport: false,
          // 使用默认导出
          exportLocalsConvention: "as-is",
          localIdentName: '[local]_[hash:base64:5]',
          // 自定义类名格式
          exportGlobals: true
        }
      })
    });
  }
  nodeModules.push({
    loader: "css-loader",
    options: baseCSSOptions
  });
  noCSSModules.push({
    loader: "css-loader",
    options: baseCSSOptions
  });
  var postcssLoader = {
    loader: "postcss-loader",
    options: {
      plugins: function plugins() {
        return [autoprefixer(config.autoprefixer || {
          overrideBrowserslist: [">1%", "last 4 versions", "Firefox ESR", "not ie < 9" // React doesn't support IE8 anyway
          ]
        })];
      },
      sourceMap: isDebug
    }
  };
  noCSSModules.push(postcssLoader);
  own.push(postcssLoader);
  nodeModules.push(postcssLoader);
  return {
    own: own,
    nodeModules: nodeModules,
    noCSSModules: noCSSModules
  };
}