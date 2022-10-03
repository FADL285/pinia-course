import { defineStore } from 'pinia';
import groupBy from 'lodash/groupBy';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []
  }),
  getters: {
    count: (state) => state.items.length,
    isEmpty: (state) => state.count === 0,
    grouped: (state) => groupBy(state.items, (item) => item.id),
    groupCount: (state) => (id) => state.grouped[id]?.length,
    total: (state) => state.items.reduce((acc, item) => acc + item.price, 0)
  },
  actions: {
    addItems(count, item) {
      count = parseInt(count) <= item.inStock ? parseInt(count) : item.inStock;
      for (let index = 0; index < count; index++) {
        this.items.push({ ...item });
      }
    }
  }
});
