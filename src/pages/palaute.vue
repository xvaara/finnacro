<script setup lang="ts">
const url = 'https://google.com'
window.location.replace(url)
</script>

<template>
  <div btn text-sm m="3 t8">
    <a :href="url">
      Siirry palautteeseen
    </a>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
