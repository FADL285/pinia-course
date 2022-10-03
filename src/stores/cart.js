import { defineStore, acceptHMRUpdate } from 'pinia';
import { useProductStore } from '@/stores/product.js';
import { useAuthStore } from '@/stores/auth.js';

export const useCartStore = defineStore('cart', {
  historyEnabled: true,

  state: () => ({
    items: []
  }),
  getters: {
    count: (state) => state.items.reduce((acc, item) => acc + item.count, 0),
    isEmpty: (state) => state.count === 0,
    total: (state) => {
      const productStore = useProductStore();

      return state.items.reduce(
        (acc, item) => acc + productStore.product(item.id).price * item.count,
        0
      );
    }
  },
  actions: {
    addItems(item, count) {
      const prod = this.items.find((prod) => prod.id === item.id);
      count = parseInt(count) <= item.inStock ? parseInt(count) : item.inStock;
      if (prod) {
        prod.count += count;
      } else {
        this.items.push({ id: item.id, count });
      }
    },
    clear(id) {
      this.items = this.items.filter((item) => item.id !== id);
    },
    setItemCount(id, count) {
      const prod = this.items.find((prod) => prod.id === id);
      if (prod) {
        prod.count = count;
      }
    },
    checkout() {
      const authStore = useAuthStore();
      alert(
        `${authStore.username} just bought ${this.count} items for $${this.total}`
      );
    }
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}
