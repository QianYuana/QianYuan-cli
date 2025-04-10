import yargs from 'yargs';
import webpack from 'webpack';
import getPaths from './utils/paths.js';
import getConfig from './utils/getConfig.js';
import getEntry from './utils/getEntry.js';
import applyWebpackConfig from './config/webpack.config.prod.js';

const argv = yargs
  .usage('用法: QianYuan build [options]')
  .option('env', {
    alias: 'e',
    type: 'string',
    description: '用于指定路由环境',
    default: 'prod',
  })
  .help('h').argv;

export default async function build(argv) {
  try {
    // 获取各种路径
    const paths = getPaths(argv.cwd);
    
    // 获取配置文件对象
    const dihogConfig = getConfig(paths.configFilePath, paths.appPackageJsonPath);
    
    if (dihogConfig !== false) {
      // 指定output dir
      paths.outputPath = paths.resolveApp(dihogConfig.outputPath);
      
      // 把dihog的entry统一转化为webpack可识别的entry
      dihogConfig.entry = getEntry(dihogConfig.entry, paths, argv);
      
      // 获取最终的webpack配置
      const config = applyWebpackConfig(dihogConfig, paths, argv);
      
      if (config !== false) {
        // 创建webpack对象
        const compiler = webpack(config);
        
        // 执行构建
        return new Promise((resolve, reject) => {
          compiler.run((err, stats) => {
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

            const info = stats.toJson();

            if (stats.hasErrors()) {
              console.error('构建错误：');
              info.errors.forEach(error => {
                console.error(error);
              });
              reject(new Error('构建失败，请检查以上错误信息'));
              return;
            }

            if (stats.hasWarnings()) {
              console.warn('构建警告：');
              info.warnings.forEach(warning => {
                console.warn(warning);
              });
            }

            console.log('构建完成！');
            console.log('输出目录：', paths.outputPath);
            resolve();
          });
        });
      } else {
        throw new Error('配置文件不正确！');
      }
    } else {
      throw new Error('在工程目录下找不到配置文件qianyuan.json！');
    }
  } catch (error) {
    console.error('构建过程出错：', error);
    process.exit(1);
  }
}

if (import.meta.url === new URL(import.meta.url).href) {
  build(
    Object.assign({}, argv, {
      cwd: process.cwd(),
    })
  );
}
