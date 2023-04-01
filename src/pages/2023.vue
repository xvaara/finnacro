<script setup lang="ts">
const url = 'https://pilvikanava.fi/parkourakatemia/course.php?l=fi&t=2946'
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
