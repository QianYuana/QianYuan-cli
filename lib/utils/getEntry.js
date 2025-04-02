import _defineProperty from "@babel/runtime/helpers/defineProperty";
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
import glob from 'glob';
import { resolve } from 'path';
export default function getEntry(entry, paths, argv) {
  //如果指定的entry是一个字符串则把它转化为数组
  if (typeof entry === 'string') {
    entry = [entry];
  }
  if (Array.isArray(entry)) {
    var dir = argv.dir;
    //替换${dir}用于安需编译工程
    if (typeof dir !== 'string') {
      dir = '';
    }
    dir = dir || '';
    entry = entry.map(function (item) {
      return item.replace(/\${dir}/g, dir);
    });
    //通过pattern解析路径并构造entry，注意这里的entry会保留file的路径
    entry = entry.reduce(function (total, next) {
      //glob匹配文件
      var files = glob.sync(next, {
        cwd: paths.appDir
      });
      (files || []).forEach(function (file) {
        //移除后缀名
        var key = file.replace(/\.(js|tsx|jsx|ts?)$/, '');
        total = _objectSpread(_objectSpread({}, total), {}, _defineProperty({}, key, resolve(paths.appDir, file)));
      });
      return total;
    }, {});
    return entry;
  } else {
    //如果entry是一个对象，则认为这个对象就是webpack的entry对象格式，只是路径要解析成绝对路径
    return Object.keys(entry).reduce(function (total, next) {
      return _objectSpread(_objectSpread({}, total), {}, _defineProperty({}, next, paths.resolveApp(entry[next])));
    }, {});
  }
}