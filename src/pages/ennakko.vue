<script setup lang="ts">
const url = 'https://forms.gle/bAKhVu5we9ao31zb8'
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
