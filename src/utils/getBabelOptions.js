import { createRequire } from "module";
const require = createRequire(import.meta.url);
export default function getBabelOptions(dihogConfig, dev) {
  const response = {
    babelrc: false,
    presets: [
      [
        require.resolve("@babel/preset-env"),
        {
          modules: false,
          useBuiltIns: "usage",
          corejs: { version: "3", proposals: true },
        },
      ],
      require.resolve("@babel/preset-react"),
    ].concat(dihogConfig.extraBabelPresets || []),
    plugins: [
      require.resolve("@babel/plugin-transform-modules-commonjs"),
      require.resolve("babel-plugin-add-module-exports"),
      require.resolve("babel-plugin-react-require"),
      require.resolve("@babel/plugin-syntax-dynamic-import"),
      dev && require.resolve("react-refresh/babel"),
      require.resolve("@babel/plugin-transform-runtime"),
      [require.resolve("@babel/plugin-proposal-decorators"), { legacy: true }],
    ].concat(dihogConfig.extraBabelPlugins || []),
    cacheDirectory: true,
  };
  if (dihogConfig.djReactPatch) {
    response.plugins.push([
      require.resolve("babel-plugin-transform-react-jsx"),
      {
        pragma: "$djcreateElement", // default pragma is React.createElement
      },
    ]);
  }
  return response;
}
