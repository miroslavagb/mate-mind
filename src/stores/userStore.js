import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
      user: null
    }),
    actions: {
      setUser(userData) {
        this.user = userData;
        localStorage.setItem('user', JSON.stringify(userData));
      },
      clearUser() {
        this.user = null;
        localStorage.clear();
      },
      loadUser() {
        this.user = JSON.parse(localStorage.getItem('user'));
      }
    }
  });
