import "../tailwind.css";
import "../style.css"; 
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
app.use(router);

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  userStore.loadUser(); 

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!userStore.user) {

      // missing auth=> retirect to login
      next({ path: '/login', query: { redirect: to.fullPath } });
    } else {
      next();
    }
  } else {
    next();
  }
});

app.mount("#app");
