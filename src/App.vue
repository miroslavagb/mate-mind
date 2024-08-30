<template>
  <nav>
    <div class="drawer">
      <input id="my-drawer-3" type="checkbox" class="drawer-toggle" ref="drawerCheckbox" />
      <div class="drawer-content flex flex-col min-h-screen">
        <!-- Navbar -->
        <div :class="['w-full navbar shadow-md h-[64px] z-10 border-b-2 border-[#211945]', { 'scrolled': isScrolled }]">
          <div class="container mx-auto px-4 md:px-20">
            <div class="pr-2 pl-0 mt-2 mb-2 mr-auto">
              <router-link to="/">
                <img
                  v-if="showImage === 'true'"
                  src="@/assets/Screenshot_2023-12-18_154248-removebg-preview.png"
                  width="220"
                />
                <p v-if="showImage === 'false'">{{ $t('projectDetails.projectName') }}</p>
              </router-link>
            </div>
            <div class="flex-none lg:hidden">
              <label for="my-drawer-3" class="btn btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  class="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>

            <!-- Sidebar Menu smaller screens -->
            <div class="flex-none hidden lg:block">
              <ul
                class="menu menu-horizontal flex items-center font-bold"
                :class="displayLanguageSelector === 'true' ? 'last:pr-0' : ''"
              >
                <!-- Navbar menu content  -->
                <li
                  v-if="displayHome === 'true'"
                  :class="{ 'focus:bg-primary bg-primary': $route.path === '/' }"
                >
                  <router-link to="/">{{ $t('projectRoutes.home') }}</router-link>
                </li>
               
                <li
                  v-if="displayAiAssisstant === 'true'"
                  :class="{ 'focus:bg-primary bg-primary': $route.path === '/aiAssisstant' }"
                >
                  <router-link to="/aiAssisstant">{{ $t('projectRoutes.aiAssisstant') }}</router-link>
                </li>

                <LoginRegister v-if="displayLoginRegister === 'true'" />
                <div v-if="displayLanguageSelector === 'true'" class="pl-8">
                  <LanguageSelector />
                </div>
              </ul>
            </div>
          </div>
        </div>

        <!-- Page content here -->
        <div class="page-content flex-grow">
          <RouterView />
        </div>
        <Footer />
      </div>
      <div class="drawer-side z-50">
        <label for="my-drawer-3" class="drawer-overlay"></label>
        <ul class="menu p-4 w-80 min-h-full bg-base-300 font-bold">
          <!-- Sidebar content here -->
          <li v-if="displayHome === 'true'">
            <router-link to="/" @click="handleClick()">{{ $t('projectRoutes.home') }}</router-link>
          </li>
          
          <li v-if="displayAiAssisstant === 'true'">
            <router-link to="/aiAssisstant" @click="handleClick()">{{ $t('projectRoutes.aiAssisstant') }}</router-link>
          </li>
          <LoginRegister v-if="displayLoginRegister === 'true'" />
          <div v-if="displayLanguageSelector === 'true'" class="pl-40">
            <LanguageSelector />
          </div>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, defineAsyncComponent, onMounted, onUnmounted } from 'vue';
import { RouterLink, RouterView, useRoute } from 'vue-router';
import Footer from '@/components/Global/Footer.vue';
const LanguageSelector = defineAsyncComponent(() =>
  import('@/components/Global/LanguageSelector.vue')
);
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const LoginRegister = defineAsyncComponent(() => import('@/components/Global/LoginRegister.vue'));
const drawerCheckbox = ref(null);
const isScrolled = ref(false);

const handleClick = () => {
  drawerCheckbox.value.checked = !drawerCheckbox.value.checked;
};

const route = useRoute();

const showImage = t('projectSettings.navbarSettings.displayLogo');
const displayHome = t('projectSettings.navbarSettings.home');
const displayAiAssisstant = t('projectSettings.navbarSettings.aiAssisstant');
const displayLanguageSelector = t('projectSettings.navbarSettings.languageChanger');
const displayLoginRegister = t('projectSettings.navbarSettings.loginRegister');

const handleScroll = () => {
  isScrolled.value = window.scrollY > 0;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.9);
  transition: background 0.3s ease-in-out;
}

.navbar.scrolled {
  background: rgba(0, 0, 0, 0.7); 
}

.page-content {
  padding-top: 64px; 
}

.menu :where(li:not(.menu-title) > *:not(ul):not(details):not(.menu-title)),
.menu :where(li:not(.menu-title) > details > summary:not(.menu-title)) {
  border-radius: 0px !important;
}

.menu-horizontal {
  font-size: 16px; 
}

.menu-horizontal li {
  display: inline-block; 
}

.menu-horizontal li a {
  position: relative;
  color: #ffffff; 
  text-decoration: none; 
  padding-bottom: 4px; 
}

.menu-horizontal li a::after {
  content: '';
  position: absolute;
  bottom: -2px; 
  left: 0;
  width: 0;
  height: 2px; 
  background-color: #36102f5c; 
}

.menu-horizontal li a:hover::after,
.menu-horizontal li a.router-link-exact-active::after {
  width: 100%;
}

.menu-horizontal li a.router-link-exact-active {
  background-color: #dc096557;
}

.navbar {
  background-image: url('@/assets/home_gradient_bg_hero_image.png');
  background-size: cover; 
}
</style>
