/**
 * 从 vue-router 插件的使用方式可以看出：
 * vue-router 插件最终的导出结果是一个类 Router；
 * Router 实例化时，可以传入一个路由配置对象；
 * Router 类能够被 Vue.use()，说明 Router 类上包含了 install 方法；
 * 当 vue-router 插件被引入时，会默认执行 vue-router 目录下的 index.js 入口文件；
 * 所以，在 index.js 中创建一个 VueRouter 类，具有 install 方法，并将其导出：
 */
// vue-router/index.js

// 导入路由安装逻辑
import install from "./install";

class VueRouter {
  constructor(options) {
    // 传入路由配置对象
  }
}

// 当 Vue.use 时，会自动执行插件上的 install 方法；
VueRouter.install = install;

// 插件最终导出 VueRouter 类，外部实例化时可传入配置对象
export default VueRouter;
