// vue-router/components/link.js

export default {
  // 组件名称
  name: "routerLink",
  // 接收来自外部传入的属性
  props: {
    to: {
      // 目标路径
      type: String,
      required: true,
    },
    tag: {
      // 标签名，默认 a
      type: String,
      default: "a",
    },
  },
  methods: {
    handler(to) {
      // 路由跳转：内部调用 history.push
      this.$router.push(to);
    },
  },
  render() {
    let { tag, to } = this;
    // JSX：标签 + 点击跳转事件 + 插槽
    return (
      <tag onClick={this.handler.bind(this, to)}>{this.$slots.default}</tag>
    );
  },
};
