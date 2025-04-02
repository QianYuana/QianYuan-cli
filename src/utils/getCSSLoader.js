import autoprefixer from "autoprefixer";
export default function getCSSLoaders(config, isDebug) {
  const own = [];
  const nodeModules = [];
  const noCSSModules = [];

  const baseCSSOptions = {
    importLoaders: 1,
    sourceMap: isDebug,
  };

  if (config.disableCSSModules) {
    own.push({
      loader: "css-loader",
      options: baseCSSOptions,
    });
  } else {
    own.push({
      loader: "css-loader",
      options: {
        ...baseCSSOptions,
        modules: {
          // 开启CSS Modules
          namedExport: false, // 使用默认导出
          exportLocalsConvention:"as-is",
          localIdentName: '[local]_[hash:base64:5]', // 自定义类名格式
          exportGlobals:true,
        },
      },
    });
  }
  nodeModules.push({
    loader: "css-loader",
    options: baseCSSOptions,
  });
  noCSSModules.push({
    loader: "css-loader",
    options: baseCSSOptions,
  });

  const postcssLoader = {
    loader: "postcss-loader",
    options: {
      plugins: function () {
        return [
          autoprefixer(
            config.autoprefixer || {
              overrideBrowserslist: [
                ">1%",
                "last 4 versions",
                "Firefox ESR",
                "not ie < 9", // React doesn't support IE8 anyway
              ],
            },
          ),
        ];
      },
      sourceMap: isDebug,
    },
  };

  noCSSModules.push(postcssLoader);
  own.push(postcssLoader);
  nodeModules.push(postcssLoader);

  return {
    own,
    nodeModules,
    noCSSModules,
  };
}
