<!-- not enough info to add here -->

<template>
  <main class="mt-10 container mx-auto px-8">
    <header class="z-10 mb-10">
      <h1 class="text-5xl font-bold text-white">{{ $t('aboutPage.mainGoal') }}</h1>
    </header>

    <section class="min-h-screen flex flex-col items-center justify-center">
      <h2 class="text-4xl lg:text-5xl font-bold text-white mb-12">{{ $t('aboutPage.goalsTitle') }}</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="(goal, index) in goals" :key="index" 
             class="bg-gradient-to-r from-purple-600 to-blue-800 text-white p-8 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
          <h3 class="text-2xl font-semibold mb-4">{{ goal.title }}</h3>
          <p class="text-base">{{ goal.description }}</p>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: 'AboutPage',
  data() {
    return {
      goals: [
        { title: 'Document analysis', description: 'Instantly evaluates and provides feedback on your academic papers to enhance quality and coherence' },
        { title: 'Quiz generation', description: 'Automatically creates personalized quizzes from your study material to test your knowledge effectively' },
        { title: 'Study recommendations', description: 'Offers tailored suggestions on resources and study habits to optimize your learning experience' },
        { title: '24/7 Support', description: 'Provides round-the-clock assistance for all your academic inquiries, ensuring you are never stuck' },
        { title: 'Profile management', description: 'Maintains a detailed history of your interactions and achievements, helping you build a professional academic profile' },
        { title: 'Ease of use', description: 'Designed with simplicity in mind, ensuring you can focus on learning without technological complexities' }
      ]
    };
  }
};
</script>

<style scoped>
h1 {
  font-size: 3rem;
}

h2 {
  font-size: 2.5rem;
}

h3 {
  font-size: 1.75rem;
}

p {
  font-size: 1rem;
}
</style>
