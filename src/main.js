// main.js

import Vue from "vue";
import router from "./router"; // 导入配置完成的路由实例
import App from "./App.vue";

const vm = new Vue({
  el: "#app",
  router, // 将路由实例注册到 Vue 实例中
  render: (h) => {
    return h(App);
  },
});
