<script setup lang="ts">

</script>

<template>
  <nav text-xl mt-6>
    <RouterLink class="icon-btn mx-2" to="/" title="button.home">
      <div i-carbon-campsite />
    </RouterLink>

    <button class="icon-btn mx-2 !outline-none" title="button.toggle_dark" @click="toggleDark()">
      <div i="carbon-sun dark:carbon-moon" />
    </button>

    <RouterLink class="icon-btn mx-2" to="/about" title="button.about">
      <div i-carbon-dicom-overlay />
    </RouterLink>

    <a class="icon-btn mx-2" rel="noreferrer" href="https://github.com/antfu/vitesse" target="_blank" title="GitHub">
      <div i-carbon-logo-github />
    </a>
  </nav>
</template>
