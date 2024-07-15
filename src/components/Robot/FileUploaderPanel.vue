<template>
  <div class="w-1/3 p-6 bg-[#3A3AA7] bg-opacity-50 text-white rounded h-full flex flex-col justify-between">
    <div>
      <h2 class="text-lg font-extrabold mb-4 flex items-center justify-center h-16">Learning materials</h2>
      <label for="fileInput" class="cursor-pointer">
        <!-- Your file upload logic here -->
        <input type="file" id="fileInput" @change="handleFileUpload" class="hidden">
        <div v-if="uploadedFiles.length > 0">
          <div v-for="(file, index) in uploadedFiles" :key="index" class="truncate cursor-pointer" @dblclick="startFileRename(index)" @click="openFile(file)" ref="fileLabel">
            {{ index + 1 }}. {{ file.name }}
          </div>
        </div>
      </label>
    </div>
    <button @click="triggerFileInput" class="bg-[#b3b3dd] text-black font-bold pl-0  pr-0 p-4 pb-4 rounded">Upload Book</button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      uploadedFiles: [],
      isRenaming: false,
      renamingIndex: null,
    };
  },
  methods: {
    handleFileUpload(event) {
      // Handle file upload logic
      const file = event.target.files[0];
      this.uploadedFiles.push({ name: file.name, isRenaming: false });
    },
    triggerFileInput() {
      // Trigger the hidden file input
      document.getElementById('fileInput').click();
    },
    startFileRename(index) {
      this.renamingIndex = index;
      this.uploadedFiles[index].isRenaming = true;
      this.$nextTick(() => {
        const inputElement = document.createElement('input');
        inputElement.value = this.uploadedFiles[index].name;
        inputElement.addEventListener('blur', this.finishFileRename);
        inputElement.addEventListener('keyup', (event) => {
          if (event.key === 'Enter') {
            this.finishFileRename();
          }
        });
        const fileLabel = this.$refs.fileLabel[index];
        fileLabel.innerHTML = '';
        fileLabel.appendChild(inputElement);
        inputElement.focus();
      });
    },
    finishFileRename() {
      if (this.renamingIndex !== null) {
        const inputElement = this.$refs.fileLabel[this.renamingIndex].querySelector('input');
        if (inputElement) {
          this.uploadedFiles[this.renamingIndex].name = inputElement.value;
          this.uploadedFiles[this.renamingIndex].isRenaming = false;
          this.renamingIndex = null;
        }
      }
    },
    openFile(file) {
      // Replace 'src/assets/books/' with the actual relative path to your files
      const relativePath = 'src/assets/books/';
      const filePath = `${relativePath}${file.name}`;

      // Open the file in a new tab
      window.open(filePath, '_blank');
    },
  },
};
</script>

<style scoped>
/* Component-specific styles here */

</style>
