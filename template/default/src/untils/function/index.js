/*
 * 路由配置
 * @param {Object} routeToNameMap 路由列表转为键值对
 */
export const routeToNameMap = (routeList, path) => {
  const ac = routeList.reduce((acc, cur) => {
    acc[cur.path] = cur.name;
    return acc; // 确保返回累加器
  }, {});
  console.log(ac, "转换");
  return ac[path];
};
