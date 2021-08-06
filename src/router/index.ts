import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import Top from "../views/Top.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Login",
    component: Login,
    props: true,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/top",
    name: "Top",
    component: Top,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
