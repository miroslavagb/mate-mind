// userStore.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null
  }),
  actions: {
    setUser(userData) {
      this.user = userData;
      localStorage.setItem('user', JSON.stringify(userData));
    },
    clearUser() {
      this.user = null;
      localStorage.removeItem('user');
    },
    loadUser() {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        this.user = JSON.parse(storedUser);
      } else {
        this.user = null;
      }
    }
  }
});
