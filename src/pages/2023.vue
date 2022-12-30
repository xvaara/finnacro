<script setup lang="ts">
const url = 'https://docs.google.com/forms/d/e/1FAIpQLSdcztOn2Mdk28PaxI4bVqsaIbOfSmkdonuJHflIgK1GKJ-pMQ/viewform'
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
