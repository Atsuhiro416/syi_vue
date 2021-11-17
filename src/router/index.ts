import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import Home from "../views/Home.vue";
import Account from "../views/UserAccount.vue";
import Folders from "../views/Folders.vue";
import FolderContents from "../views/FolderContents.vue";
import CreateList from "../views/CreateList.vue";
import ListDetail from "../views/ListDetail.vue";
import Exit from "../views/Exit.vue";
import NotFound from "../views/NotFound.vue";
import store from "@/store";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Login",
    component: Login,
    props: true,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/account",
    name: "Account",
    component: Account,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/folders",
    name: "Folders",
    component: Folders,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/folders/:folderId",
    name: "FolderContents",
    component: FolderContents,
    props: true,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/create-list",
    name: "CreateList",
    component: CreateList,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/lists/:listId",
    name: "ListDetail",
    component: ListDetail,
    props: true,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/exit",
    name: "Exit",
    component: Exit,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
    alias: "/not-found",
    meta: {
      requiresAuth: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.hasAuthenticated) {
    next({
      path: "/",
      query: {
        redirect: to.fullPath,
      },
    });
    alert("ログインしてください");
  } else {
    next();
  }
});

export default router;
