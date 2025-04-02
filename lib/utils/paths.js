import fs, { realpathSync } from "fs";
import path, { resolve } from "path";
import { fileURLToPath } from "url";

/**
 * 获取各种路径的绝对地址
 * @param { string } cwd 当前路径
 * @returns {object} {appDir, configFilePath, appNodeModules, publicPath, resolveApp}
 */
function paths(cwd) {
  // 获取绝对路径的cwd
  var appDir = fs.realpathSync(cwd);
  // 获取当前文件的路径
  var __filename = fileURLToPath(import.meta.url);
  // 获取当前文件的目录
  var __dirname = path.dirname(__filename);
  // 辅助函数，用于解析相对于appDir的路径
  function _resolveApp() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return path.resolve.apply(path, [appDir].concat(args));
  }

  // 尝试解析配置文件路径
  var configFilePath = null;
  var configFileNames = ["qianyuan.json", "qianyuan.js"];
  for (var _i = 0, _configFileNames = configFileNames; _i < _configFileNames.length; _i++) {
    var fileName = _configFileNames[_i];
    var potentialPath = _resolveApp(fileName);
    if (fs.existsSync(potentialPath)) {
      configFilePath = potentialPath;
      break;
    }
  }

  // 其他路径
  var appSrc = _resolveApp("src");
  var appNodeModules = _resolveApp("node_modules");
  var ownNodeModules = path.resolve(__dirname, "../../node_modules");
  var publicPath = _resolveApp("public");
  var dllManifest = _resolveApp("public", "qianyuan-manifest.json");
  var dllOutputPath = publicPath;
  var ejsPath = _resolveApp("src", "index.ejs");
  var appPackageJsonPath = _resolveApp("package.json");

  // 注意：outputPath 在这里被设置为空字符串，你可能需要根据实际情况调整它

  return {
    appDir: appDir,
    appSrc: appSrc,
    configFilePath: configFilePath,
    // 注意：这里可能是null，如果没有找到配置文件
    appNodeModules: appNodeModules,
    ownNodeModules: ownNodeModules,
    publicPath: publicPath,
    resolveApp: function resolveApp() {
      return _resolveApp.apply(void 0, arguments);
    },
    // 返回函数以便后续使用
    dllManifest: dllManifest,
    dllOutputPath: dllOutputPath,
    ejsPath: ejsPath,
    outputPath: "",
    // 根据需要调整
    appPackageJsonPath: appPackageJsonPath
  };
}
export default paths;