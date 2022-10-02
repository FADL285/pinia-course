import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []
  }),
  getters: {
    // doubleCount: (state) => state.count * 2
  },
  actions: {
    increment() {
      // this.count++;
    }
  }
});
