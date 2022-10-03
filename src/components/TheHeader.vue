<script>
// imports
import { mapState } from 'pinia';
import { useAuthStore } from '@/stores/auth.js';

import CartWidget from './CartWidget.vue';

export default {
  components: {
    CartWidget
  },
  computed: {
    ...mapState(useAuthStore, ['username'])
  }
};
</script>

<template>
  <header
    class="flex justify-between p-6 mb-10 items-center"
    style="background-image: url('/images/double-bubble-outline.png')"
  >
    <h1 class="text-4xl text-gray-700 font-bold">The Pineapple Stand</h1>
    <div class="flex">
      <span class="mr-4 text-lg">{{ username }}</span>
      <CartWidget />
    </div>
  </header>
</template>
