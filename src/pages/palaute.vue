<script setup lang="ts">
const url = 'https://docs.google.com/forms/d/e/1FAIpQLSdpW9rTt8FGNN5WeA1ebD2kK6CSE5MhiyE8eBDEDSuZmTq6YQ/viewform?usp=sf_link'
if (typeof window !== 'undefined')
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
