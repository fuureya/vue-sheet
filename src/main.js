import "./assets/main.css";
import App from "./App.vue";
import { createWebHistory, createRouter } from "vue-router";
import { createApp } from "vue";

import LoginPage from "./components/LoginPage.vue";
import HelloWorld from "./components/HelloWorld.vue";

const routes = [
  {
    path: "/",
    component: HelloWorld,
  },
  {
    path: "/login",
    component: LoginPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount("#app");
export default router;
