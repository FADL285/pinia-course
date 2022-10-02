<script setup>
import { storeToRefs } from 'pinia';
import TheHeader from '@/components/TheHeader.vue';
import ProductCard from '@/components/ProductCard.vue';
import { useProductStore } from '@/stores/product.js';
import { useCartStore } from '@/stores/cart.js';

const { products } = storeToRefs(useProductStore());
const { fill } = useProductStore();

const { items } = storeToRefs(useCartStore());

fill();

const addToCart = (count, product) => {
  count = parseInt(count);
  for (let index = 0; index < count; index++) {
    items.value.push(product);
  }
};
</script>

<template>
  <div class="container">
    <TheHeader />
    <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
      <ProductCard
        v-for="product in products"
        :key="product.name"
        :product="product"
        @addToCart="addToCart($event, product)"
      />
    </ul>
  </div>
</template>
