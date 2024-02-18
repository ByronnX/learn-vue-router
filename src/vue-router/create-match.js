// create-match.js

import createRouteMap from "./create-route-map";
import {createRoute} from './history/base'
/**
 * 路由匹配器函数
 *  对路由配置进行扁平化处理
 *  addRoutes：动态添加路由匹配规则
 *  match：根据路径进行路由匹配
 * @param {*} routes
 * @returns 返回路由匹配器的两个核心方法 addRoutes、match
 */
export default function createMatcher(routes) {
  // 将嵌套数组的路由配置，处理为便于匹配的扁平结构
  // 创建 match 方法：根据路径进行路由匹配
  // 创建 addRoutes 方法：动态添加路由匹配规则
  //  路由配置的扁平化处理
  let { pathMap } = createRouteMap(routes);
  console.log("pathMap", pathMap, "routes", routes);
  // 根据路径进行路由匹配
  function match(location) {
    // 获取路由记录
    let record = pathMap[location]; // 一个路径可能有多个记录
    // 匹配成功
    if (record) {
      return createRoute(record, {
        path: location,
      });
    }
    // 未匹配到
    return createRoute(null, {
      path: location,
    });
  }
  /**
   * 动态添加路由匹配规则
   *  将追加的路由规则进行扁平化处理
   * 应用场景：在后台管理应用中，部分菜单/路由是根据权限配置来决定的，可以使用路由插件提供的 addRoutes 方法动态添加路由；
   */
  function addRoutes(routes) {
    createRouteMap(routes, pathMap);
  }
  return {
    addRoutes, // 添加路由
    match, // 用于匹配路径
  };
}
