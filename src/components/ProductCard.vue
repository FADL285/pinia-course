<script setup>
// imports
import { ref } from 'vue';
import AppCountInput from './AppCountInput.vue';

// props
defineProps({
  product: {
    type: Object,
    required: true
  }
});

// emits
defineEmits(['addToCart']);

// data
const count = ref(0);
</script>
<template>
  <li class="card">
    <img :src="`/images/${product.image}`" class="mb-3" width="300" />
    <div>
      {{ product.name }} -
      <span class="text-green-500">${{ product.price }}</span>
      <div class="text-center m-4">
        <AppCountInput v-model="count" :in-stock="product.inStock" />
      </div>
      <AppButton class="primary" @click="$emit('addToCart', count), (count = 0)"
        >Add to Cart</AppButton
      >
    </div>
  </li>
</template>
