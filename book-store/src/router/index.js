import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import CartPage from "../views/CartPage.vue";
import SignUpPage from "../views/SignUpPage.vue";
import Administration from "../views/Administration.vue";
import OrdersPage from "../views/OrdersPage.vue";

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
    meta: { log: true },
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
    meta: { auth: true },
  },
  {
    path: "/orders",
    name: "Orders",
    component: OrdersPage,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "active-link",
});

router.beforeEach((to, from, next) => {
  const admin = localStorage.getItem("admin");
  const loggedIn = localStorage.getItem("loggedIn");
  if (to.meta.auth && !admin) {
    next("/");
  } else if (to.meta.auth && admin) {
    next();
  } else if (to.meta.log && !loggedIn) {
    next("/signup");
  } else {
    next();
  }
});
export default router;
