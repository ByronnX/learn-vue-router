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
import createMatcher from "./create-match";
import install from "./install";
import HashHistory from "./history/hash";
import BrowserHistory from "./history/history";
class VueRouter {
  constructor(options) {
    // 路由匹配器-处理路由配置：将树形结构的嵌套数组转化为扁平化结构的对象，便于后续的路由匹配
    // 路由匹配器返回两个核心方法：match、addRoutes
    this.matcher = createMatcher(options.routes || []); // options.routes 默认[]
    // 根据不同的路由模式，生成对应的处理实例
    options.mode = options.mode || "hash"; // 默认hash模式
    switch (options.mode) {
      case "hash":
        this.history = new HashHistory(this);
        break;
      case "history":
        this.history = new BrowserHistory(this);
        break;
    }
    // 定义一个存放钩子函数的数组
    this.beforeHooks = [];
  }
  // 在router.beforeEach时，依次执行注册的钩子函数
  beforeEach(fn) {
    this.beforeHooks.push(fn);
  }
  // 监听 hash 值变化,跳转到对应的路径中
  init(app) {
    // 当前的history实例：可能是HashHistory，也可能是BrowserHistory；
    const history = this.history;
    // 设置监听器：内部调用的是不同子类中的实现
    const setUpListener = () => {
      history.setupListener();
    };
    // 初始化时，获取当前hash值进行跳转, 并设置监听器
    history.transitionTo(history.getCurrentLocation(), setUpListener);
    // 每次路径变化时，都会调用此方法
    // 触发根实例 app 上响应式数据 _route 的更新
    history.listen((route) => {
      app._route = route;
    });
  }
  /**
   * 根据路径匹配到路由映射表 matcher 中进行路由匹配
   * 备注：VueRouter 类通过 match 方法对外提供 matcher 的访问，而不是直接访问 matcher
   * @param {*} location 路径
   * @returns 匹配结果数组
   */
  match(location) {
    // createMatcher.match
    return this.matcher.match(location);
  }
  //this.$router.push 方法的实现
  push(to) {
    this.history.push(to); // 子类对应的push实现
  }
}

// 当 Vue.use 时，会自动执行插件上的 install 方法；
VueRouter.install = install;

// 插件最终导出 VueRouter 类，外部实例化时可传入配置对象
export default VueRouter;
