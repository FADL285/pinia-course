import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    email: 'fadl285@outlook.com'
  }),
  getters: {
    username: (state) => state.email.split('@')[0]
  },
  actions: {
    visitLinkedIn() {
      window.open(`https://www.linkedin.com/in/${this.username}`, '_blank');
    }
  }
});
