import { defineStore } from 'pinia';

export const useProductStore = defineStore('product', {
  state: () => ({
    products: []
  }),
  getters: {
    // doubleCount: (state) => state.count * 2
  },
  actions: {
    async fill() {
      this.products = (await import('@/data/products.json')).default;
    }
  }
});
