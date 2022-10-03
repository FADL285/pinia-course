import { ref, computed } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia';

export const useProductStore = defineStore('product', () => {
  const products = ref([]);

  const product = computed(
    () => (id) => products.value.find((prod) => prod.id === id)
  );

  async function fill() {
    products.value = (await import('@/data/products.json')).default;
  }

  return { products, product, fill };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot));
}
