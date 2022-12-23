<script setup lang="ts">
const user = useUserStore()
const name = $ref(user.savedName)

const router = useRouter()
const go = () => {
  if (name)
    router.push(`/hi/${encodeURIComponent(name)}`)
}
</script>

<template>
  <div>
    <div text-4xl>
      <div i-carbon-campsite inline-block />
    </div>
    <p>
      <a rel="noreferrer" href="https://github.com/antfu/vitesse" target="_blank">
        Finnacro
      </a>
    </p>
    <p>
      <em text-sm opacity-75>Finnish Acrobatic Convention</em>
    </p>

    <div py-4 />
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
