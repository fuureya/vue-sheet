import "./assets/main.css";
import App from "./App.vue";
import { createMemoryHistory, createRouter } from "vue-router";
import { createApp } from "vue";

import LoginPage from "./components/LoginPage.vue";
import HelloWorld from "./components/HelloWorld.vue";

const routes = [
  {
    path: "/",
    component: HelloWorld,
  },
  {
    path: "/anjay",
    component: LoginPage,
  },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

createApp(App).use(router).mount("#app");
export default router;
