/**
 * router-view 函数式组件，多层级渲染
 * 函数式组件特点：性能高，无需创建实例，没有 this
 */
export default {
  name: "routerView",
  functional: true, // 函数式组件
  render(h, { parent, data }) {
    // 获取当前需要渲染的相关路由记录，即：this.current
    let route = parent.$route;
    let depth = 0; // 记录等级深度
    data.routerView = true; // 自定义属性

    // App.vue渲染组件时，调用render函数，此时的父亲中没有 data.routerView 属性
    // 在渲染第一层时，添加routerView=true标识
    while (parent) {
      // parent 为 router-view 的父标签
      // parent.$vnode：代表占位符的vnode；即：组件标签名的虚拟节点；
      // parent._vnode 指组件的内容；即：实际要渲染的虚拟节点；
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++;
      }
      parent = parent.$parent; // 更新父组件，用于循环的下一次处理
    }

    // 根据当前层级深度获取该层级对应的路由记录，用于视图渲染
    let record = route.matched[depth];
    // 未匹配到路由记录，渲染空虚拟节点（empty-vnode），也叫作注释节点
    if (!record) {
      return h();
    }
    return h(record.component, data);
  },
};
