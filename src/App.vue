<script setup lang="ts">
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
</script>

<template>
  <main class="mt-5 pt-5 pb-5">
    <router-view />
  </main>
</template>

<style scoped>
main {  min-height: calc(100vh - 140px);
  padding-bottom: 70px;
}
</style>
