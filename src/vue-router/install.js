// vue-router/install.js

/**
 * 在 install.js 中，主要包含以下逻辑：
 * 插件安装时，指定插件依赖的 Vue 版本，并导出提供 vue-router 插件其他逻辑使用；
 * 在 Vue 全局上注册两个组件：<router-link> 和 <router-view>；
 * 在 Vue 原型上添加两个属性：$router 和 $route；
 */
// 用于存储插件安装时传入的 Vue 并向外抛出，提供给插件中的其他文件使用
// export 的特点：如果导出的值发生变化，外部会取得变化后的新值；
export let _Vue;

/**
 * 插件安装入口 install 逻辑
 * @param {*} Vue     Vue 的构造函数
 * @param {*} options 插件的选项
 */
export default function install(Vue, options) {
    console.log('install ing');
    
  _Vue = Vue; // 存储插件安装时使用的 Vue

  // 通过生命周期，为所有组件混入 router 属性
  Vue.mixin({
    beforeCreate() {
      // this 指向当前组件实例
      // 将 new Vue 时传入的 router 实例共享给所有子组件
      if (this.$options.router) {
        // 根组件才有 router
        this._routerRoot = this; // 为根组件添加 _routerRoot 属性指向根组件自己
        this._router = this.$options.router; // this._router 指向 this.$options.router
      } else {
        // 子组件
        // 如果是子组件，就去找父亲上的_routerRoot属性，并继续传递给儿子
        this._routerRoot = this.$parent && this.$parent._routerRoot;
      }
      // 这样，所有组件都能够通过 this._routerRoot._router 获取到同一个 router 实例；
    },
  });
  // 在 Vue 全局上注册两个组件：`<router-link>` 和 `<router-view>`；
  Vue.component("router-link", {
    render: (h) => h("a", {}, ""), // h(tag,data,children)
  });
  Vue.component("router-view", {
    render: (h) => h("div", {}, ""),
  });

  // 在 Vue 原型上添加两个属性：`$router` 和 `$route`；
  Vue.prototype.$route = {};
  Vue.prototype.$router = {};
}
