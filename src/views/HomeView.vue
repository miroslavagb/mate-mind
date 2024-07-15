<template>
  <main class="mt-10 container mx-auto px-8">
    <header class="z-10 mb-10">
    </header>

    <!-- First row - image, text, and buttons -->
    <section class="flex flex-col lg:flex-row items-center justify-between min-h-screen">
      <div class="w-full lg:w-1/2 p-8">
        <div class="text-white">
          <h2 v-html="$t('homePage.title')" class="text-3xl lg:text-4xl mb-4"></h2>
          <div class="flex space-x-4">
            <router-link
              to="/about"
              class="px-9 py-5 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white rounded-full"
            >
              {{ $t('homePage.aboutBtn') }}
            </router-link>
            <router-link
              to="/registration"
              class="px-9 py-5 bg-transparent border border-white text-white rounded-full"
            >
              {{ $t('homePage.joinBtn') }}
            </router-link>
          </div>
        </div>
      </div>
      <div class="w-full lg:w-1/2 h-72 lg:h-auto overflow-hidden rounded-full relative">
        <img
          src="@/assets/intro-edit.jpg"
          alt="Image"
          class="w-full h-full object-cover rounded-full oval-image"
        />
      </div>
    </section>

    <!-- Second row - Image, text -->
    <section class="relative flex flex-col lg:flex-row items-center justify-between min-h-screen mb-10">
      <!-- Left side - Image -->
      <div class="w-full lg:w-1/2 h-80 lg:h-full relative overflow-hidden">
        <img src="@/assets/homePage-section2.jpg" alt="Educational Journey Image" class="w-full h-full object-cover shadow-lg" />
        <div class="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <!-- Right side - Text -->
      <div class="w-full lg:w-1/2 p-8 text-center flex items-center justify-center">
        <p class="text-xl lg:text-2xl font-roboto-slab text-white p-4">
          Empowering students on their educational journey, our mission is to harness the power of AI to provide
          personalized, accessible, and reliable academic support. We strive to be the trusted companion that enhances
          learning experiences, fosters curiosity, and cultivates success for every student, every step of the way.
        </p>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: 'HomePage',
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;700&display=swap');

.oval-image {
  border-radius: 50%;
}

.font-roboto-slab {
  font-family: 'Roboto Slab', serif;
}

img {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.8);
}

.relative {
  position: relative;
}

.absolute {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.bg-gray-800 {
  background-color: #2d3748; 
}
</style>

