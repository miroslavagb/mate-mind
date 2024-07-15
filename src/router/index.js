import { createRouter, createWebHistory } from 'vue-router';
const HomeView = () => import('../views/HomeView.vue');
const AboutView = () => import('../views/AboutView.vue');
const AiAssisstantView= () =>import('../views/Asistant.vue');
const RegistrationView= () =>import('../views/RegistrationView.vue');
const LoginView= () =>import('../views/LoginView.vue');
const LogoutView= () =>import('../views/LogoutView.vue');
const PrivacyPolicy= () =>import('../views/PrivacyPolicyView.vue');

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
      {
        path: '/aiAssisstant',
        name: 'aiAssisstant',
        component: AiAssisstantView,
      },
      {
        path: '/registration',
        name: 'registration',
        component: RegistrationView,
      },
      {
        path: '/login',
        name: 'login',
        component: LoginView,
      },
      {
        path: '/logout',
        name: 'logout',
        component: LogoutView,
      },
      {
        path: '/privacy-policy',
        name: 'privacy-policy',
        component: PrivacyPolicy,
      },   
  ],
});

export default router;
