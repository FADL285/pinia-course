<script setup>
import { storeToRefs } from 'pinia';
import TheHeader from '@/components/TheHeader.vue';
import ProductCard from '@/components/ProductCard.vue';
import { useProductStore } from '@/stores/product.js';
import { useCartStore } from '@/stores/cart.js';

const { products } = storeToRefs(useProductStore());
const { fill } = useProductStore();
const { addItems } = useCartStore();

fill();
</script>

<template>
  <div class="container">
    <TheHeader />
    <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
      <ProductCard
        v-for="product in products"
        :key="product.name"
        :product="product"
        @addToCart="addItems($event, product)"
      />
    </ul>
  </div>
</template>
