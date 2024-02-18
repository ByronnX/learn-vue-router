// create-route-map.js

/**
 * 路由配置扁平化处理
 *  支持初始化和追加两种情况
 * @param {*} routes     路由实例中的路由配置
 * @param {*} oldPathMap 路由规则映射表（扁平化结构）
 * @returns 新的路由规则映射表（扁平化结构）
 */
export default function createRouteMap(routes, oldPathMap) {
  // 拿到当前已有的映射关系
  let pathMap = oldPathMap || Object.create(null);
    // console.log("pathMap", pathMap);
    
  // 将路由配置 routes 依次加入到 pathMap 路由规则的扁平化映射表
  routes.forEach((route) => {
    addRouteRecord(route, pathMap);
  });

  return {
    pathMap,
  };
}

/**
 * 添加一个路由记录（递归当前的树形路由配置）
 *  先序深度遍历：先把当前路由放进去，再处理他的子路由
 * @param {*} route   原始路由记录（单个的原始路由数据）
 * @param {*} pathMap 路由规则的扁平化映射表(始终都不变)
 * @param {*} parent  当前路由所属的父路由对象（如果有就变化）
 */
function addRouteRecord(route, pathMap, parent) {
  // 处理子路由时，需要做路径拼接
  let path = parent ? parent.path + "/" + route.path : route.path;

  // 构造路由记录对象（还包含其他属性：path、component、parent、name、props、meta、redirect...）
  let record = {
    path,
    component: route.component,
    parent, // 标识当前组件的父路由记录对象
  };
 
  // 查重：路由定义不能重复，否则仅第一个生效
  if (!pathMap[path]) {
    pathMap[path] = record; // 将当前路由的映射关系存入pathMap
  }

  // 递归处理当前路由的子路由
  if (route.children) {
    route.children.forEach((childRoute) => {
      addRouteRecord(childRoute, pathMap, record);
    });
  }
}
