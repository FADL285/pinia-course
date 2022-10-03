import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    email: 'fadl285@mail.com'
  }),
  getters: {
    username: (state) => state.email.split('@')[0]
  },
  actions: {}
});
