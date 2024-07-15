<template>
    <div :class="chatClass">
      <div :style="{ backgroundColor: bubbleColor }" class="text-white p-4 rounded max-w-2/3 break-words">
        {{ message.text }}
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      position: String,
      message: Object,
    },
    computed: {
      chatClass() {
        return `flex ${this.position === 'start' ? 'justify-end' : 'justify-start'} items-end mb-8`;
      },
      bubbleColor() {
        return this.position === 'start' ? '#725E9C' : '#544F60'; // Adjust colors as needed
      },
    },
  };
  </script>
  
  
  