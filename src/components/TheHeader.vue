<script>
// imports
import { mapState, mapActions } from 'pinia';
import { useAuthStore } from '@/stores/auth.js';

import CartWidget from './CartWidget.vue';

export default {
  components: {
    CartWidget
  },
  computed: {
    ...mapState(useAuthStore, ['username'])
  },
  methods: {
    ...mapActions(useAuthStore, ['visitLinkedIn'])
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
      <span class="mr-4 text-lg cursor-pointer" @click="visitLinkedIn">{{
        username
      }}</span>
      <CartWidget />
    </div>
  </header>
</template>
