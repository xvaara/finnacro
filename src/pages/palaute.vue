<script setup lang="ts">
const url = 'https://docs.google.com/forms/d/e/1FAIpQLScavRFthDJqHfdF9EXnJazuwJ_K1prMMqiDsYA8oEWlF4Buvw/viewform'
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
