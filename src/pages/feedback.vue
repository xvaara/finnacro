<script setup lang="ts">
const url = 'https://docs.google.com/forms/d/e/1FAIpQLSeC1KnIFg2SRwKCLHUx5Dy6F-4DcRZ-oohCnI4O_1wmvg6bow/viewform?usp=sf_link'
if (typeof window !== 'undefined')
  window.location.replace(url)
</script>

<template>
  <div btn text-sm m="3 t8">
    <!-- <a :href="url">
      Siirry palautteeseen
    </a> -->
    feedback after the convention
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
