<template>
  <div class="min-h-screen flex flex-col md:flex-row p-4 space-x-4 overflow-hidden">
    <FileUploaderPanel class="md:w-1/4 " />
    <ConversationPanel class="md:w-3/4 " />
  </div>
</template>

<script>
import FileUploaderPanel from "@/components/Robot/FileUploaderPanel.vue";
import ConversationPanel from "@/components/Robot/ConversationPanel.vue";

export default {
  components: {
    FileUploaderPanel,
    ConversationPanel,
  },
};
</script>


