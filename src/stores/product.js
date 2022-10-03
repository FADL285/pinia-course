import { defineStore, acceptHMRUpdate } from 'pinia';

export const useProductStore = defineStore('product', {
  state: () => ({
    products: []
  }),
  getters: {
    product: (state) => (id) => state.products.find((prod) => prod.id === id)
  },
  actions: {
    async fill() {
      this.products = (await import('@/data/products.json')).default;
    }
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot));
}
