//JSDOC语法注释
/**
 * @function routeToNameMap 路由列表转成nameMap列表键值对
 * @param {*} routeList 全部路由列表
 * @param {*} path    当前路由path
 * @returns 
 */
export const routeToNameMap = (routeList, path) => {
  const ac = routeList.reduce((acc, cur) => {
    acc[cur.path] = cur.name;
    return acc; // 确保返回累加器
  }, {});
  return ac[path];
};
