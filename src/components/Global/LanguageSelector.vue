<template>
  <div class="dropdown dropdown-end">
    <label tabindex="0" class="btn rounded-btn" for="">
    
      <span>
        <img :src="flag" class="w-6 h-6 object-contain mr-2" alt="Flag" />
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 hidden md:block"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
    </label>
    <ul
      tabindex="0"
      class="menu dropdown-content p-2 shadow-xl bg-[#0C1341] rounded-box w-52 mt-4 z-50"
    >
      <template v-for="language in languages" :key="language.code">
        <li @click="setLanguage(language.code)">
          <a>
            <img :src="language.flag" class="w-6 h-6 object-contain mr-2" alt="Flag" />
            <span>{{ language.name }} </span>
          </a>
        </li>
      </template>
    </ul>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue';
  import englishFlag from '@/assets/flags/enFlag.png';
  import bulgariaFlag from '@/assets/flags/bgFlag.png';

  const languages = ref([
    {
      name: 'English',
      code: 'en',
      flag: englishFlag,
    },
    {
      name: 'Bulgarian',
      code: 'bg',
      flag: bulgariaFlag,
    },
  ]);

  const selectedLanguage = ref(localStorage.getItem('locale') || 'en');

  const setLanguage = (language) => {
    localStorage.setItem('locale', language);
    selectedLanguage.value = language;
    location.reload();
  };

  const flag = computed(() => {
    switch (selectedLanguage.value) {
      case 'en':
        return englishFlag;
      case 'bg':
        return bulgariaFlag;
     
      default:
        return englishFlag; 
    }
  });
</script>