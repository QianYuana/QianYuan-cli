import { existsSync, readFileSync } from "fs";
import stripJsonComments from "strip-json-comments";
import parseJSON from "parse-json-pretty";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

/**
 * 获取qianyuan.json配置
 * @param {string} cwd 当前路径
 * @returns {object | boolean} 如果成功返回qianyuan.json配置对象，如果失败直接返回false
 * {
 *   entry: string | string[] | object,
 *   outputPath: string,
 *   extraBabelPlugins: array,
 *   extraBabelPresets: array,
 *   alias: object,
 *   externals: object,
 *   extraResolveExtensions: string[],
 *   hash: boolean,
 *   library: string,
 *   libraryTarget: string,
 *   dllPlugins: object,
 *   autoprefixer: object,
 *   ignoreMomentLocale: boolean
 * }
 */
export default function getConfig(path, appPackageJsonPath) {
  //判断配置文件是否存在
  if (existsSync(path)) {
    //读取qianyuan.json文件内容，并移除注释，然后转化为json对象
    // const config = parseJSON(stripJsonComments(readFileSync(path, 'utf8')));
    const config = require(require.resolve(path));
    //如果配置文件中不存在outputPath，则制定为dist
    if (!config.outputPath) {
      config.outputPath = "dist";
    }
    //如果不存在entry，指定默认路径为src/modules/**/index.js
    if (!config.entry) {
      config.entry = "src/index.js";
    }

    if (!config.hash) {
      config.hash = false;
    }

    if (!config.library) {
      config.library = null;
    }

    if (!config.devServer) {
      config.devServer = {};
    }

    config.devServer = {
      ...{
        port: 8080,
        // templates: []
      },
      ...config.devServer,
    };

    if (typeof config.disableCSSModules === "undefined") {
      config.disableCSSModules = false;
    }

    if (existsSync(appPackageJsonPath)) {
      const pkg = parseJSON(
        stripJsonComments(readFileSync(appPackageJsonPath, "utf8"))
      );
      if (pkg.sysCode) config.sysCode = pkg.sysCode;
      if (pkg.menuSysCode) config.menuSysCode = pkg.menuSysCode;
      if (pkg.version) config.sysVersion = pkg.version;
      if (pkg.devopsCallback) config.devopsCallback = pkg.devopsCallback;
    }

    return config;
  }
  return false;
}
