import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import CartPage from "../views/CartPage.vue";
import SignUpPage from "../views/SignUpPage.vue";
import Administration from "../views/Administration.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/cart",
    name: "Cart",
    component: CartPage,
  },
  {
    path: "/signup",
    name: "Signup",
    component: SignUpPage,
  },
  {
    path: "/admin",
    name: "Admin",
    component: Administration,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "active-link",
});

export default router;
