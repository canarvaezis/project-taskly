<script setup lang="ts">
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import TaskView from './views/TaskView.vue';
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
</script>

<template>
  <AppHeader />
  <main class="mt-5 pt-5 pb-5">
    <TaskView />
  </main>
  <AppFooter />
</template>

<style scoped>
main {
  min-height: calc(100vh - 140px);
  padding-bottom: 70px;
}
</style>
