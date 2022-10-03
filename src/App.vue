<script setup>
import { storeToRefs } from 'pinia';
import TheHeader from '@/components/TheHeader.vue';
import ProductCard from '@/components/ProductCard.vue';
import { useProductStore } from '@/stores/product.js';
import { useCartStore } from '@/stores/cart.js';

const cartStore = useCartStore();

const { products } = storeToRefs(useProductStore());
const { fill } = useProductStore();
const { addItems } = cartStore;

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
      <AppButton @click="cartStore.undo">Undo</AppButton>
      <AppButton class="ml-2" @click="cartStore.redo">Redo</AppButton>
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
