import "../tailwind.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";
import App from "./App.vue";
import router from "./router"; // Make sure this imports your router configuration properly
import messages from './locales/export.js'; // Ensure this contains your localization messages
import { useUserStore } from '@/stores/userStore'; // Adjust the path to where your userStore is defined

// Setup i18n instance with locale data
const i18n = createI18n({
  locale: localStorage.getItem("locale") || "en", // Fallback to English if no locale is stored
  legacy: false, // Uses Composition API
  messages,
});

const app = createApp(App);

// Initialize Pinia state management
const pinia = createPinia();
app.use(pinia);

// Apply i18n and router to the app
app.use(i18n);
app.use(router);

// Use router.beforeEach to handle user state on each navigation attempt
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  userStore.loadUser(); // Make sure this method is properly defined in your userStore to load the user state from local storage or initialize it

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!userStore.user) {
      // If the route requires authentication and the user is not logged in, redirect to the login page
      next({ path: '/login', query: { redirect: to.fullPath } });
    } else {
      // Proceed as normal if the user is authenticated
      next();
    }
  } else {
    // If no authentication is needed, just proceed
    next();
  }
});

app.mount("#app");
