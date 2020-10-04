import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Devices from "../views/Devices.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Devices,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Dashboard.vue"),
  },
  {
    path: "/devices",
    name: "Devices",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Devices.vue"),
  },
  {
    path: "/rooms",
    name: "Rooms",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Rooms.vue"),
  },
  {
    path: "/scenes",
    name: "Scenes",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Scenes.vue"),
  },
  {
    path: "/settings",
    name: "Settings",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Settings.vue"),
  },
  {
    path: "/device/:id",
    name: "Device",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Device.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
