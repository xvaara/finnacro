<script setup lang="ts">
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: 'FinnAcro',
  meta: [
    { name: 'description', content: 'Finnish Acrobatics Convention' },
    {
      name: 'theme-color',
      content: computed(() => isDark.value ? '#00aba9' : '#ffffff'),
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: computed(() => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg'),
    },
  ],
})
import { provide, ref } from 'vue'
import { appInfoKey } from './keys'
const appInfo = ref({toc: null})
provide(appInfoKey, appInfo)

</script>

<template>
  <RouterView />
</template>
