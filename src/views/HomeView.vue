<template>
  <main class="container mx-auto px-8">
    <!-- First row - image, text, and buttons -->
    <section class="flex flex-col lg:flex-row items-center justify-between min-h-[70vh] mb-10"> <!-- Adjusted min-h-screen -->
  <div class="w-full lg:w-1/2 p-8">
    <div class="text-white text-center lg:text-left">
      <h2 v-html="$t('homePage.title')" class="text-5xl lg:text-5xl mb-8 pt-24 leading-tight"></h2>
      <div class="flex space-x-4 justify-center lg:justify-start mt-6">
        <button
          @click="handleAiAssistantClick"
          class="px-9 py-5 bg-transparent border border-white text-white rounded-full"
        >
          Try our AI assistant
        </button>
      </div>
    </div>
  </div>
  <div class="w-full lg:w-1/2 h-72 lg:h-auto overflow-hidden rounded-full relative">
    <img
      src="@/assets/intro-edit.jpg"
      alt="AI Assistant"
      class="w-full h-full object-cover rounded-full oval-image"
    />
  </div>
</section>

   <!-- New Goals Section -->
   <section class="pt-20 pb-20">
      <h2 class="text-4xl lg:text-5xl font-bold text-white mb-12 text-center">{{ $t('aboutPage.goalsTitle') }}</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
        <div v-for="(goal, index) in goals" :key="index" 
             class="bg-gradient-to-r from-blue-600 to-blue-900 text-white p-8 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
          <h3 class="text-2xl font-semibold mb-4">{{ goal.title }}</h3>
          <p class="text-base">{{ goal.description }}</p>
        </div>
      </div>
    </section>

    <!-- Second row - Image, text -->
    <section class="relative flex flex-col lg:flex-row items-center justify-between mb-10">
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

<script setup>
import { useRouter } from 'vue-router';
import { useAuth } from '@/components/Auth/useAuth.js';

const router = useRouter();
const { isAuthenticated } = useAuth();

const handleAiAssistantClick = () => {
  if (isAuthenticated.value) {
    router.push('/aiAssisstant');
  } else {
    router.push('/registration');
  }
};

// Goals data (previously in the AboutPage)
const goals = [
{ title: 'Quiz generation', description: 'Automatically creates personalized quizzes from your study material to test your knowledge effectively' },
{ title: 'Quiz evaluation', description: 'Based on your answers you will recieve personalised feedback with reccomendations for improvement' },
  { title: 'Question answering', description: 'Provides detailed answers to all of your questions based on the context of the uploaded material' },
  { title: 'File management', description: 'Maintains a detailed history of your interactions over file, serving in the purpose of your private handbook' },
  { title: '24/7 availability', description: 'You dont have to wait for a convinient time to interact with it -its on your purpose all day and night long' },
  { title: 'Ease of use', description: 'Designed with simplicity in mind, ensuring you can focus on learning without technological complexities' }
];
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
</style>
