import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import yargs from 'yargs';
import webpack from 'webpack';
import getPaths from './utils/paths.js';
import getConfig from './utils/getConfig.js';
import getEntry from './utils/getEntry.js';
import applyWebpackConfig from './config/webpack.config.prod.js';
var argv = yargs.usage('用法: QianYuan build [options]').option('env', {
  alias: 'e',
  type: 'string',
  description: '用于指定路由环境',
  "default": 'prod'
}).help('h').argv;
export default function build(_x) {
  return _build.apply(this, arguments);
}
function _build() {
  _build = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee(argv) {
    var paths, dihogConfig, config, compiler;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          // 获取各种路径
          paths = getPaths(argv.cwd); // 获取配置文件对象
          dihogConfig = getConfig(paths.configFilePath, paths.appPackageJsonPath);
          if (!(dihogConfig !== false)) {
            _context.next = 15;
            break;
          }
          // 指定output dir
          paths.outputPath = paths.resolveApp(dihogConfig.outputPath);

          // 把dihog的entry统一转化为webpack可识别的entry
          dihogConfig.entry = getEntry(dihogConfig.entry, paths, argv);

          // 获取最终的webpack配置
          config = applyWebpackConfig(dihogConfig, paths, argv);
          if (!(config !== false)) {
            _context.next = 12;
            break;
          }
          // 创建webpack对象
          compiler = webpack(config); // 执行构建
          return _context.abrupt("return", new Promise(function (resolve, reject) {
            compiler.run(function (err, stats) {
              if (err) {
                console.error('Webpack 编译错误：');
                console.error(err.stack || err);
                if (err.details) {
                  console.error('详细错误信息：');
                  console.error(err.details);
                }
                reject(err);
                return;
              }
              var info = stats.toJson();
              if (stats.hasErrors()) {
                console.error('构建错误：');
                info.errors.forEach(function (error) {
                  console.error(error);
                });
                reject(new Error('构建失败，请检查以上错误信息'));
                return;
              }
              if (stats.hasWarnings()) {
                console.warn('构建警告：');
                info.warnings.forEach(function (warning) {
                  console.warn(warning);
                });
              }
              console.log('构建完成！');
              console.log('输出目录：', paths.outputPath);
              resolve();
            });
          }));
        case 12:
          throw new Error('配置文件不正确！');
        case 13:
          _context.next = 16;
          break;
        case 15:
          throw new Error('在工程目录下找不到配置文件qianyuan.json！');
        case 16:
          _context.next = 22;
          break;
        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](0);
          console.error('构建过程出错：', _context.t0);
          process.exit(1);
        case 22:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 18]]);
  }));
  return _build.apply(this, arguments);
}
if (import.meta.url === new URL(import.meta.url).href) {
  build(Object.assign({}, argv, {
    cwd: process.cwd()
  }));
}