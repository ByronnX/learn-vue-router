// history/base.js

/**
 * 路由基类
 */
class History {
  constructor(router) {
    this.router = router;
    this.current = createRoute(null, {
      path: "/",
    });
  }

  /**
   * 路由跳转方法：
   *  每次跳转时都需要知道 from 和 to
   *  响应式数据：当路径变化时，视图刷新
   * @param {*}} location
   * @param {*} onComplete
   */
  transitionTo(location, onComplete) {
    // 根据路径进行路由匹配
    let route = this.router.match(location);
    // 查重：如果前后两次路径相同，且路由匹配的结果也相同，那么本次无需进行任何操作
    if (
      location == this.current.path &&
      route.matched.length == this.current.matched.length
    ) {
      // 防止重复跳转
      return;
    }
    // 获取到注册的回调方法 
    let queue = [].concat(this.router.beforeHooks); 
    const iterator = (hook, next) => {
      hook(this.current, route, () => {
        next();
      })
    }
    runQueue(queue, iterator, () => {
      // 将最后的两步骤放到回调中，确保执行顺序
      // 1，使用当前路由route更新current，并执行其他回调
      this.updateRoute(route);
      // 根据路径加载不同的组件  this.router.matcher.match(location)  组件 
      // 2，渲染组件
      onComplete && onComplete();
    })
  }
  listen(cb) {
    // 存储路由变化时的更新回调函数,即 app._route = route;
    this.cb = cb;
  }
  /**
   * 路由变化时的相关操作：
   *  1，更新 current;
   *  2，触发_route的响应式更新;
   * @param {*} route 当前匹配到的路由结果
   */
  updateRoute(route) {
    // 每次路由切换时，都会更改current属性
    this.current = route; 
    // 调用保存的更新回调，触发app._route的响应式更新
    this.cb && this.cb(route);
  }
  
}

export { History };


/**
 * 通过路由记录，逐层进行路由匹配
 * @param {*} record    路由记录
 * @param {*} location  路径
 * @returns 逐层匹配后的全部匹配结果
 */
export function createRoute(record, location) {
  let res = []; //[/user /user/info] 
  if (record) {
    while (record) {
      res.unshift(record);
      record = record.parent;
    }
  }
  return {
    ...location,
    matched: res
  }
}
/**
 * 递归执行钩子函数
 * @param {*} queue 钩子函数队列
 * @param {*} iterator 执行钩子函数的迭代器
 * @param {*} cb 全部执行完成后调用
 */
function runQueue(queue, iterator, cb) {
  // 异步迭代
  function step(index) {
    // 结束条件：队列全部执行完成，执行回调函数 cb 更新路由
    if (index >= queue.length) return cb();
    let hook = queue[index]; // 先执行第一个 将第二个hook执行的逻辑当做参数传入
    iterator(hook, () => step(index + 1));
  }
  step(0);
}
