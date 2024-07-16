import "../tailwind.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";
import App from "./App.vue";
import router from "./router";
import messages from './locales/export.js';
import { useUserStore } from '@/stores/userStore'; 

const i18n = createI18n({
  locale: localStorage.getItem("locale") || "en",
  legacy: false,
  messages,
});

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(i18n);

const userStore = useUserStore();

router.beforeEach((to, from, next) => {
  userStore.loadUser(); 
  
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!userStore.user) {
      next({ path: '/login', query: { redirect: to.fullPath } });
    } else {
      next();
    }
  } else {
    next();
  }
});

app.use(router);
app.mount("#app");

