import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import App from "./App.vue";
import Characters from "./components/Characters.vue";
import "./assets/main.scss";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/:page?",
      component: Characters
    }
  ]
});

const app = createApp(App);

app.use(router);

app.mount("#app");
