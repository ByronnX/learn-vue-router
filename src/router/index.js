import Vue from "vue";
import Router from "@/vue-router";
import HomeViewVue from "@/views/HomeView.vue";
import AboutViewVue from "@/views/AboutView.vue";

Vue.use(Router);

export default new Router({
  mode: "hash",
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeViewVue,
    },
    {
      path: "/about",
      name: "about",
      component: AboutViewVue,
      children: [
        {
          path: "user",
          name: "user",
          component: {
            render: (h) => <h1>user</h1>,
          },
        },
        {
          path: "address",
          name: "address",
          component: {
            render: (h) => <h1>address</h1>,
          },
        },
      ],
    },
  ],
});
