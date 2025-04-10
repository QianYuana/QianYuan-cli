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
  const appDir = fs.realpathSync(cwd);
  // 获取当前文件的路径
  const __filename = fileURLToPath(import.meta.url);
  // 获取当前文件的目录
  const __dirname = path.dirname(__filename);
  // 辅助函数，用于解析相对于appDir的路径
  function resolveApp(...args) {
    return path.resolve(appDir, ...args);
  }

  // 尝试解析配置文件路径
  let configFilePath = null;
  const configFileNames = ["qianyuan.json", "qianyuan.js"];
  for (const fileName of configFileNames) {
    const potentialPath = resolveApp(fileName);
    if (fs.existsSync(potentialPath)) {
      configFilePath = potentialPath;
      break;
    }
  }

  // 其他路径
  const appSrc = resolveApp("src");
  const appNodeModules = resolveApp("node_modules");
  const ownNodeModules = path.resolve(__dirname, "../../node_modules");
  const publicPath = resolveApp("public");
  const dllManifest = resolveApp("public", "qianyuan-manifest.json");
  const dllOutputPath = publicPath;
  const ejsPath = resolveApp("src", "index.ejs");
  const appPackageJsonPath = resolveApp("package.json");

  // 注意：outputPath 在这里被设置为空字符串，你可能需要根据实际情况调整它

  return {
    appDir,
    appPath: appDir,
    appSrc,
    configFilePath, // 注意：这里可能是null，如果没有找到配置文件
    appNodeModules,
    ownNodeModules,
    publicPath,
    resolveApp: (...args) => resolveApp(...args), // 返回函数以便后续使用
    dllManifest,
    dllOutputPath,
    ejsPath,
    outputPath: "", // 根据需要调整
    appPackageJsonPath,
  };
}

export default paths;
