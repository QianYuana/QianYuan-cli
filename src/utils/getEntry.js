import glob from 'glob';
import { resolve } from 'path';

export default function getEntry(entry, paths, argv) {
  //如果指定的entry是一个字符串则把它转化为数组
  if (typeof entry === 'string') {
    entry = [entry];
  }
  if (Array.isArray(entry)) {
    let dir = argv.dir;
    //替换${dir}用于安需编译工程
    if (typeof dir !== 'string') {
      dir = '';
    }
    dir = dir || '';
    entry = entry.map(item => {
      return item.replace(/\${dir}/g, dir);
    });
    //通过pattern解析路径并构造entry，注意这里的entry会保留file的路径
    entry = entry.reduce((total, next) => {
      //glob匹配文件
      const files = glob.sync(next, {
        cwd: paths.appDir
      });
      (files || []).forEach(file => {
        //移除后缀名
        const key = file.replace(/\.(js|tsx|jsx|ts?)$/, '');
        total = {
          ...total,
          [key]: resolve(paths.appDir, file) //文件真实路径
        }
      });
      return total;
    }, {});
    return entry;
  } else {
    //如果entry是一个对象，则认为这个对象就是webpack的entry对象格式，只是路径要解析成绝对路径
    return Object.keys(entry).reduce((total, next) => {
      return {
        ...total,
        [next]: paths.resolveApp(entry[next])
      }
    }, {});
  }
}
