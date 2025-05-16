<template>
  <header class="fixed-top bg-white shadow-sm">
    <div class="container">
      <div class="header-top d-flex align-items-center justify-content-between">
        <div class="d-flex align-items-center">
          <img alt="Vue logo" class="logo me-3" src="@/assets/logo.svg" width="50" height="50" />
          <h1 class="title mb-0">Taskly</h1>
        </div>
        <span class="flower-icon" title="Flor" style="font-size:2rem;">🌸</span>
      </div>
    </div>
  </header>
</template>

<style scoped>
header {
  padding: 0.5rem 0;
}

.logo {
  width: 50px;
  height: 50px;
}

.title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
}

.flower-icon {
  margin-left: 1rem;
}
</style>
