import yargs from "yargs";
import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import getPaths from "./utils/paths.js";
import getConfig from "./utils/getConfig.js";
import getEntry from "./utils/getEntry.js";
import applyWebpackConfig from "./config/webpack.config.dev.js";

const argv = yargs
  .usage("用法: QianYuan dev [options]")
  .option("env", {
    alias: "e",
    type: "string",
    description: "用于指定路由环境",
    default: "test",
  })
  .help("h").argv;
export default async function dev(argv) {
  //获取各种路径
  const paths = getPaths(argv.cwd);
  //获取配置文件对象
  const dihogConfig = getConfig(paths.configFilePath, paths.appPackageJsonPath);
  if (dihogConfig !== false) {
    //指定output dir
    paths.outputPath = paths.resolveApp(dihogConfig.outputPath);
    //把dihog的entry统一转化为webpack可识别的entry
    dihogConfig.entry = getEntry(dihogConfig.entry, paths, argv);
    //获取最终的webpack配置
    // const match_filepath = await get_static_filepath();
    console.log(paths, dihogConfig, "1111111111111111111");
    const config = applyWebpackConfig(dihogConfig, paths, argv);
    console.log(config, "webpack配置项");
    if (config !== false) {
      //创建webpack对象
      // WebpackDevServer.addDevServerEntrypoints(config, config.devServer);
      const compiler = webpack(config);
      const devServerOptions = Object.assign({}, config.devServer);
      const server = new WebpackDevServer(devServerOptions, compiler);
      server.start();
    } else {
      console.error("配置文件不正确！");
    }
  } else {
    console.error("在工程目录下找不到配置文件qianyuan.json！");
  }
}
if (import.meta.url === new URL(import.meta.url).href) {
  dev(
    Object.assign({}, argv, {
      cwd: process.cwd(),
    })
  );
}

// _: [],
// env: 'test',
// e: 'test',
// '$0': '..\\..\\lib\\dev.js',
// cwd: 'D:\\demo\\QIanYuan-cli\\template\\default'
//  {
//     appDir: 'D:\\demo\\QIanYuan-cli\\template\\default',
//     appSrc: 'D:\\demo\\QIanYuan-cli\\template\\default\\src',
//     configFilePath: null,
//     appNodeModules: 'D:\\demo\\QIanYuan-cli\\template\\default\\node_modules',
//     ownNodeModules: 'D:\\demo\\QIanYuan-cli\\node_modules',
//     publicPath: 'D:\\demo\\QIanYuan-cli\\template\\default\\public',
//     resolveApp: [Function: resolveApp],
//     dllManifest: 'D:\\demo\\QIanYuan-cli\\template\\default\\public\\dihog-manifest.json',
//     dllOutputPath: 'D:\\demo\\QIanYuan-cli\\template\\default\\public',
//     ejsPath: 'D:\\demo\\QIanYuan-cli\\template\\default\\src\\index.ejs',
//     outputPath: '',
//     appPackageJsonPath: 'D:\\demo\\QIanYuan-cli\\template\\default\\package.json'
//   } false
