import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import Home from "../views/Home.vue";
import Account from "../views/UserAccount.vue";
import Folders from "../views/Folders.vue";
import FolderContents from "../views/FolderContents.vue";
import CreateList from "../views/CreateList.vue";
import ListDetail from "../views/ListDetail.vue";

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
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/account",
    name: "Account",
    component: Account,
  },
  {
    path: "/folders",
    name: "Folders",
    component: Folders,
  },
  {
    path: "/folders/:folderId",
    name: "FolderContents",
    component: FolderContents,
    props: true,
  },
  {
    path: "/create-list",
    name: "CreateList",
    component: CreateList,
  },
  {
    path: "/lists/:listId",
    name: "ListDetail",
    component: ListDetail,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
