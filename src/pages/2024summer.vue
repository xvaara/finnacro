<script setup lang="ts">
const url = 'https://docs.google.com/forms/d/e/1FAIpQLSfxrVDfFUve_e2DOj-7BSZJQ9nT-brA_hM9EK5bZ8MhlaOLfQ/viewform?usp=sf_link'
if (typeof window !== 'undefined')
  window.location.replace(url)
</script>

<template>
  <div btn text-sm m="3 t8">
    <a :href="url">
      Siirry ilmoittautumiseen
    </a>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
