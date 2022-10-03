<script setup>
import { ref, reactive } from 'vue';
import { storeToRefs } from 'pinia';
import TheHeader from '@/components/TheHeader.vue';
import ProductCard from '@/components/ProductCard.vue';
import { useProductStore } from '@/stores/product.js';
import { useCartStore } from '@/stores/cart.js';

const cartStore = useCartStore();

const { products } = storeToRefs(useProductStore());
const { fill } = useProductStore();
const { addItems } = cartStore;

const history = reactive([]);
const future = reactive([]);
const doingHistory = ref(false);
history.push(JSON.stringify(cartStore.$state));

// Undo last action
const undo = () => {
  if (history.length === 1) return;
  doingHistory.value = true;
  future.push(history.pop());
  cartStore.$state = JSON.parse(history.at(-1));
  doingHistory.value = false;
};

// Redo last action
const redo = () => {
  const latest = future.pop();
  if (!latest) return;
  doingHistory.value = true;
  history.push(latest);
  cartStore.$state = JSON.parse(latest);
  doingHistory.value = false;
};

// State Subscription
cartStore.$subscribe((mutation, state) => {
  if (!doingHistory.value) {
    history.push(JSON.stringify(state));
    // Clear future if new action is taken
    future.length = 0;
  }
});

// Action Subscription
cartStore.$onAction(({ name, store, args, after, onError }) => {
  console.log(`Action ${name} was called on store ${store.$id}`, args);

  if (name === 'checkout') {
    after(() => {
      console.log('Thanks for your order!');
      store.$reset();
    });
  }

  onError((error) => {
    console.error('Oh no there is an error: ', error);
  });
});

fill();
</script>

<template>
  <div class="container">
    <TheHeader />
    <div class="mb-5 flex justify-end">
      <AppButton @click="undo">Undo</AppButton>
      <AppButton class="ml-2" @click="redo">Redo</AppButton>
    </div>
    <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
      <ProductCard
        v-for="product in products"
        :key="product.name"
        :product="product"
        @addToCart="addItems(product, $event)"
      />
    </ul>
  </div>
</template>
