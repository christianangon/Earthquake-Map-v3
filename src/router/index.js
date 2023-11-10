/*
 * @Description:
 * @Author: Ian
 * @Date: 2023-08-03 10:23:42
 * @LastEditTime: 2023-11-11 00:12:37
 * @LastEditors: Ian
 */
import { createRouter, createWebHashHistory } from "vue-router";
import AppLayout from "@/layout/AppLayout.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: AppLayout,
      name: "home",
      component: () => import("../views/Home.vue"),
    },
  ],
});

export default router;
